# agents.md

This file provides configuration and guidance for AI agents working with the BigDesign component library.

## Agent Capabilities & Tools

### Code Analysis & Search
- **Glob**: Fast file pattern matching for finding components, tests, and documentation
- **Grep**: Powerful regex search using grep for code patterns and implementations
- **Read**: File content analysis with support for TypeScript, React, and test files

### Code Modification
- **Edit**: Precise string replacements in existing files
- **MultiEdit**: Batch edits across multiple locations in a single file
- **Write**: Create new files when absolutely necessary (prefer editing existing files)

### Development Workflow
- **Bash**: Execute build, test, lint, and development commands
- **TodoWrite**: Track multi-step tasks and ensure completion

## Component Development Patterns

### Component Structure
When working with components, follow this established pattern:
```
packages/big-design/src/components/ComponentName/
├── ComponentName.tsx        # Main component implementation
├── styled.tsx              # Styled components and styling
├── index.ts                # Public exports
├── spec.tsx                # Jest tests
├── __snapshots__/          # Jest snapshots
└── SubComponent/           # Sub-components (if any)
    ├── SubComponent.tsx
    ├── styled.tsx
    └── index.ts
```

### Development Commands
Always run from repository root:
```bash
# Setup (required before development)
pnpm install
pnpm run build:icons

# Development
pnpm run start              # Start docs with live reload

# Testing
pnpm run test              # Run all tests
pnpm -F @bigcommerce/big-design run test # Package-specific tests
pnpm run test --update-snapshot          # Update snapshots

# Code Quality
pnpm run lint              # Lint all packages
pnpm run typecheck         # Type check all packages
```

### Component Implementation Guidelines

#### 1. TypeScript Patterns
- Use strict typing with proper interfaces
- Extend base HTML element props when appropriate

#### 2. Styled Components
- All styling in `styled.tsx` files
- Use theme tokens from `@bigcommerce/big-design-theme`
- Implement responsive design patterns
- Support logical margin/padding system props (not directional)
- Do not forward `className` and `style` props unless explicitly instructed by a human

#### 3. Testing Requirements
- Jest tests with React Testing Library in `spec.tsx`
- Test component rendering, interactions, and accessibility
- Snapshot tests for styled components (may need updates after style changes) but only 1-2 per spec file
- Use `jest-styled-components` for style assertions

#### 4. Documentation
- Add usage examples in component documentation
- Update docs site examples when adding or changing features

## Testing Workflow

### Running Tests
1. **Full test suite**: `pnpm run test`
2. **Package-specific**: `pnpm -F @bigcommerce/big-design run test`
3. **Watch mode**: `pnpm run test:watch`
4. **Coverage**: `pnpm run ci:test`

### Snapshot Management
When styled components change:
1. Navigate to package: `cd packages/big-design`
2. Update snapshots: `pnpm run test --update-snapshot`
3. Review snapshot changes carefully before committing

### Test Organization
- Group related tests using `describe` blocks but only for related functionality
- Test both positive and negative scenarios
- Include accessibility tests with appropriate ARIA attributes
- Mock external dependencies appropriately

## Code Quality Standards

### Linting & Type Checking
Always run before committing:
```bash
pnpm run lint              # ESLint + Prettier
pnpm run typecheck         # TypeScript compilation
```

### Pre-commit Workflow
1. Make changes to components/tests
2. Run `pnpm run build:icons` if icon changes
3. Run `pnpm run lint` and fix any issues
4. Run `pnpm run typecheck` and resolve type errors
5. Run `pnpm run test` and ensure all tests pass
6. Generate a changeset using `pnpm changeset` while following the prompts to the best of your ability
7. Update snapshots if needed
8. Commit changes

## Build System (Turborepo)

### Key Concepts
- Monorepo with workspace dependencies using `workspace:^` protocol
- Turborepo handles build orchestration and caching
- Package build outputs go to `dist/` directories
- Icons must be built before other packages

### Build Dependencies
Resolve dependency ordering via Turbo

### Common Issues
- **Icons not found**: Run `pnpm run build:icons`
- **Type errors**: Ensure all packages are built in correct order
- **Stale cache**: Clear with `turbo clean` if needed

## Documentation Site

### Live Development
- Start with `pnpm run start`
- Documentation lives in `packages/docs/`
- Uses Next.js with live code examples
- Component examples are interactive and editable

### Adding Component Documentation
1. Include live code examples using the docs component system
2. Document all props with descriptions and examples following existing patterns
3. Include accessibility guidelines and best practices

## AI Agent Best Practices

### Task Management
- Use TodoWrite tool for multi-step component development
- Break down complex tasks (new components, major refactors)
- Track progress through build, test, and documentation phases

### Code Analysis Approach
1. **Understand existing patterns**: Read similar components first
2. **Check dependencies**: Examine imports and package.json files
3. **Follow conventions**: Match existing code style and patterns
4. **Test thoroughly**: Run full test suite after changes

### Error Handling
- Build errors: Check TypeScript types and imports
- Test failures: Review snapshots and component behavior
- Lint errors: Follow established code formatting rules
- Type errors: Ensure proper prop interfaces and theme usage

### File Operations
- **Prefer editing** existing files over creating new ones
- **Follow naming conventions** established in the codebase
- **Use MultiEdit** for multiple changes in the same file
- **Read files first** to understand context before editing

## Specific to BigDesign

### Theme System
- All styling uses `@bigcommerce/big-design-theme`
- Use theme tokens for colors, spacing, typography

### Icon System
- Icons are SVG components in `@bigcommerce/big-design-icons`
- Build icons before other packages: `pnpm run build:icons`
- Icons are used throughout components for consistency

### Accessibility
- All interactive components must be keyboard accessible
- Include proper ARIA attributes and roles
- Test with screen readers when possible
- Follow WCAG 2.2 AA guidelines

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- React 18 and styled-components 5.x
- TypeScript strict mode enabled

## Emergency Procedures

### Broken Build
1. Check TypeScript errors first
2. Ensure icons are built: `pnpm run build:icons`
3. Clear cache: `turbo clean`
4. Rebuild: `pnpm run build`

### Test Failures
1. Check if snapshots need updating
2. Verify component changes don't break existing behavior
3. Run tests in isolation to identify specific failures
4. Update snapshots carefully after reviewing changes

### Deployment Issues
1. All packages must build successfully
2. Tests must pass completely
3. Documentation must build without errors
