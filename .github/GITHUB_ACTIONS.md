# GitHub Actions

This directory contains GitHub Actions workflows and testing infrastructure for the TXI Style Guide project.

## Workflows

### CI Workflow (`workflows/ci.yml`)

- **Triggers**: Push to main/master/develop branches and pull requests
- **Purpose**: Run tests and linting across multiple Node.js versions
- **Features**:
  - Matrix testing (Node.js 18.x, 20.x, 22.x)
  - Comprehensive linting (JavaScript, TypeScript, JSON, Markdown, CSS, HTML)
  - Test coverage reporting
  - Required linting checks that must pass
  - act compatibility for local testing

### Release Workflow (`workflows/release.yml`)

- **Triggers**: Version tags (v\*), GitHub releases, or manual dispatch
- **Purpose**: Publish package to GitHub Packages
- **Features**:
  - Automatic version detection from tags
  - Manual version input support
  - act detection for dry-run mode
  - GitHub release creation
  - Pre-publish testing and linting

## Local Testing with act

[act](https://github.com/nektos/act) allows you to run GitHub Actions locally for testing.

### Prerequisites

1. Install act: https://github.com/nektos/act#installation
2. Install Docker: https://www.docker.com/products/docker-desktop
3. Copy `.secrets.example` to `.secrets` and update with your values

### Running Tests

```bash
# Run specific workflow
./.github/test-actions.sh run ci.yml

# Run workflow with specific event
./.github/test-actions.sh run release.yml tag

# Run all workflows
./.github/test-actions.sh all

# List available workflows
./.github/test-actions.sh list

# List available events
./.github/test-actions.sh events
```

### Validation Without Docker

If you don't have Docker installed, you can still validate workflows:

```bash
./.github/validate-workflows.sh
```

This will check:

- YAML syntax validity
- Required workflow keys
- Common issues and deprecated actions
- Secret requirements

## Configuration Files

### `.actrc`

Configuration for act:

- Uses catthehacker images for better compatibility
- Enables container reuse
- Sets default event payload

### `.secrets.example`

Template for local secrets:

- Copy to `.secrets` for local testing
- Never commit `.secrets` file
- Required for certain workflow operations

### `act-events/`

Mock event payloads for testing:

- `push.json` - Push to branch
- `pull_request.json` - PR events
- `tag.json` - Version tag push
- `workflow_dispatch.json` - Manual trigger

## Troubleshooting

### Apple Silicon (M1/M2) Macs

The test script automatically detects ARM64 and uses `--platform linux/amd64` flag.

### Common Issues

1. **Docker not running**

   ```
   Error: Docker is not running
   ```

   Solution: Start Docker Desktop

2. **Missing secrets**

   ```
   Warning: .secrets not found
   ```

   Solution: Copy `.secrets.example` to `.secrets`

3. **Workflow failures in act**
   - Check if workflow has act compatibility (`${{ env.ACT }}` checks)
   - Some GitHub Actions features may not work in act
   - Use dry-run mode for operations like npm publish

## Best Practices

1. **Always test locally** before pushing workflow changes
2. **Use act compatibility checks** in workflows that perform external operations
3. **Keep secrets secure** - never commit `.secrets` file
4. **Document new workflows** in this README
5. **Use matrix strategy** for testing across multiple environments
6. **Include linting** as part of CI to maintain code quality
