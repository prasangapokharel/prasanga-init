# Prasanga UI - Complete Framework Guide

## 📚 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Environment Configuration](#environment-configuration)
4. [API Schema & Endpoints](#api-schema--endpoints)
5. [Component Library](#component-library)
6. [Theme System](#theme-system)
7. [Typography System](#typography-system)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Installation

```bash
# Clone the template
git clone https://github.com/yourusername/prasanga-init.git
cd prasanga-init

# Install dependencies
npm install

# Start development server
npx expo start
```

### Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# See Environment Configuration section below
```

### First Component

```tsx
import { Button } from '@/src/components/ui/button';
import { useTheme } from '@/src/lib/theme-context';

export default function MyComponent() {
  const { colors } = useTheme();

  return (
    <Button variant="primary" onPress={() => console.log('Pressed')}>
      Click Me
    </Button>
  );
}
```

---

## 📁 Project Structure

```
prasanga-init/
├── App.tsx                          # Main app entry point
├── .env.example                     # Environment variables template
├── package.json
├── tsconfig.json
│
├── src/
│   ├── lib/
│   │   ├── theme.ts                 # Theme color definitions
│   │   ├── theme-context.tsx        # Theme provider & hook
│   │   ├── typography.ts            # Typography system config
│   │   ├── api-schema.ts            # API endpoints & schemas (NEW)
│   │   ├── utils.ts                 # Helper utilities
│   │   └── index.ts                 # Exports
│   │
│   ├── styles/
│   │   └── globals.css              # CSS variables for theming
│   │
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx           # 33+ premium components
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       ├── modal.tsx
│   │       ├── drawer.tsx
│   │       ├── table.tsx
│   │       └── ... (30+ more)
│   │
│   └── hooks/
│       ├── useTheme.ts              # Theme management (alias)
│       ├── useApi.ts                # API call wrapper
│       └── ... (custom hooks)
│
├── docs/
│   ├── README.md                    # This file
│   ├── API.md                       # Detailed API documentation
│   ├── COMPONENTS.md                # Component showcase
│   └── CONTRIBUTING.md              # Contribution guidelines
│
└── node_modules/
```

---

## ⚙️ Environment Configuration

### What is `.env.example`?

A template showing all available configuration options. **NEVER commit sensitive `.env` files to git**.

### Usage

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update values for your environment:
   ```env
   EXPO_PUBLIC_API_BASE_URL=https://api.myapp.com
   EXPO_PUBLIC_THEME_DEFAULT=dark
   ```

3. Access in code:
   ```tsx
   const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
   ```

### Available Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `EXPO_PUBLIC_API_BASE_URL` | string | `http://localhost:3000/api` | API server base URL |
| `EXPO_PUBLIC_API_TIMEOUT` | number | `30000` | Request timeout (ms) |
| `EXPO_PUBLIC_API_RETRY_ATTEMPTS` | number | `3` | Failed request retries |
| `EXPO_PUBLIC_THEME_DEFAULT` | string | `light` | Default theme (`light` \| `dark`) |
| `EXPO_PUBLIC_THEME_PERSISTENCE` | boolean | `true` | Save theme preference |
| `EXPO_PUBLIC_TOAST_DURATION` | number | `3000` | Toast visibility (ms) |
| `EXPO_PUBLIC_MODAL_OVERLAY_OPACITY` | number | `0.5` | Modal overlay opacity |
| `EXPO_PUBLIC_LOG_LEVEL` | string | `info` | Log level (`info` \| `warn` \| `error`) |

---

## 🔌 API Schema & Endpoints

### Overview

All API endpoints, request/response schemas, and types are centralized in `src/lib/api-schema.ts`.

### Quick Reference

**File**: `src/lib/api-schema.ts`

```tsx
import { 
  API_ENDPOINTS, 
  REQUEST_SCHEMAS, 
  RESPONSE_SCHEMAS,
  API_CONFIG 
} from '@/src/lib/api-schema';

// Access endpoints
const loginUrl = API_ENDPOINTS.AUTH.LOGIN;  // "/auth/login"
const userId = API_ENDPOINTS.USERS.GET_BY_ID("123");  // "/users/123"

// Access schemas
const loginSchema = REQUEST_SCHEMAS.LOGIN;
const userListSchema = RESPONSE_SCHEMAS.USER_LIST;

// Access config
const timeout = API_CONFIG.REQUEST_TIMEOUT;  // 30000ms
```

### Available Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/register` - New user registration
- `POST /auth/refresh` - Refresh access token
- `POST /auth/verify` - Verify token

#### Users
- `GET /users` - List all users (paginated)
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /users/profile` - Get current user profile

#### Health
- `GET /health` - Server health check

### Request/Response Examples

#### Login
```tsx
// Request
const loginRequest = {
  email: "user@example.com",
  password: "SecurePassword123!"
};

// Response
{
  success: true,
  message: "Login successful",
  data: {
    user: {
      id: "550e8400-e29b-41d4-a716-446655440000",
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "user",
      status: "active",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-03-19T14:45:00Z"
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    expiresIn: 3600
  }
}
```

#### List Users
```tsx
// Query
GET /users?page=1&limit=20&sort=-createdAt&search=john

// Response
{
  success: true,
  data: {
    users: [...],
    pagination: {
      page: 1,
      limit: 20,
      total: 100,
      totalPages: 5,
      hasNextPage: true,
      hasPrevPage: false
    }
  }
}
```

#### Error Response
```tsx
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Validation failed",
    details: {
      email: ["Invalid email format"],
      password: ["Password must be at least 8 characters"]
    }
  }
}
```

---

## 🎨 Component Library

### 33+ Premium Components

All components are:
- ✅ Fully typed with TypeScript
- ✅ Theme-aware (light/dark mode)
- ✅ Production-ready
- ✅ Zero external dependencies (except React Native)

### Categories

#### Form Components
- `Button` - Multiple variants (primary, secondary, outline, ghost, destructive)
- `Input` - Text input with validation
- `Textarea` - Multi-line text input
- `Checkbox` - Checkbox with label
- `Radio` - Radio button group
- `Select` - Dropdown selection
- `Slider` - Value slider
- `Stepper` - Number increment/decrement
- `DatePicker` - Calendar date selection
- `Switch` - Toggle switch

#### Display Components
- `Card` - Content container
- `Badge` - Status indicator
- `Alert` - Contextual feedback
- `Toast` - Temporary notification
- `Table` - Data table with sorting
- `List` - Ordered/unordered lists
- `Divider` - Visual separator
- `Text` - Typography component
- `Image` - Image display

#### Layout Components
- `Container` - Max-width wrapper
- `Stack` - Flexbox column layout
- `Grid` - Grid layout
- `SafeAreaView` - Safe area wrapper

#### Overlay Components
- `Modal` - Dialog modal
- `Sheet` - Bottom sheet modal
- `Drawer` - Side drawer
- `Popover` - Positioned popup
- `Tooltip` - Hover tooltip

#### Feedback Components
- `Spinner` - Loading indicator
- `Progress` - Progress bar
- `CircularProgress` - Circular progress

#### Advanced Components
- `Accordion` - Expandable sections
- `Tabs` - Tab navigation
- `And 10+ more...

### Usage Example

```tsx
import { Button, Card, Badge, Input } from '@/src/components/ui';
import { useTheme } from '@/src/lib/theme-context';
import { typography } from '@/src/lib/typography';

export default function Dashboard() {
  const { colors } = useTheme();
  const [inputValue, setInputValue] = useState('');

  return (
    <Card shadow shadowIntensity="medium">
      <Badge variant="primary">New</Badge>
      <Text style={typography.heading.md}>Welcome</Text>
      
      <Input
        placeholder="Enter name"
        value={inputValue}
        onChangeText={setInputValue}
      />
      
      <Button
        variant="primary"
        size="md"
        onPress={() => console.log(inputValue)}
      >
        Submit
      </Button>
    </Card>
  );
}
```

---

## 🎭 Theme System

### Overview

The theme system uses **CSS variables** for easy customization without code changes.

### Theme Files

- **Definition**: `src/styles/globals.css` - CSS variables (`:root` for light, `.dark` for dark)
- **React Hook**: `src/lib/theme-context.tsx` - ThemeProvider & useTheme hook
- **Colors**: `src/lib/theme.ts` - Color values derived from CSS

### Using Themes

```tsx
import { ThemeProvider, useTheme } from '@/src/lib/theme-context';

function MyComponent() {
  const { colors, theme, toggleTheme } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.foreground }}>
        Current theme: {theme}
      </Text>
      <Button onPress={toggleTheme}>Toggle Theme</Button>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MyComponent />
    </ThemeProvider>
  );
}
```

### Available Colors

```tsx
const colors = {
  // Primary colors
  primary: '#3b82f6',
  primaryForeground: '#ffffff',
  primaryLight: '#dbeafe',

  // Secondary colors
  secondary: '#6b7280',
  secondaryForeground: '#ffffff',
  secondaryLight: '#f3f4f6',

  // Status colors
  success: '#22c55e',
  successLight: '#dcfce7',
  warning: '#f59e0b',
  warningLight: '#fef3c7',
  destructive: '#ef4444',
  destructiveLight: '#fee2e2',

  // Neutral colors
  background: '#ffffff',
  foreground: '#1f2937',
  card: '#ffffff',
  border: '#e5e7eb',
  muted: '#f3f4f6',
  mutedForeground: '#6b7280',

  // Input colors
  input: '#ffffff',
  inputBorder: '#d1d5db',
};
```

### Customizing Theme

Edit `src/styles/globals.css`:

```css
:root {
  /* Light mode */
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  /* ...more colors */
}

.dark {
  /* Dark mode */
  --primary: #60a5fa;
  --primary-foreground: #1f2937;
  /* ...more colors */
}
```

---

## 📝 Typography System

### Overview

Centralized typography configuration ensures consistent sizing and spacing.

### File

`src/lib/typography.ts`

### Usage

```tsx
import { typography } from '@/src/lib/typography';

const styles = StyleSheet.create({
  title: typography.display.lg,        // 32px, bold
  heading: typography.heading.md,      // 16px, semibold
  body: typography.body.md,            // 14px, regular
  button: typography.button.md,        // 13px, semibold
  caption: typography.caption.sm,      // 11px, regular
});
```

### Available Sizes

| Category | Sizes | Use Case |
|----------|-------|----------|
| `display` | lg, md, sm | Hero text, main titles |
| `heading` | xs, sm, md, lg | Section headings |
| `subheading` | sm, md, lg | Card titles, subsections |
| `body` | xs, sm, md, lg | Body text, paragraphs |
| `button` | sm, md, lg | Button text |
| `label` | sm, md | Form labels |
| `caption` | sm, md | Helper text, captions |
| `tiny` | sm, md | Badges, small indicators |
| `alert` | title, message, close | Alert text |
| `input` | sm, md, lg | Input text |

---

## ✅ Best Practices

### 1. Component Usage

```tsx
// ✅ DO: Use theme colors
const { colors } = useTheme();
<View style={{ backgroundColor: colors.background }} />

// ❌ DON'T: Hardcode colors
<View style={{ backgroundColor: '#ffffff' }} />
```

### 2. Typography

```tsx
// ✅ DO: Use typography system
import { typography } from '@/src/lib/typography';
<Text style={typography.body.md}>Content</Text>

// ❌ DON'T: Hardcode font sizes
<Text style={{ fontSize: 14, fontWeight: '400' }}>Content</Text>
```

### 3. API Calls

```tsx
// ✅ DO: Use centralized schema
import { API_ENDPOINTS } from '@/src/lib/api-schema';
fetch(API_ENDPOINTS.USERS.GET_ALL)

// ❌ DON'T: Hardcode endpoints
fetch('/api/users')
```

### 4. Component Composition

```tsx
// ✅ DO: Compose components
<Card shadow shadowIntensity="medium">
  <Badge variant="primary">Label</Badge>
  <Text style={typography.heading.md}>Title</Text>
  <Button variant="primary">Action</Button>
</Card>

// ❌ DON'T: Recreate styles inline
<View style={{ padding: 16, borderRadius: 8, ... }}>
  ...
</View>
```

### 5. Responsive Design

```tsx
// ✅ DO: Use dimension-aware styling
const screenWidth = Dimensions.get('window').width;
const isSmallDevice = screenWidth < 480;

// ❌ DON'T: Assume screen size
<View style={{ width: 400 }} />
```

---

## 🐛 Troubleshooting

### Theme Not Applying

**Problem**: Styles not using theme colors

**Solution**:
1. Ensure component is wrapped with `ThemeProvider`
2. Use `useTheme()` hook to get colors
3. Check that `src/styles/globals.css` is imported

```tsx
// In App.tsx
import './src/styles/globals.css';

export default function App() {
  return (
    <ThemeProvider>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Components Not Typed

**Problem**: TypeScript errors in component usage

**Solution**:
1. Check component is exported from `src/components/ui/index.ts`
2. Verify TypeScript is installed: `npm install --save-dev typescript`
3. Run type check: `npm run type-check`

### Dark Mode Not Working

**Problem**: Dark mode styles not applying

**Solution**:
1. Call `toggleTheme()` from `useTheme()` hook
2. Verify `.dark` class exists in `src/styles/globals.css`
3. Check theme persistence in `.env`

```tsx
const { toggleTheme } = useTheme();
onPress={toggleTheme}  // Will toggle dark/light
```

### API Calls Failing

**Problem**: API requests returning errors

**Solution**:
1. Verify `.env` has correct `EXPO_PUBLIC_API_BASE_URL`
2. Check server is running at that URL
3. Review API schema in `src/lib/api-schema.ts` for correct endpoint
4. Check request payload matches `REQUEST_SCHEMAS`

---

## 📚 Additional Resources

- [Component Library](./COMPONENTS.md) - Detailed component documentation
- [API Documentation](./API.md) - Complete API reference
- [TypeScript Types](../src/lib/api-schema.ts) - Type definitions
- [Theme Configuration](../src/styles/globals.css) - CSS variables

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License - See LICENSE file

---

**Made with ❤️ by Prasanga Team**

*Last Updated: March 19, 2024*
