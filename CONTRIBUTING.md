# Contributing to BoldKit

Thanks for your interest in contributing to BoldKit! This document outlines the process for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/boldkit.git
   cd boldkit
   ```
3. Install dependencies:
   ```bash
   bun install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development

Start the development server:
```bash
bun run dev
```

Run type checking:
```bash
bun run typecheck
```

Run linting:
```bash
bun run lint
```

Format code:
```bash
bun run format
```

## Making Changes

### Adding a New Component

1. Create the component in `src/components/ui/`
2. Follow the existing component patterns (use Radix UI primitives when applicable)
3. Use the `cn()` utility for className merging
4. Apply neubrutalism styling with BoldKit CSS variables
5. Export the component from `src/components/ui/index.ts`
6. Add a demo in the Components page

### Code Style

- Use TypeScript for all new code
- Follow the existing code patterns
- Use Tailwind CSS classes with BoldKit's design tokens
- Keep components accessible (use Radix UI primitives)
- Write self-documenting code

## Submitting Changes

### Pull Request Process

1. Ensure your code passes all checks:
   ```bash
   bun run typecheck
   bun run lint
   bun run build
   ```

2. Update documentation if needed

3. Push your changes:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Open a Pull Request against the `main` branch

5. Fill out the PR template with:
   - Summary of changes
   - Related issue (if any)
   - Screenshots (for UI changes)
   - Testing instructions

6. Wait for review and address any feedback

### PR Requirements

- All PRs require at least one approval before merging
- All CI checks must pass
- Keep PRs focused and reasonably sized
- Write clear commit messages

## Reporting Issues

### Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/environment information
- Screenshots if applicable

### Feature Requests

For feature requests, please include:
- Clear description of the feature
- Use case / motivation
- Any implementation ideas (optional)

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow

## Questions?

Feel free to open an issue for any questions about contributing.

Thank you for helping make BoldKit better!
