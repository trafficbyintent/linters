# TXI Style Guide Documentation

This documentation contains development standards and implementation guides for TXI projects.

**For AI Coding Agents**: Start with [Agent Preflight Check](./agent/AGENT_PREFLIGHT.md).

## 📚 Documentation Structure

### [🛩️ Agent Documentation](./agent/)

**MANDATORY for all AI agents** working with TXI repositories:

- **[AGENT_PREFLIGHT.md](./agent/AGENT_PREFLIGHT.md)** - Required preflight check for ALL interactions
- **[Agent Standards](./agent/README.md)** - Core requirements and principles
- **[Protocols](./agent/PROTOCOLS.md)** - Step-by-step procedures for development tasks and setup instructions
- **[Standards](./agent/STANDARDS.md)** - Detailed agent-specific requirements

### [📖 Guides](./guides/)

Implementation guides and how-to documentation for using the TXI Style Guide effectively.

- **[Agent Setup Guide](./guides/AGENT_SETUP.md)** - Installing and configuring Claude Code for TXI standards
- **[Linter Setup Guide](./guides/LINTER_SETUP.md)** - Complete guide for setting up all linters
- **[NPM Release Guide](./guides/NPM_RELEASE_GUIDE.md)** - Process for releasing NPM packages
- More guides coming soon...

### [📏 Standards](./standards/)

Official development standards and conventions for TXI projects.

#### [Style Guides](./standards/style-guides/)

Language and framework-specific coding standards:

- **[JavaScript Style Guide](./standards/style-guides/JAVASCRIPT_STYLE_GUIDE.md)**
- **[TypeScript Style Guide](./standards/style-guides/TYPESCRIPT_STYLE_GUIDE.md)**
- **[CSS Style Guide](./standards/style-guides/CSS_STYLE_GUIDE.md)**
- **[HTML Style Guide](./standards/style-guides/HTML_STYLE_GUIDE.md)**
- **[React Style Guide](./standards/style-guides/REACT_STYLE_GUIDE.md)**
- **[Angular Style Guide](./standards/style-guides/ANGULAR_STYLE_GUIDE.md)**
- **[Markdown Style Guide](./standards/style-guides/MARKDOWN_STYLE_GUIDE.md)**
- **[JSON Style Guide](./standards/style-guides/JSON_STYLE_GUIDE.md)**

#### Other Standards

- **[API Standards](./standards/API_STANDARDS.md)** - RESTful API design principles
- **[Terraform Standards](./standards/TERRAFORM_STANDARDS.md)** - Infrastructure as code best practices
- **[Dockerfile Standards](./standards/DOCKERFILE_STANDARDS.md)** - Container image guidelines
- **[Development Guide](./standards/DEVELOPMENT_STANDARDS.md)** - General development practices

#### License Templates

- **[Internal License Example](./standards/LICENSE_INTERNAL_EXAMPLE.md)**
- **[MIT License Example](./standards/LICENSE_MIT_EXAMPLE.md)**

## 🚀 Quick Start

1. **Install the Style Guide Package**

   ```bash
   npm install --save-dev @trafficbyintent/style-guide
   ```

2. **Choose Your Language/Framework**
   - Navigate to the appropriate style guide in [standards/style-guides/](./standards/style-guides/)
   - Follow the conventions outlined in the guide

3. **Set Up Linters**
   - Follow the [Linter Setup Guide](./guides/LINTER_SETUP.md)
   - Configure your IDE for automatic formatting

4. **Start Coding!**
   - Write code following the standards
   - Run linters to ensure compliance
   - Commit clean, consistent code

## 🤝 Contributing

To contribute to the TXI Style Guide:

1. Review the relevant standards
2. Propose changes via pull request
3. Ensure all linters pass
4. Update documentation as needed

## 📞 Support

For questions or issues:

- Check the relevant guide or standard
- Open an issue in the repository
- Contact the TXI development team
