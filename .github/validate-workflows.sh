#!/bin/bash

# Lightweight GitHub Actions Validation Script
# This script validates workflows without requiring Docker or act

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
WORKFLOWS_DIR=".github/workflows"

# Function to print colored output
print_color() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to validate YAML syntax
validate_yaml() {
    local file=$1
    print_color "$BLUE" "Validating: $file"
    
    # Check if file exists
    if [[ ! -f "$file" ]]; then
        print_color "$RED" "  ✗ File not found"
        return 1
    fi
    
    # Basic YAML validation using Ruby (available on most systems)
    if command -v ruby &> /dev/null; then
        if ruby -ryaml -e "YAML.load_file('$file')" 2>/dev/null; then
            print_color "$GREEN" "  ✓ Valid YAML syntax"
        else
            print_color "$RED" "  ✗ Invalid YAML syntax"
            return 1
        fi
    else
        print_color "$YELLOW" "  ⚠ Ruby not found, skipping YAML validation"
    fi
    
    # Check for required workflow keys
    if grep -q "^name:" "$file" && grep -q "^on:" "$file" && grep -q "^jobs:" "$file"; then
        print_color "$GREEN" "  ✓ Required workflow keys present"
    else
        print_color "$RED" "  ✗ Missing required workflow keys (name, on, jobs)"
        return 1
    fi
    
    return 0
}

# Function to extract workflow information
extract_workflow_info() {
    local file=$1
    
    echo ""
    print_color "$BLUE" "Workflow: $(basename "$file")"
    
    # Extract workflow name
    local name=$(grep "^name:" "$file" | head -1 | sed 's/name: *//')
    echo "  Name: $name"
    
    # Extract triggers
    echo "  Triggers:"
    awk '/^on:/{flag=1; next} /^[a-z]/{flag=0} flag && /^  [a-z]/{print "    -"$0}' "$file"
    
    # Extract jobs
    echo "  Jobs:"
    grep -E "^  [a-zA-Z0-9_-]+:" "$file" | grep -v "steps:" | sed 's/://' | sed 's/^/    -/'
    
    # Check for secrets usage
    local secrets=$(grep -o '\${{ secrets\.[A-Z_]*' "$file" | sed 's/${{ secrets\.//' | sort -u)
    if [[ -n "$secrets" ]]; then
        echo "  Required Secrets:"
        echo "$secrets" | sed 's/^/    - /'
    fi
}

# Function to check for common issues
check_common_issues() {
    local file=$1
    local issues=0
    
    print_color "$BLUE" "\nChecking for common issues in $(basename "$file"):"
    
    # Check for deprecated actions
    if grep -q "actions/checkout@v[12]" "$file"; then
        print_color "$YELLOW" "  ⚠ Using deprecated checkout action (should use v4)"
        ((issues++))
    fi
    
    if grep -q "actions/setup-node@v[12]" "$file"; then
        print_color "$YELLOW" "  ⚠ Using deprecated setup-node action (should use v4)"
        ((issues++))
    fi
    
    # Check for missing cache configuration
    if grep -q "actions/setup-node" "$file" && ! grep -q "cache:" "$file"; then
        print_color "$YELLOW" "  ⚠ setup-node without cache configuration"
        ((issues++))
    fi
    
    # Check for act compatibility
    if grep -q '\${{ env.ACT }}' "$file" || grep -q 'env.ACT' "$file"; then
        print_color "$GREEN" "  ✓ act compatibility detected"
    else
        print_color "$YELLOW" "  ⚠ No act compatibility checks found"
    fi
    
    if [[ $issues -eq 0 ]]; then
        print_color "$GREEN" "  ✓ No common issues found"
    fi
}

# Main validation function
validate_all_workflows() {
    local total=0
    local passed=0
    local failed=0
    
    print_color "$GREEN" "=== GitHub Actions Workflow Validation ===\n"
    
    for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
        if [[ -f "$workflow" ]]; then
            ((total++))
            if validate_yaml "$workflow"; then
                ((passed++))
                extract_workflow_info "$workflow"
                check_common_issues "$workflow"
            else
                ((failed++))
            fi
            echo ""
        fi
    done
    
    # Summary
    print_color "$BLUE" "=== Validation Summary ==="
    echo "Total workflows: $total"
    print_color "$GREEN" "Passed: $passed"
    if [[ $failed -gt 0 ]]; then
        print_color "$RED" "Failed: $failed"
        return 1
    fi
    
    # List required secrets across all workflows
    print_color "$BLUE" "\n=== Required Secrets Across All Workflows ==="
    local all_secrets=$(grep -h -o '\${{ secrets\.[A-Z_]*' "$WORKFLOWS_DIR"/*.yml 2>/dev/null | sed 's/${{ secrets\.//' | sort -u)
    if [[ -n "$all_secrets" ]]; then
        echo "$all_secrets" | sed 's/^/  - /'
    else
        echo "  None found"
    fi
    
    # Check for secrets example file
    if [[ -f ".secrets.example" ]]; then
        print_color "$GREEN" "\n✓ .secrets.example file exists"
    else
        print_color "$YELLOW" "\n⚠ .secrets.example file not found"
    fi
}

# Run validation
validate_all_workflows