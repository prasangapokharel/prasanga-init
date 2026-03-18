# Prasanga UI - Project Structure Guide

## Overview

Prasanga UI uses a scalable, maintainable folder structure inspired by Next.js principles. This guide explains the purpose of each folder and how to navigate the codebase.

## Directory Structure

```
src/
├── components/ui/          # 33+ reusable UI components
├── lib/                    # Core libraries & utilities
├── styles/                 # Global styles & CSS variables
├── constants/              # Application constants & enums
├── types/                  # TypeScript type definitions
├── services/               # API services & external integrations
├── hooks/                  # Custom React hooks
├── config/                 # Configuration & environment variables
└── utils/                  # Pure utility functions
```

---

## Detailed Folder Descriptions

### `/src/components/ui` - UI Component Library

**Purpose**: Contains 33+ production-ready, reusable UI components.

**What goes here**:
- Button, Input, Checkbox, Radio components
- Card, Modal, Toast, Alert components
- Form components (Select, Textarea, DatePicker, etc.)
- Layout components (Drawer, Sheet, Popover, etc.)
- Display components (Badge, Progress, Spinner, Tooltip, etc.)

**Usage**:
```tsx
import { Button, Input, Card } from "@/components/ui";

export function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button label="Submit" onPress={() => {}} />
    </Card>
  );
}
```

**Best Practices**:
- Components are **presentation-only** (no business logic)
- All props are documented with TypeScript
- Uses `typography` system for consistent font sizing
- Uses theme colors via `useTheme()` hook
- Fully accessible with proper ARIA labels

---

### `/src/lib` - Core Libraries

**Purpose**: Fundamental libraries shared across the app.

**Contents**:
- `theme.ts` - Color definitions for light/dark modes
- `theme-context.tsx` - Theme provider & `useTheme()` hook
- `typography.ts` - Typography system (font sizes, weights)
- `api-schema.ts` - API endpoints, schemas, types, examples
- `utils.ts` - General utilities
- `index.ts` - Barrel exports

**Usage**:
```tsx
import { useTheme } from "@/lib/theme-context";
import { typography } from "@/lib/typography";
import { API_ENDPOINTS } from "@/lib/api-schema";
```

**Key Files Explained**:
- **api-schema.ts**: Single source of truth for all API information
  - `API_ENDPOINTS` - All backend endpoints
  - `REQUEST_SCHEMAS` - Expected request payloads
  - `RESPONSE_SCHEMAS` - Expected response formats
  - `ERROR_CODES` - All possible error codes
  - `EXAMPLES` - Real request/response examples
  - TypeScript types: `User`, `AuthResponse`, `LoginRequest`, etc.

---

### `/src/styles` - Global Styles

**Purpose**: Global CSS variables and theme definitions.

**Contents**:
- `globals.css` - CSS variables for light/dark modes

**CSS Variables**:
```css
:root {
  --color-primary: #007AFF;
  --color-text: #000000;
  /* ...more variables */
}

.dark {
  --color-primary: #0A84FF;
  --color-text: #FFFFFF;
  /* ...more dark variables */
}
```

---

### `/constants` - Application Constants

**Location**: `/constants/index.ts` (root level, not in src/)

**Purpose**: Centralized location for all hardcoded values.

**Contents**:
- `APP_CONFIG` - Name, version, build, author
- `API_CONFIG` - Base URL, timeout, retry attempts
- `THEME_CONFIG` - Default theme, persistence settings
- `COMPONENT_DEFAULTS` - Toast duration, modal opacity, etc.
- `VALIDATION_RULES` - Email regex, password rules, phone pattern
- `PAGINATION` - Default page size, max limit
- `USER_STATUS` & `USER_ROLES` - Enums
- `ANIMATIONS` - Duration constants
- `BREAKPOINTS` - Device size breakpoints
- `SPACING`, `BORDER_RADIUS`, `Z_INDEX` - Design system values

**Usage**:
```tsx
import { API_CONFIG, VALIDATION_RULES, ANIMATIONS } from "@/constants";

const timeout = API_CONFIG.TIMEOUT; // 30000
const emailRegex = VALIDATION_RULES.EMAIL;
const animationDuration = ANIMATIONS.NORMAL; // 300ms
```

**Why Separate File**: Environment-independent constants that don't change per environment. Environment-specific config goes in `.env` files.

---

### `/src/types` - TypeScript Definitions

**Purpose**: Centralized type definitions for the entire application.

**Structure**:
- `index.ts` - Barrel exports (import everything from one file)
- `common.ts` - Shared types used everywhere
- `api.ts` - API request/response types
- `user.ts` - User domain types & extended user info
- `theme.ts` - Theme & color-related types
- `component.ts` - Common component prop types

**Key Types**:
```tsx
// From types/common.ts
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
};

// From types/api.ts
type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin" | "moderator";
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  updatedAt: string;
};

// From types/component.ts
type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
  onPress: () => void;
};
```

**Usage**:
```tsx
import type { User, ApiResponse, ButtonProps } from "@/types";

const handleResponse = (response: ApiResponse<User>) => {
  if (response.success) {
    console.log(response.data.email);
  }
};
```

**Best Practices**:
- Always export from `index.ts` barrel file
- Keep related types together in domain files
- Use discriminated unions for variant types
- Document complex types with JSDoc comments

---

### `/src/services` - API Services

**Purpose**: Centralized HTTP client and external integrations.

**Contents**:
- `api.ts` - HTTP client with retry logic & token management
- `index.ts` - Barrel exports

**Main Features**:
- Automatic retry with exponential backoff
- Request/response error handling
- JWT token management (set/get/clear)
- Timeout handling
- Built-in request interceptors

**Usage**:
```tsx
import { apiService } from "@/services";

// Set authentication tokens
apiService.setTokens(token, refreshToken);

// Make API calls
const response = await apiService.post("/auth/login", { email, password });

// Automatic retry on network errors
const users = await apiService.get("/users");
```

**Class Methods**:
- `setTokens(token, refreshToken?)` - Store auth tokens
- `clearTokens()` - Remove auth tokens
- `getToken()` - Get current token
- `get<T>(endpoint, params?, options?)` - GET request
- `post<T>(endpoint, body?, options?)` - POST request
- `put<T>(endpoint, body?, options?)` - PUT request
- `patch<T>(endpoint, body?, options?)` - PATCH request
- `delete<T>(endpoint, options?)` - DELETE request

---

### `/src/hooks` - Custom React Hooks

**Purpose**: Reusable logic extracted into custom hooks.

**Contents**:
- `useApi.ts` - API call wrapper with loading/error states
- `useValidation.ts` - Form validation hook
- `usePagination.ts` - Pagination state management
- `index.ts` - Barrel exports

**Key Hooks**:

**useApi** - Simplifies API calls:
```tsx
import { useApi } from "@/hooks";

export function UsersList() {
  const { data, isLoading, error, refetch } = useApi(
    () => apiService.get("/users"),
    { autoFetch: true }
  );

  if (isLoading) return <Spinner />;
  if (error) return <Alert message={error.message} />;

  return <List items={data} />;
}
```

**useValidation** - Form field validation:
```tsx
import { useValidation } from "@/hooks";

export function LoginForm() {
  const { errors, validateField, hasError } = useValidation();

  return (
    <>
      <Input
        value={email}
        onBlur={() => validateField("email", email, emailRule)}
        error={hasError("email")}
      />
    </>
  );
}
```

**usePagination** - Page management:
```tsx
import { usePagination } from "@/hooks";

export function UsersList() {
  const { page, nextPage, prevPage, total } = usePagination({
    initialPage: 1,
    initialLimit: 20,
  });

  return (
    <>
      {/* List items */}
      <Button label="Next" onPress={nextPage} />
    </>
  );
}
```

---

### `/src/config` - Configuration

**Purpose**: Type-safe access to environment variables.

**Contents**:
- `env.ts` - Environment variable access with validation
- `index.ts` - Barrel exports

**Key Functions**:
```tsx
import { env, isDevelopment, isProduction } from "@/config";

const apiUrl = env.API_BASE_URL; // "http://localhost:3000/api"
const timeout = env.API_TIMEOUT; // 30000

if (isDevelopment()) {
  console.log("Running in development");
}
```

**Environment Variables**:
- `EXPO_PUBLIC_API_BASE_URL` - API server URL
- `EXPO_PUBLIC_API_TIMEOUT` - Request timeout in ms
- `EXPO_PUBLIC_THEME_DEFAULT` - Initial theme (light/dark)
- `EXPO_PUBLIC_ENABLE_LOGGING` - Enable debug logging
- And 20+ more (see `.env.example`)

**Best Practices**:
- Access env vars only from `config/env.ts`
- Never hardcode environment-specific values
- Use `.env.local` for development secrets
- Never commit `.env` files to git

---

### `/src/utils` - Utility Functions

**Purpose**: Pure, reusable utility functions.

**Structure**:
- `validation.ts` - Form validation helpers
- `formatting.ts` - Data formatting helpers
- `api-helpers.ts` - API-related utilities
- `index.ts` - Barrel exports

**Examples**:

**validation.ts**:
```tsx
import { isValidEmail, isValidPassword, getPasswordStrength } from "@/utils";

const isValid = isValidEmail("user@example.com"); // true
const strength = getPasswordStrength("MyPass123!"); // 4 (strong)
```

**formatting.ts**:
```tsx
import { formatCurrency, formatDate, formatRelativeTime, truncate } from "@/utils";

formatCurrency(1234.56, "USD"); // "$1,234.56"
formatDate("2024-03-19"); // "3/19/2024"
formatRelativeTime("2024-03-18"); // "1d ago"
truncate("Hello World", 8); // "Hello..."
```

**api-helpers.ts**:
```tsx
import { isApiSuccess, isAuthError, formatApiErrorForDisplay } from "@/utils";

if (isApiSuccess(response)) {
  console.log(response.data);
}

if (isAuthError(error)) {
  // Redirect to login
}
```

**Best Practices**:
- Keep functions pure (no side effects)
- Export from barrel file (`index.ts`)
- Document functions with JSDoc
- Write tests for complex logic
- Name functions descriptively

---

## Import Conventions

### Barrel Exports (Recommended)
```tsx
// ✅ Good - Clean, maintainable
import { Button, Input, Card } from "@/components/ui";
import { useApi, useValidation } from "@/hooks";
import { isValidEmail, formatCurrency } from "@/utils";
import type { User, ApiResponse } from "@/types";
```

### Direct Imports (Avoid)
```tsx
// ❌ Avoid - Creates dependencies on internal structure
import Button from "@/components/ui/button";
import useApi from "@/hooks/useApi";
```

---

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `Button.tsx`, `UserCard.tsx` |
| Hooks | camelCase with `use` prefix | `useApi.ts`, `useValidation.ts` |
| Utilities | camelCase | `formatCurrency.ts`, `validation.ts` |
| Types | PascalCase or types in same file | `User`, `ApiResponse` |
| Folders | kebab-case or lowercase | `ui-components`, `api-services` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_RETRY_ATTEMPTS` |

---

## Adding New Features

### Adding a New Component
1. Create file in `/src/components/ui/my-component.tsx`
2. Export from `/src/components/ui/index.ts`
3. Add TypeScript types for props
4. Use typography system & theme colors
5. Document with JSDoc comments

### Adding a New Hook
1. Create file in `/src/hooks/useMyHook.ts`
2. Export from `/src/hooks/index.ts`
3. Add comprehensive TypeScript types
4. Include usage examples in comments

### Adding New Types
1. Create or update file in `/src/types/domain.ts`
2. Export from `/src/types/index.ts`
3. Document complex types with comments

### Adding New API Endpoint
1. Add endpoint to `API_ENDPOINTS` in `/src/lib/api-schema.ts`
2. Add request/response schemas
3. Add TypeScript types
4. Add examples
5. Use via `apiService` in components

---

## Environment Configuration

All environment-specific configuration uses `.env` files:

```bash
# .env.development
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api
EXPO_PUBLIC_ENABLE_LOGGING=true

# .env.production
EXPO_PUBLIC_API_BASE_URL=https://api.production.com
EXPO_PUBLIC_ENABLE_LOGGING=false
```

Access via:
```tsx
import { env } from "@/config";

const apiUrl = env.API_BASE_URL; // From .env file
```

---

## Summary

| Folder | Purpose | Access via |
|--------|---------|-----------|
| `/components/ui` | UI Components | `import { Button } from "@/components/ui"` |
| `/lib` | Core Libraries | `import { useTheme } from "@/lib/theme-context"` |
| `/styles` | Global CSS | CSS variables in HTML/JSX |
| `/constants` | Static Constants | `import { API_CONFIG } from "@/constants"` |
| `/types` | Type Definitions | `import type { User } from "@/types"` |
| `/services` | API & External APIs | `import { apiService } from "@/services"` |
| `/hooks` | Custom Hooks | `import { useApi } from "@/hooks"` |
| `/config` | Env Configuration | `import { env } from "@/config"` |
| `/utils` | Utility Functions | `import { formatCurrency } from "@/utils"` |

This structure ensures scalability, maintainability, and a clear separation of concerns across your entire application.
