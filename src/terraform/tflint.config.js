/**
 * TXI Terraform Linting Configuration
 * Based on the TXI Terraform Standards
 *
 * This configuration enforces the Terraform standards defined in
 * docs/standards/TERRAFORM_STANDARDS.md
 */

module.exports = {
  /* TFLint configuration */
  tflint: {
    /* Enable all default rules */
    enabled: true,

    /* Module inspection */
    module: true,

    /* Deep checking */
    deepCheck: true,

    /* Variable validation */
    variables: {
      requireDescription: true,
      requireType: true,
      requireDefault: false,
    },

    /* Output validation */
    outputs: {
      requireDescription: true,
    },

    /* Naming conventions per TXI standards */
    naming: {
      /* File naming */
      files: {
        pattern: /^[a-z][a-z0-9_-]*\.tf$/,
        mainFiles: ['main.tf', 'variables.tf', 'outputs.tf'],
      },

      /* Resource naming: <resource_type>_<name> */
      resources: {
        pattern: /^[a-z][a-z0-9_]*$/,
        format: 'snake_case',
      },

      /* Variable naming */
      variables: {
        pattern: /^[a-z][a-z0-9_]*$/,
        format: 'snake_case',
        reserved: ['count', 'for_each', 'provider', 'lifecycle', 'depends_on'],
      },

      /* Output naming */
      outputs: {
        pattern: /^[a-z][a-z0-9_]*$/,
        format: 'snake_case',
      },

      /* Module naming */
      modules: {
        pattern: /^[a-z][a-z0-9_-]*$/,
        format: 'kebab-case',
      },

      /* Tag naming */
      tags: {
        required: ['Environment', 'Project', 'Owner', 'CostCenter'],
        format: 'PascalCase',
      },
    },

    /* Required blocks */
    required: {
      terraform: {
        requiredVersion: true,
        backend: true,
      },
      providers: {
        version: true,
        source: true,
      },
    },

    /* Best practices */
    bestPractices: {
      /* No hardcoded values */
      noHardcodedValues: ['region', 'account_id', 'ami_id', 'instance_type', 'key_name'],

      /* Required tags */
      requiredTags: {
        Environment: true,
        Project: true,
        Owner: true,
        CostCenter: true,
        ManagedBy: 'terraform',
      },

      /* Module structure */
      moduleStructure: {
        required: ['README.md', 'variables.tf', 'outputs.tf', 'main.tf'],
        optional: ['versions.tf', 'providers.tf', 'locals.tf'],
      },
    },

    /* Security rules */
    security: {
      /* No plaintext secrets */
      noPlaintextSecrets: true,

      /* Encryption required */
      encryption: {
        s3: true,
        rds: true,
        ebs: true,
        efs: true,
      },

      /* Network security */
      network: {
        noPublicIPs: false /* Warning only */,
        noOpenSecurityGroups: true,
        requireVPC: true,
      },

      /* IAM policies */
      iam: {
        noWildcardActions: true,
        noWildcardResources: true,
        requireMFA: false /* Warning only */,
      },
    },
  },

  /* Terraform fmt configuration */
  fmt: {
    check: true,
    diff: true,
    write: true,
  },

  /* Checkov security scanning */
  checkov: {
    enabled: true,
    skipChecks: [],
    framework: ['terraform', 'terraform_plan'],
  },

  /* Custom validation rules */
  customRules: {
    /* Resource-specific rules */
    // eslint-disable-next-line camelcase
    aws_instance: {
      requiredTags: ['Name', 'Environment'],
      validInstanceTypes: [
        't3.micro',
        't3.small',
        't3.medium',
        't3.large',
        'm5.large',
        'm5.xlarge',
        'm5.2xlarge',
        'c5.large',
        'c5.xlarge',
        'c5.2xlarge',
      ],
    },

    // eslint-disable-next-line camelcase
    aws_s3_bucket: {
      requiredArguments: ['versioning', 'server_side_encryption_configuration'],
      requiredTags: ['Name', 'Environment', 'DataClassification'],
    },

    // eslint-disable-next-line camelcase
    aws_db_instance: {
      requiredArguments: ['backup_retention_period', 'backup_window', 'maintenance_window'],
      minimumBackupRetention: 7,
      encryption: true,
    },
  },
};
