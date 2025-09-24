/**
 * TXI JSON Schema Definitions
 *
 * Common JSON schemas for validation
 */

module.exports = {
  /* Package.json schema */
  packageJsonSchema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    required: ['name', 'version'],
    properties: {
      name: {
        type: 'string',
        pattern: '^(@[a-z0-9-~][a-z0-9-._~]*/)?[a-z0-9-~][a-z0-9-._~]*$',
      },
      version: {
        type: 'string',
        pattern: '^\\d+\\.\\d+\\.\\d+(-[a-zA-Z0-9-.]+)?(\\+[a-zA-Z0-9-.]+)?$',
      },
      description: {
        type: 'string',
      },
      license: {
        type: 'string',
      },
      author: {
        oneOf: [
          { type: 'string' },
          {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string', format: 'email' },
              url: { type: 'string', format: 'uri' },
            },
          },
        ],
      },
      scripts: {
        type: 'object',
        patternProperties: {
          '^[a-z][a-z0-9-]*$': {
            type: 'string',
          },
        },
      },
      dependencies: {
        type: 'object',
        patternProperties: {
          '^(@[a-z0-9-~][a-z0-9-._~]*/)?[a-z0-9-~][a-z0-9-._~]*$': {
            type: 'string',
          },
        },
      },
    },
  },

  /* TSConfig schema */
  tsConfigSchema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: {
      compilerOptions: {
        type: 'object',
        properties: {
          target: {
            type: 'string',
            enum: [
              'ES5',
              'ES6',
              'ES2015',
              'ES2016',
              'ES2017',
              'ES2018',
              'ES2019',
              'ES2020',
              'ES2021',
              'ES2022',
              'ESNext',
            ],
          },
          module: {
            type: 'string',
            enum: ['CommonJS', 'AMD', 'System', 'UMD', 'ES6', 'ES2015', 'ES2020', 'ESNext', 'None'],
          },
          strict: {
            type: 'boolean',
          },
          esModuleInterop: {
            type: 'boolean',
          },
          skipLibCheck: {
            type: 'boolean',
          },
          forceConsistentCasingInFileNames: {
            type: 'boolean',
          },
        },
      },
      include: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      exclude: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
  },

  /* API Response schema template */
  apiResponseSchema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    required: ['success', 'data'],
    properties: {
      success: {
        type: 'boolean',
      },
      data: {
        oneOf: [{ type: 'object' }, { type: 'array' }, { type: 'null' }],
      },
      error: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
          details: {
            type: 'object',
          },
        },
        required: ['code', 'message'],
      },
      metadata: {
        type: 'object',
        properties: {
          timestamp: {
            type: 'string',
            format: 'date-time',
          },
          version: {
            type: 'string',
          },
          requestId: {
            type: 'string',
          },
        },
      },
    },
  },
};
