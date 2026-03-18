# Prasanga UI - Setup & Configuration Guide

## Quick Start

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/anomalyco/PrasangaKit.git
cd PrasangaKit

# Install dependencies
npm install

# or with yarn
yarn install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env.development
cp .env.example .env.production

# Edit .env files with your values
nano .env.development
```

### 3. Start Development Server

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

---

## Environment Configuration

### Understanding Environment Files

Prasanga UI uses environment files to manage configuration per environment:

```
.env.example          # Template for all available options
.env                  # Development (default, git-ignored)
.env.development      # Development overrides
.env.production       # Production settings
.env.staging          # Staging settings (optional)
```

### Available Environment Variables

#### API Configuration

```bash
# API Server URL
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Request timeout in milliseconds
EXPO_PUBLIC_API_TIMEOUT=30000

# Number of retry attempts on network errors
EXPO_PUBLIC_API_RETRY_ATTEMPTS=3
```

#### Application

```bash
# App version (used in API User-Agent)
EXPO_PUBLIC_APP_VERSION=1.3.1

# App name
EXPO_PUBLIC_APP_NAME=Prasanga UI

# Development, staging, or production
EXPO_PUBLIC_ENVIRONMENT=development

# Enable debug logging
EXPO_PUBLIC_ENABLE_LOGGING=true
```

#### Theme

```bash
# Default theme: light, dark, or auto
EXPO_PUBLIC_THEME_DEFAULT=light

# Persist theme preference across app restarts
EXPO_PUBLIC_THEME_PERSISTENCE=true
```

#### Components

```bash
# Toast notification display duration (ms)
EXPO_PUBLIC_TOAST_DURATION=3000

# Modal overlay opacity (0.0 - 1.0)
EXPO_PUBLIC_MODAL_OVERLAY_OPACITY=0.5

# Drawer animation duration (ms)
EXPO_PUBLIC_DRAWER_ANIMATION_DURATION=400
```

#### Features

```bash
# Analytics integration
EXPO_PUBLIC_ENABLE_ANALYTICS=false

# Error crash reporting
EXPO_PUBLIC_ENABLE_CRASH_REPORTING=false

# Sentry DSN for error tracking
EXPO_PUBLIC_SENTRY_DSN=

# Google Analytics tracking ID
EXPO_PUBLIC_ANALYTICS_TRACKING_ID=
```

#### Security (Never Commit These)

```bash
# API key (if required by backend)
EXPO_PUBLIC_API_KEY=

# API secret (keep in .env.local only)
EXPO_SECRET_API_SECRET=

# Database URL (if applicable)
EXPO_SECRET_DB_URL=
```

### Using Environment Variables

```tsx
import { env, isDevelopment, isProduction } from "@/config";

// Access variables
const apiUrl = env.API_BASE_URL;
const timeout = env.API_TIMEOUT;
const theme = env.THEME_DEFAULT;

// Check environment
if (isDevelopment()) {
  console.log("Running in development");
  env.logEnvironmentInfo(); // Print all env vars (dev only)
}

// Type-safe access
type AppConfig = typeof env;
```

### Environment-Specific Configuration

#### Development

```bash
# .env.development
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api
EXPO_PUBLIC_ENABLE_LOGGING=true
EXPO_PUBLIC_ENVIRONMENT=development
EXPO_PUBLIC_THEME_DEFAULT=light
```

#### Production

```bash
# .env.production
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
EXPO_PUBLIC_ENABLE_LOGGING=false
EXPO_PUBLIC_ENVIRONMENT=production
EXPO_PUBLIC_THEME_DEFAULT=auto
```

---

## Constants Configuration

Besides environment variables, Prasanga UI has built-in constants in `/constants/index.ts` that you can customize:

### API Configuration

```tsx
import { API_CONFIG } from "@/constants";

API_CONFIG.BASE_URL      // From env, fallback to localhost
API_CONFIG.TIMEOUT       // From env, default 30000ms
API_CONFIG.RETRY_ATTEMPTS // From env, default 3
API_CONFIG.RETRY_DELAY   // 1000ms between retries
```

### Theme Configuration

```tsx
import { THEME_CONFIG } from "@/constants";

THEME_CONFIG.DEFAULT          // light, dark, or auto
THEME_CONFIG.PERSISTENCE_KEY  // Storage key for theme
THEME_CONFIG.ENABLE_PERSISTENCE // true/false
```

### Component Defaults

```tsx
import { COMPONENT_DEFAULTS } from "@/constants";

COMPONENT_DEFAULTS.TOAST_DURATION           // 3000ms
COMPONENT_DEFAULTS.MODAL_OVERLAY_OPACITY    // 0.5
COMPONENT_DEFAULTS.DRAWER_ANIMATION_DURATION // 400ms
```

### Validation Rules

```tsx
import { VALIDATION_RULES } from "@/constants";

VALIDATION_RULES.EMAIL              // Email regex
VALIDATION_RULES.PASSWORD_MIN_LENGTH // 8 characters
VALIDATION_RULES.PASSWORD_REGEX      // Strength requirements
VALIDATION_RULES.PHONE_PATTERN       // Phone format
```

### Customizing Constants

Edit `/constants/index.ts` to change default values:

```tsx
// Change default animation duration
export const COMPONENT_DEFAULTS = {
  TOAST_DURATION: 5000, // Changed from 3000
  MODAL_OVERLAY_OPACITY: 0.7, // Changed from 0.5
  // ... rest of constants
};
```

---

## Type Checking

### Run TypeScript Validation

```bash
# Check for type errors
npm run type-check

# Watch mode (recheck on changes)
npm run type-check --watch
```

All type definitions are centralized in `/src/types/`:
- `/src/types/common.ts` - Shared types
- `/src/types/api.ts` - API request/response types
- `/src/types/user.ts` - User domain types
- `/src/types/theme.ts` - Theme types
- `/src/types/component.ts` - Component prop types

---

## Building

### Web

```bash
# Development build
npm run build:web

# Production build
npm run build:web -- --production
```

### iOS

```bash
# Create EAS build
eas build --platform ios

# Development build
eas build --platform ios --profile preview

# Production build
eas build --platform ios --profile production
```

### Android

```bash
# Create EAS build
eas build --platform android

# Development build
eas build --platform android --profile preview

# Production build
eas build --platform android --profile production
```

---

## API Server Setup

### Local Development

```bash
# Start a local API server (if available)
cd api-server
npm install
npm run dev

# Runs on http://localhost:3000/api
```

Update `.env.development`:
```bash
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### Production API

Update `.env.production`:
```bash
EXPO_PUBLIC_API_BASE_URL=https://api.production.com
```

---

## Authentication Setup

### Setting Up JWT Authentication

```tsx
import { apiService } from "@/services";

// After login
const response = await apiService.post("/auth/login", {
  email: user.email,
  password: user.password,
});

if (response.success) {
  // Store tokens
  apiService.setTokens(
    response.data.token,
    response.data.refreshToken
  );

  // Tokens are now sent with every request via Authorization header
}
```

### Clearing Authentication

```tsx
// On logout
apiService.clearTokens();
navigation.navigate("Login");
```

### Token Refresh

Tokens automatically refresh when they expire:

```tsx
// Manual refresh if needed
const response = await apiService.post("/auth/refresh", {
  refreshToken: currentRefreshToken,
});

apiService.setTokens(response.data.token, response.data.refreshToken);
```

---

## Theme Setup

### Switch Between Light/Dark Mode

```tsx
import { useTheme } from "@/lib/theme-context";

export function ThemeToggle() {
  const { scheme, toggleTheme } = useTheme();

  return (
    <Button
      label={`Current: ${scheme}`}
      onPress={toggleTheme}
    />
  );
}
```

### Programmatically Set Theme

```tsx
import { useTheme } from "@/lib/theme-context";

export function SettingsScreen() {
  const { setTheme } = useTheme();

  return (
    <View>
      <Button label="Light" onPress={() => setTheme("light")} />
      <Button label="Dark" onPress={() => setTheme("dark")} />
      <Button label="Auto" onPress={() => setTheme("auto")} />
    </View>
  );
}
```

### Customize Colors

Edit `/src/lib/theme.ts` to change colors:

```tsx
export const COLORS = {
  light: {
    primary: "#007AFF",      // Change primary color
    secondary: "#5AC8FA",
    error: "#FF3B30",
    // ... modify as needed
  },
  dark: {
    primary: "#0A84FF",
    secondary: "#64B5F6",
    // ... modify as needed
  },
};
```

Also update CSS variables in `/src/styles/globals.css`:

```css
:root {
  --color-primary: #007AFF;
  --color-secondary: #5AC8FA;
  /* ... update variables */
}

.dark {
  --color-primary: #0A84FF;
  --color-secondary: #64B5F6;
  /* ... update variables */
}
```

---

## Debugging

### Enable Debug Logging

```bash
# Set in .env
EXPO_PUBLIC_ENABLE_LOGGING=true
```

Then in code:

```tsx
import { env } from "@/config";

if (env.ENABLE_LOGGING) {
  console.log("Debug info:", data);
}
```

### Network Request Debugging

```tsx
// Intercept all API calls
import { apiService } from "@/services";

// Monitor requests (implement custom logging)
const originalGet = apiService.get.bind(apiService);
apiService.get = async (...args) => {
  console.log("GET request:", args);
  return originalGet(...args);
};
```

### TypeScript Errors

```bash
# Check for type errors
npm run type-check

# Find specific error location
npm run type-check -- --pretty false | grep "error"
```

---

## Performance Optimization

### API Response Caching

```tsx
import { createApiCache } from "@/utils";

// Create cache with 5-minute TTL
const userCache = createApiCache(5 * 60 * 1000);

// Cache a response
userCache.set("user-123", userData);

// Retrieve from cache
const cached = userCache.get("user-123");

// Clear cache
userCache.clear();
```

### Debounced API Calls

```tsx
import { debounceApiCall } from "@/utils";

const debouncedSearch = debounceApiCall(
  (query) => apiService.get("/users/search", { search: query }),
  500 // Delay in ms
);

// Use in search input
onSearch={(query) => debouncedSearch(query)}
```

### Component Optimization

```tsx
import { useMemo, useCallback } from "react";

export function UserList({ users }) {
  // Memoize expensive computations
  const sortedUsers = useMemo(() => {
    return users.sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);

  // Memoize callbacks
  const handleUserPress = useCallback((userId) => {
    navigation.navigate("UserDetail", { userId });
  }, []);

  return <FlatList data={sortedUsers} onPress={handleUserPress} />;
}
```

---

## Troubleshooting

### API Requests Fail with "Cannot find module"

Make sure path aliases are configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### TypeScript Errors When Importing Types

Always import types with the `type` keyword:

```tsx
// ✅ Correct
import type { User, ApiResponse } from "@/types";

// ❌ Avoid
import { User, ApiResponse } from "@/types";
```

### Environment Variables Not Loading

Ensure variables are prefixed with `EXPO_PUBLIC_` for client-side access:

```bash
# ✅ Correct
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api

# ❌ Won't work
API_BASE_URL=http://localhost:3000/api
```

### Theme Not Persisting

Make sure theme persistence is enabled in `.env`:

```bash
EXPO_PUBLIC_THEME_PERSISTENCE=true
```

And in `/src/lib/theme-context.tsx`, verify storage implementation.

### API Requests Timeout

Increase timeout in `.env`:

```bash
# Default is 30000ms (30 seconds)
EXPO_PUBLIC_API_TIMEOUT=60000
```

---

## Security Best Practices

1. **Never commit .env files** - Add to `.gitignore`
2. **Use environment-specific configs** - Different URLs per environment
3. **Store secrets safely** - Use `EXPO_SECRET_*` prefix for sensitive data
4. **Validate input** - Use validation hooks before sending to API
5. **Handle auth errors** - Redirect to login on 401 status
6. **Use HTTPS only** - In production, always use HTTPS
7. **Sanitize user input** - Prevent XSS and injection attacks
8. **Log errors securely** - Don't log sensitive data
9. **Rotate secrets regularly** - Change API keys periodically
10. **Monitor API usage** - Track rate limits and errors

---

## See Also

- [Project Structure Guide](./STRUCTURE.md) - Folder organization
- [API Reference](./API.md) - All endpoints and examples
- [Component Library](./COMPONENTS.md) - All 33 components
- [Contributing Guide](./CONTRIBUTING.md) - Development workflow
