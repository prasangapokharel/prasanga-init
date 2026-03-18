# Prasanga UI - Contributing Guidelines

## Welcome!

Thank you for contributing to Prasanga UI! This guide will help you understand our development process and best practices.

---

## Table of Contents

1. [Development Setup](#development-setup)
2. [Code Standards](#code-standards)
3. [Commit Guidelines](#commit-guidelines)
4. [Pull Request Process](#pull-request-process)
5. [Testing](#testing)
6. [Documentation](#documentation)

---

## Development Setup

### 1. Fork and Clone

```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/PrasangaKit.git
cd PrasangaKit

# Add upstream for sync
git remote add upstream https://github.com/anomalyco/PrasangaKit.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Feature Branch

```bash
# Update main first
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

### 4. Start Development

```bash
# Run type check while developing
npm run type-check

# Start app in development
npm run ios    # or android/web
```

---

## Code Standards

### TypeScript

- **Always use TypeScript** - No `any` types without justification
- **Export types** - Export types from `@/types` barrel file
- **Use strict mode** - Follow tsconfig.json strictness settings
- **Document complex types** - Add JSDoc comments

```tsx
// ✅ Good
import type { User, ApiResponse } from "@/types";

export async function getUser(id: string): Promise<ApiResponse<User>> {
  return apiService.get(`/users/${id}`);
}

// ❌ Bad
import type { User } from "../types/api";
export async function getUser(id: any): Promise<any> {
  return apiService.get(`/users/${id}`);
}
```

### Components

**Functional Components Only**:
```tsx
// ✅ Good - Functional component with hooks
import { useState } from "react";
import { Button } from "@/components/ui";

export function Counter() {
  const [count, setCount] = useState(0);
  return <Button label={`Count: ${count}`} onPress={() => setCount(count + 1)} />;
}

// ❌ Avoid - Class components
class Counter extends React.Component {
  // ...
}
```

**Prop Types**:
```tsx
import type { ButtonProps } from "@/types";

// ✅ Good - Type from types folder
export function Button(props: ButtonProps) {
  // Implementation
}

// ❌ Bad - Inline interface
export function Button(props: { label: string; onPress: () => void }) {
  // Implementation
}
```

**Naming Conventions**:
```tsx
// ✅ Good
export function UserCard() {}          // PascalCase for components
const handleUserPress = () => {};     // camelCase for functions
const isUserActive = true;            // camelCase for variables
const MAX_RETRY_ATTEMPTS = 3;         // UPPER_SNAKE_CASE for constants

// ❌ Avoid
export function user_card() {}        // snake_case
const handleUserPress = () => {};    // Descriptive enough
const isactive = true;               // Not clear
```

### Hooks

**Custom Hooks Pattern**:
```tsx
// ✅ Good - Descriptive name, clear return type
export function useUserData(userId: string): UseUserDataReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Implementation...
  
  return { user, loading };
}

// ❌ Bad - Unclear purpose, any types
export function useData(id: any): any {
  // Implementation...
}
```

### Utilities

**Pure Functions**:
```tsx
// ✅ Good - No side effects
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// ❌ Bad - Modifies global state
let total = 0;
export function addToTotal(amount: number) {
  total += amount;
  return total;
}
```

### Code Comments

```tsx
// ✅ Good - Comments explain WHY, not WHAT

/**
 * Hook for API calls with automatic state management
 * @param fn - Async function that returns ApiResponse<T>
 * @param options - Configuration options
 * @returns Object with data, loading, error states
 */
export function useApi<T>(fn: () => Promise<ApiResponse<T>>) {
  // Retry logic uses exponential backoff to handle transient failures
  const [state, setState] = useState<LoadingState>("idle");
  // ...
}

// ❌ Bad - Comments state the obvious
export function useApi<T>(fn: () => Promise<ApiResponse<T>>) {
  // Set state to idle
  const [state, setState] = useState<LoadingState>("idle");
  // ...
}
```

### Formatting

```tsx
// All files formatted with Prettier
// Run before committing:
npm run format

// Check formatting:
npm run format:check
```

---

## Commit Guidelines

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `refactor` - Code refactoring
- `perf` - Performance improvement
- `test` - Test changes
- `docs` - Documentation
- `chore` - Maintenance, dependencies
- `style` - Formatting, missing semicolons (no code change)

### Examples

```bash
# New feature
git commit -m "feat(components): add new Avatar component with image fallback"

# Bug fix
git commit -m "fix(hooks): correct useApi retry logic for timeout errors"

# Documentation
git commit -m "docs(setup): add environment variable configuration guide"

# Refactoring
git commit -m "refactor(services): simplify error handling in API service"

# With body
git commit -m "feat(types): add comprehensive type definitions

- Export types from barrel file
- Add JSDoc comments
- Document all types

Closes #123"
```

### Good Commit Practices

1. **Atomic commits** - One logical change per commit
2. **Early and often** - Commit frequently during development
3. **Clear messages** - Describe what and why
4. **Reference issues** - Link to GitHub issues
5. **No secrets** - Never commit API keys or tokens

---

## Pull Request Process

### Before Creating PR

1. **Update your branch**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests**:
   ```bash
   npm run type-check
   npm run test
   ```

3. **Format code**:
   ```bash
   npm run format
   ```

### Creating a PR

1. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR on GitHub** with:
   - **Title**: Follow commit guidelines (`feat: add new component`)
   - **Description**: Explain what changed and why
   - **Screenshots**: For UI changes
   - **Links**: Reference related issues

3. **PR Template**:
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] New feature
   - [ ] Bug fix
   - [ ] Breaking change
   - [ ] Documentation update

   ## Changes Made
   - Added X feature
   - Fixed Y bug
   - Updated Z documentation

   ## Testing
   - [ ] Code type-checks (npm run type-check)
   - [ ] All tests pass (npm run test)
   - [ ] Manual testing completed

   ## Screenshots
   (if applicable)

   ## Closes
   Closes #123
   ```

### PR Review Process

1. **Automated checks** - Must pass:
   - TypeScript validation (`npm run type-check`)
   - Tests (`npm run test`)
   - Code formatting (`npm run format:check`)

2. **Code review** - At least one maintainer must approve

3. **Merge** - Rebase and merge to main

---

## Testing

### Run Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Writing Tests

```tsx
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "@/components/ui";

describe("Button Component", () => {
  it("should call onPress when pressed", () => {
    const handlePress = jest.fn();
    const { getByText } = render(
      <Button label="Click me" onPress={handlePress} />
    );

    fireEvent.press(getByText("Click me"));
    expect(handlePress).toHaveBeenCalled();
  });

  it("should be disabled when disabled prop is true", () => {
    const { getByTestId } = render(
      <Button
        label="Disabled"
        onPress={() => {}}
        disabled={true}
        testID="disabled-btn"
      />
    );

    expect(getByTestId("disabled-btn")).toBeDisabled();
  });
});
```

### Test Checklist

- [ ] Tests for new features
- [ ] Tests for bug fixes
- [ ] Integration tests for complex flows
- [ ] Error handling tests
- [ ] Edge case tests

---

## Documentation

### Adding Documentation

1. **Code comments** - JSDoc for public APIs
2. **README updates** - Update relevant docs
3. **Changelog** - Document breaking changes

### Example Documentation

```tsx
/**
 * Hook for fetching data from API endpoints
 *
 * @param fn - Async function that returns API response
 * @param options - Configuration options
 * @param options.autoFetch - Auto-fetch on mount (default: true)
 * @param options.onSuccess - Success callback
 * @param options.onError - Error callback
 *
 * @returns Object with data, loading, error states and refetch method
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useApi(
 *   () => apiService.get("/users"),
 *   { autoFetch: true }
 * );
 * ```
 */
export function useApi<T>(
  fn: () => Promise<ApiResponse<T>>,
  options?: UseApiOptions
): UseApiReturn<T> {
  // Implementation...
}
```

### Documentation Files to Update

- `docs/README.md` - Overview and quick start
- `docs/STRUCTURE.md` - Project structure
- `docs/API.md` - API reference
- `docs/SETUP.md` - Setup guide
- `docs/CONTRIBUTING.md` - This file
- `docs/COMPONENTS.md` - Component documentation

---

## Common Issues & Solutions

### TypeScript Errors

```bash
# Check for errors
npm run type-check

# Fix automatic formatting issues
npm run format

# Clear cache and retry
rm -rf node_modules
npm install
npm run type-check
```

### Import Path Issues

Ensure imports use barrel files:
```tsx
// ✅ Correct
import { Button } from "@/components/ui";
import { useApi } from "@/hooks";
import type { User } from "@/types";

// ❌ Wrong
import Button from "@/components/ui/button";
import useApi from "@/hooks/useApi";
```

### Git Conflicts

```bash
# Update and rebase
git fetch upstream
git rebase upstream/main

# Resolve conflicts in your editor
# Then continue rebase
git add .
git rebase --continue
```

### Test Failures

```bash
# Run specific test
npm run test -- Button.test.tsx

# Debug mode
node --inspect-brk node_modules/.bin/jest --runInBand

# Update snapshots
npm run test -- -u
```

---

## Code Review Checklist

Before submitting code for review:

- [ ] Follows TypeScript strict mode
- [ ] Type-safe (no `any` types)
- [ ] Meaningful variable/function names
- [ ] No console.log statements (except debug)
- [ ] No commented-out code
- [ ] JSDoc comments for public APIs
- [ ] Tests pass (`npm run test`)
- [ ] Type-check passes (`npm run type-check`)
- [ ] Formatting correct (`npm run format:check`)
- [ ] No lint errors
- [ ] Updated documentation if needed
- [ ] No secrets or sensitive data

---

## Getting Help

- **Issues** - Search existing issues first
- **Discussions** - Ask questions in discussions
- **Email** - Contact maintainers
- **Discord** - Join community server

---

## Code of Conduct

Please note we have a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

## Thank You!

Your contributions make Prasanga UI better for everyone. Thank you for helping! 🚀
