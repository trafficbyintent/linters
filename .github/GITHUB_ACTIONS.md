# GitHub Actions

This directory contains GitHub Actions workflows for the TXI Linters project.

## Workflows

### CI Workflow (`workflows/ci.yml`)

- **Triggers**: Push to main branch and pull requests
- **Purpose**: Run tests and linting across multiple Node.js versions
- **Jobs**:
    - **lint-required** — Runs all linters (JS, JSON, Markdown, CSS, HTML, Prettier) on Node.js 20.x
    - **test** — Runs tests with coverage on Node.js 20.x and 22.x, verifies package can be packed

### Release Workflow (`workflows/release.yml`)

- **Triggers**: Manual dispatch only (`workflow_dispatch`)
- **Purpose**: Publish package to npm and create a GitHub release
- **Process**:
    1. Install, test with coverage, and lint
    1. Read version from `package.json`
    1. Publish to npm with `--access=public`
    1. Create GitHub release with tag

## Release Process

1. Edit the version in `package.json` directly (do not use `npm version`)
1. Merge to main
1. Manually trigger the Release workflow from the Actions tab
1. The workflow publishes to npm and creates a GitHub release with the tag

## Local Testing with act

[act](https://github.com/nektos/act) allows you to run GitHub Actions locally for testing.

### Prerequisites

1. Install act: https://github.com/nektos/act#installation
1. Install Docker: https://www.docker.com/products/docker-desktop
1. Copy `.secrets.example` to `.secrets` and update with your values

### Running Tests

```bash
# Run specific workflow
./.github/test-actions.sh run ci.yml

# Run all workflows
./.github/test-actions.sh all

# List available workflows
./.github/test-actions.sh list
```

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
- Required tokens: `NPM_TOKEN`, `GITHUB_TOKEN`, `CODECOV_TOKEN`
