#!/bin/bash

# GitHub Actions Test Script using act
# This script allows local testing of GitHub Actions workflows

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
WORKFLOWS_DIR=".github/workflows"
EVENTS_DIR=".github/act-events"
SECRETS_FILE=".secrets"

# Function to print colored output
print_color() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to check prerequisites
check_prerequisites() {
    print_color "$BLUE" "Checking prerequisites..."
    
    # Check if act is installed
    if ! command -v act &> /dev/null; then
        print_color "$RED" "Error: 'act' is not installed."
        echo "Please install act: https://github.com/nektos/act#installation"
        exit 1
    fi
    
    # Check if Docker is running
    if ! docker info &> /dev/null; then
        print_color "$RED" "Error: Docker is not running."
        echo "Please start Docker before running this script."
        exit 1
    fi
    
    # Check for secrets file
    if [[ ! -f "$SECRETS_FILE" ]]; then
        print_color "$YELLOW" "Warning: $SECRETS_FILE not found."
        echo "Creating from template..."
        if [[ -f "${SECRETS_FILE}.example" ]]; then
            cp "${SECRETS_FILE}.example" "$SECRETS_FILE"
            print_color "$GREEN" "Created $SECRETS_FILE from template. Please update with your values."
        else
            # Create a basic secrets file
            cat > "$SECRETS_FILE" << EOF
# GitHub Actions Secrets
# Update these values for local testing
GITHUB_TOKEN=your-github-token-here
NPM_TOKEN=your-npm-token-here
CODECOV_TOKEN=your-codecov-token-here
EOF
            print_color "$GREEN" "Created $SECRETS_FILE. Please update with your values."
        fi
    fi
}

# Function to list available workflows
list_workflows() {
    print_color "$BLUE" "Available workflows:"
    for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
        if [[ -f "$workflow" ]]; then
            basename "$workflow"
        fi
    done
}

# Function to list available events
list_events() {
    print_color "$BLUE" "Available event payloads:"
    for event in "$EVENTS_DIR"/*.json; do
        if [[ -f "$event" ]]; then
            basename "$event" .json
        fi
    done
}

# Function to run a specific workflow
run_workflow() {
    local workflow=$1
    local event=${2:-push}
    
    # Check if workflow exists
    if [[ ! -f "$WORKFLOWS_DIR/$workflow" ]]; then
        print_color "$RED" "Error: Workflow '$workflow' not found."
        list_workflows
        exit 1
    fi
    
    # Determine event file
    local event_file="$EVENTS_DIR/${event}.json"
    if [[ ! -f "$event_file" ]]; then
        print_color "$YELLOW" "Warning: Event file '$event_file' not found. Using default push event."
        event_file="$EVENTS_DIR/push.json"
    fi
    
    print_color "$GREEN" "Running workflow: $workflow"
    print_color "$GREEN" "Event: $event"
    
    # Detect platform and use appropriate image
    local platform_flag=""
    if [[ "$(uname -m)" == "arm64" ]]; then
        print_color "$YELLOW" "Detected Apple Silicon, using linux/amd64 platform"
        platform_flag="--platform linux/amd64"
    fi
    
    # Run act with the workflow
    act \
        --workflows "$WORKFLOWS_DIR/$workflow" \
        --eventpath "$event_file" \
        --secret-file "$SECRETS_FILE" \
        $platform_flag \
        -v
}

# Function to run all workflows
run_all_workflows() {
    print_color "$GREEN" "Running all workflows..."
    
    for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
        if [[ -f "$workflow" ]]; then
            workflow_name=$(basename "$workflow")
            print_color "$BLUE" "\n=== Running $workflow_name ==="
            run_workflow "$workflow_name" || print_color "$YELLOW" "Warning: $workflow_name failed"
        fi
    done
}

# Function to show help
show_help() {
    cat << EOF
GitHub Actions Test Script

Usage: $0 [command] [options]

Commands:
    run <workflow> [event]  Run a specific workflow with optional event
    list                    List available workflows
    events                  List available event payloads
    all                     Run all workflows
    help                    Show this help message

Examples:
    $0 run ci.yml                    # Run CI workflow with push event
    $0 run release.yml tag           # Run release workflow with tag event
    $0 run ci.yml pull_request       # Run CI workflow with PR event
    $0 all                           # Run all workflows

Event types:
    push          - Push to branch
    pull_request  - Pull request
    tag           - Tag push
    release       - Release created
    workflow_dispatch - Manual trigger

EOF
}

# Main script logic
main() {
    check_prerequisites
    
    case "${1:-help}" in
        run)
            if [[ -z "${2:-}" ]]; then
                print_color "$RED" "Error: Workflow name required"
                show_help
                exit 1
            fi
            run_workflow "$2" "${3:-push}"
            ;;
        list)
            list_workflows
            ;;
        events)
            list_events
            ;;
        all)
            run_all_workflows
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_color "$RED" "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@"