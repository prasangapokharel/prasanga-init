# Prasanga UI Starter Kit

A modern, clean, and scalable React Native UI component library built with **Expo**, **TypeScript**, and **NativeWind** (Tailwind CSS for React Native). Perfect for developers who want a shadcn-style design system ready to use out of the box.

## Features

✨ **Modern Design**: Shadcn-inspired clean and minimal UI components  
🎨 **Fully Typed**: Complete TypeScript support with proper type definitions  
🎯 **Production Ready**: Scalable folder structure and best practices  
🚀 **Easy to Use**: Single-command installation and setup  
♿ **Accessible**: Built with accessibility in mind  
🎭 **Multiple Variants**: Buttons, inputs, cards, modals, and more  
📦 **Zero Config**: Works out of the box with Expo  

## Components Included

- **Button**: Multiple variants (primary, secondary, outline, ghost, destructive, default)
- **Input**: Full-featured text inputs with labels, errors, and helpers
- **Card**: Flexible container component with optional shadows
- **Badge**: Labeled tags with multiple style variants
- **Modal**: Reusable modal dialogs with customization
- **Toast**: Toast notifications with auto-dismiss functionality

## Installation

### Option 1: Clone with degit

```bash
npx degit prasanga-ui/starter-kit MyApp
cd MyApp
npm install
npm start
```

### Option 2: Direct from GitHub

```bash
git clone https://github.com/prasanga-ui/starter-kit.git MyApp
cd MyApp
npm install
npm start
```

### Option 3: Manual Setup

```bash
# Prerequisites: Node.js 16+ and npm/yarn

# Create a new Expo project
npx create-expo-app MyApp
cd MyApp

# Install dependencies
npm install @expo/vector-icons @nativewind/core nativewind tailwindcss clsx tailwind-merge react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens

# Copy components and configuration files
# See Configuration section below
```

## Quick Start

### 1. Basic Usage

```tsx
import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button, Input, Card, Badge } from 'prasanga-ui';

export default function App() {
  const [text, setText] = useState('');

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <Card>
          <Badge variant="primary">New</Badge>
          
          <Input
            placeholder="Enter text"
            value={text}
            onChangeText={setText}
            label="Example Input"
          />

          <Button
            variant="primary"
            onPress={() => console.log('Pressed!')}
          >
            Click Me
          </Button>
        </Card>
      </View>
    </SafeAreaView>
  );
}
```

### 2. Button Variants

```tsx
import { Button } from 'prasanga-ui';

<View>
  <Button variant="default">Default</Button>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Delete</Button>
</View>
```

### 3. Input with Validation

```tsx
import { Input } from 'prasanga-ui';
import { useState } from 'react';

export function MyForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!value.includes('@')) {
      setError('Invalid email');
    } else {
      setError('');
    }
  };

  return (
    <Input
      placeholder="your@email.com"
      value={email}
      onChangeText={handleEmailChange}
      label="Email Address"
      error={error}
      helperText="We'll never share your email"
    />
  );
}
```

### 4. Card Component

```tsx
import { Card } from 'prasanga-ui';
import { Text, View } from 'react-native';

<Card shadow={true} padding={20}>
  <Text style={{ fontSize: 18, fontWeight: '600' }}>
    Card Title
  </Text>
  <Text>Card content goes here</Text>
</Card>
```

### 5. Badge Variants

```tsx
import { Badge } from 'prasanga-ui';

<View style={{ flexDirection: 'row', gap: 8 }}>
  <Badge variant="default">Draft</Badge>
  <Badge variant="primary">New</Badge>
  <Badge variant="secondary">Hot</Badge>
  <Badge variant="destructive">Error</Badge>
  <Badge variant="success">Verified</Badge>
  <Badge variant="warning">Pending</Badge>
</View>
```

### 6. Modal Dialog

```tsx
import { Modal, Button } from 'prasanga-ui';
import { useState } from 'react';
import { Text } from 'react-native';

export function ModalExample() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>
        Open Modal
      </Button>

      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        title="Confirm Action"
        closeButtonText="Got it"
      >
        <Text>Are you sure you want to proceed?</Text>
      </Modal>
    </>
  );
}
```

### 7. Toast Notifications

```tsx
import { Toast } from 'prasanga-ui';
import { useState } from 'react';

export function ToastExample() {
  const [toastVisible, setToastVisible] = useState(false);

  return (
    <>
      {toastVisible && (
        <Toast
          message="Success! Operation completed."
          type="success"
          duration={3000}
          onDismiss={() => setToastVisible(false)}
        />
      )}
    </>
  );
}
```

## Project Structure

```
prasanga-ui-starter/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx          # Button component with variants
│   │       ├── input.tsx           # Input component with validation
│   │       ├── card.tsx            # Card container component
│   │       ├── badge.tsx           # Badge/label component
│   │       ├── modal.tsx           # Modal dialog component
│   │       └── toast.tsx           # Toast notification component
│   ├── lib/
│   │   └── utils.ts                # Utility functions
│   ├── screens/
│   │   └── Home.tsx                # Example home screen
│   ├── types/
│   │   └── index.ts                # Shared type definitions
│   ├── globals.css                 # Global Tailwind styles
│   └── index.ts                    # Main export file
├── App.tsx                          # Demo app showcasing components
├── app.json                         # Expo configuration
├── babel.config.js                 # Babel configuration for NativeWind
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies and scripts
└── README.md                        # This file
```

## Configuration

### Tailwind Configuration

The `tailwind.config.js` includes:

- **Extended Colors**: Primary, secondary, destructive, muted, accent
- **Custom Spacing**: Tailwind default spacing scale
- **Border Radius**: Modern rounded corner options
- **Shadow Presets**: Elevation shadows for depth

### Babel Configuration

```javascript
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

### TypeScript Configuration

Already configured with:
- Strict type checking
- Path aliases for imports
- ES2020 target
- Proper JSX support

## Component API Reference

### Button

```tsx
<Button
  variant="primary" | "secondary" | "default" | "outline" | "ghost" | "destructive"
  size="sm" | "md" | "lg"
  disabled={boolean}
  isLoading={boolean}
  fullWidth={boolean}
  leftIcon={ReactNode}
  rightIcon={ReactNode}
  onPress={() => {}}
  containerStyle={{}}
  textStyle={{}}
>
  Button Text
</Button>
```

### Input

```tsx
<Input
  placeholder="Enter text"
  label="Label Text"
  error="Error message"
  helperText="Helper text"
  size="sm" | "md" | "lg"
  leftElement={ReactNode}
  rightElement={ReactNode}
  hasError={boolean}
  containerStyle={{}}
  value=""
  onChangeText={(text) => {}}
/>
```

### Card

```tsx
<Card
  shadow={boolean}
  padding={number}
  rounded={number}
  style={{}}
>
  {children}
</Card>
```

### Badge

```tsx
<Badge
  variant="default" | "primary" | "secondary" | "destructive" | "success" | "warning"
  rounded={boolean}
  containerStyle={{}}
  textStyle={{}}
>
  Badge Text
</Badge>
```

### Modal

```tsx
<Modal
  visible={boolean}
  onClose={() => {}}
  title="Modal Title"
  closeButtonText="Close"
  showCloseButton={boolean}
  closeOnOverlayTap={boolean}
  overlayOpacity={number}
  containerStyle={{}}
>
  {children}
</Modal>
```

### Toast

```tsx
<Toast
  message="Notification message"
  type="success" | "error" | "info" | "warning"
  duration={3000}
  position="top" | "bottom"
  onDismiss={() => {}}
  containerStyle={{}}
/>
```

## Styling & Customization

### Using Tailwind Classes

While components use React Native styles, you can extend them:

```tsx
import { Button } from 'prasanga-ui';

<Button
  containerStyle={{
    marginBottom: 20,
    opacity: 0.8,
  }}
>
  Custom Button
</Button>
```

### Theme Colors

Available in `tailwind.config.js`:

- `primary`: Sky blue - `#0ea5e9`
- `secondary`: Orange - `#f97316`
- `destructive`: Red - `#ef4444`
- `success`: Green - `#22c55e`
- `warning`: Amber - `#eab308`
- `muted`: Gray - `#6b7280`
- `accent`: Purple - `#a855f7`

### Custom Theme

Modify `tailwind.config.js` to customize colors, spacing, and more:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color',
        // ...
      },
    },
  },
}
```

## Publishing to npm

To publish this as a public npm package:

### 1. Update package.json

```json
{
  "name": "prasanga-ui",
  "version": "1.0.0",
  "description": "Modern React Native UI component library",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "files": ["src/"],
  "exports": {
    ".": "./src/index.ts",
    "./button": "./src/components/ui/button.tsx",
    "./input": "./src/components/ui/input.tsx",
    "./card": "./src/components/ui/card.tsx",
    "./badge": "./src/components/ui/badge.tsx",
    "./modal": "./src/components/ui/modal.tsx",
    "./toast": "./src/components/ui/toast.tsx"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/prasanga-ui.git"
  },
  "license": "MIT"
}
```

### 2. Create npm account

```bash
npm adduser
# or
npm login
```

### 3. Publish

```bash
npm publish
```

### 4. Usage after publishing

```bash
npm install prasanga-ui
```

```tsx
import { Button, Input, Card, Badge, Modal, Toast } from 'prasanga-ui';
```

## Development

### Running the Demo

```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

### Building for Production

```bash
# Type check
npm run type-check

# Lint code
npm run lint
```

## Accessibility

All components are built with accessibility in mind:

- ✅ Proper semantic structure
- ✅ Keyboard navigation support
- ✅ Screen reader support
- ✅ High contrast colors
- ✅ Touch-friendly sizes (minimum 44x44 points)

## Browser & Platform Support

- ✅ iOS 13+
- ✅ Android 5.0+
- ✅ Web (React Native Web)
- ✅ Expo Go app

## Troubleshooting

### Issue: NativeWind not working

**Solution**: Ensure `babel.config.js` has:
```javascript
presets: [
  ["babel-preset-expo", { jsxImportSource: "nativewind" }],
  "nativewind/babel",
]
```

### Issue: TypeScript errors

**Solution**: Run `npm run type-check` and ensure all types are properly imported.

### Issue: Styles not applying

**Solution**: Verify `tailwind.config.js` content paths include your component files:
```javascript
content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"]
```

## Performance

- 📦 Minimal dependencies
- ⚡ Tree-shakeable exports
- 🎯 Optimized for bundle size
- 🚀 Native performance with React Native

## Best Practices

1. **Use TypeScript**: Take advantage of full type support
2. **Compose Components**: Build complex UIs from simple components
3. **Style Consistently**: Use theme colors from Tailwind config
4. **Handle Errors**: Always show error states in forms
5. **Accessibility First**: Use semantic components and proper labels

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

Need help? Check out:

- 📚 [Documentation](https://prasanga-ui.dev)
- 🐛 [Issue Tracker](https://github.com/prasanga-ui/starter-kit/issues)
- 💬 [Discussions](https://github.com/prasanga-ui/starter-kit/discussions)
- 📧 Email: support@prasanga-ui.dev

## Credits

Built with:

- [Expo](https://expo.dev) - React Native framework
- [NativeWind](https://www.nativewind.dev) - Tailwind CSS for React Native
- [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript
- [shadcn/ui](https://ui.shadcn.com) - Design inspiration

## Changelog

### v1.0.0 (Initial Release)

- ✨ Added Button component with 6 variants
- ✨ Added Input component with validation
- ✨ Added Card component
- ✨ Added Badge component with 6 variants
- ✨ Added Modal component
- ✨ Added Toast component
- 🎨 Shadcn-inspired design system
- 📦 Complete TypeScript support
- 🎯 Production-ready folder structure

---

**Made with ❤️ by the Prasanga team**
