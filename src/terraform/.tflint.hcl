# TXI Terraform Linting Configuration
# Based on the TXI Terraform Standards
#
# This configuration enforces the Terraform standards defined in
# docs/standards/TERRAFORM_STANDARDS.md

# TFLint Configuration
config {
  # Enable all default rules
  default = true
  
  # Module inspection
  module = true
  
  # Deep checking
  deep_check = true
  
  # Require variable descriptions
  force = false
}

# AWS Provider Plugin
plugin "aws" {
  enabled = true
  version = "0.21.0"
  source  = "github.com/terraform-linters/tflint-ruleset-aws"
}

# GCP Provider Plugin
plugin "google" {
  enabled = true
  version = "0.23.0"
  source  = "github.com/terraform-linters/tflint-ruleset-google"
}

# Azure Provider Plugin  
plugin "azurerm" {
  enabled = true
  version = "0.20.0"
  source  = "github.com/terraform-linters/tflint-ruleset-azurerm"
}

# ========================================
# Terraform Language Rules
# ========================================

rule "terraform_comment_syntax" {
  enabled = true
}

rule "terraform_deprecated_index" {
  enabled = true
}

rule "terraform_deprecated_interpolation" {
  enabled = true
}

rule "terraform_documented_outputs" {
  enabled = true
}

rule "terraform_documented_variables" {
  enabled = true
}

rule "terraform_empty_list_equality" {
  enabled = true
}

rule "terraform_module_pinned_source" {
  enabled = true
}

rule "terraform_module_version" {
  enabled = true
}

rule "terraform_naming_convention" {
  enabled = true
  
  # Custom naming formats per TXI standards
  format = "snake_case"
  
  custom = {
    # Resource names: <resource_type>_<name>
    resource = "snake_case"
    
    # Variable names: snake_case
    variable = "snake_case"
    
    # Output names: snake_case
    output = "snake_case"
    
    # Data source names: snake_case
    data = "snake_case"
    
    # Local values: snake_case
    locals = "snake_case"
    
    # Module names: snake_case with hyphens allowed
    module = "(snake_case|kebab-case)"
  }
}

rule "terraform_required_providers" {
  enabled = true
}

rule "terraform_required_version" {
  enabled = true
}

rule "terraform_standard_module_structure" {
  enabled = true
}

rule "terraform_typed_variables" {
  enabled = true
}

rule "terraform_unused_declarations" {
  enabled = true
}

rule "terraform_unused_required_providers" {
  enabled = true
}

rule "terraform_workspace_remote" {
  enabled = true
}

# ========================================
# Best Practice Rules
# ========================================

# Ensure all variables have descriptions
rule "terraform_documented_variables" {
  enabled = true
}

# Ensure all outputs have descriptions
rule "terraform_documented_outputs" {
  enabled = true
}

# Require variable type constraints
rule "terraform_typed_variables" {
  enabled = true
}

# Require validation blocks for complex variables
rule "terraform_variable_validation" {
  enabled = true
}

# ========================================
# Security Rules
# ========================================

# No hardcoded credentials
rule "terraform_no_hardcoded_credentials" {
  enabled = true
}

# Require encryption
rule "terraform_encryption_required" {
  enabled = true
}

# ========================================
# AWS Specific Rules (if using AWS provider)
# ========================================

rule "aws_instance_invalid_type" {
  enabled = true
}

rule "aws_instance_invalid_ami" {
  enabled = true
}

rule "aws_instance_previous_type" {
  enabled = true
}

rule "aws_db_instance_invalid_type" {
  enabled = true
}

rule "aws_elasticache_cluster_invalid_type" {
  enabled = true
}

rule "aws_s3_bucket_invalid_acl" {
  enabled = true
}

rule "aws_security_group_invalid_protocol" {
  enabled = true
}

rule "aws_iam_policy_invalid_version" {
  enabled = true
}

rule "aws_iam_policy_document_gov_friendly_arns" {
  enabled = false
}

# ========================================
# GCP Specific Rules (if using GCP provider)
# ========================================

rule "google_compute_instance_invalid_machine_type" {
  enabled = true
}

rule "google_compute_disk_invalid_type" {
  enabled = true
}

# ========================================
# Azure Specific Rules (if using Azure provider)
# ========================================

rule "azurerm_virtual_machine_invalid_vm_size" {
  enabled = true
}