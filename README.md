# Prasanga UI Starter Kit

A modern, clean, and scalable React Native UI component library built with **Expo**, **TypeScript**, and **NativeWind** (Tailwind CSS for React Native). Perfect for developers who want a shadcn-style design system ready to use out of the box.

## 🚀 Quick Start

**One command to create a new Prasanga app:**

```bash
npx prasanga-init MyNewApp
cd MyNewApp
npm install
npx expo start
```

That's it! You're ready to build. ✨

---

## ✨ Features

- **Modern Design**: Shadcn-inspired clean and minimal UI components
- **Fully Typed**: Complete TypeScript support with proper type definitions
- **Production Ready**: 30+ components with scalable folder structure and best practices
- **Zero Config**: Works out of the box with Expo, TypeScript, and Tailwind
- **Accessible**: Built with accessibility in mind
- **Multiple Variants**: Buttons, inputs, cards, modals, and more
- **NativeWind**: Tailwind CSS support for React Native
- **One-Command Install**: `npx prasanga-init` setup

---

## 📦 30+ Components Included

### Form Components
- **Button** - 6 variants (primary, secondary, outline, ghost, destructive, default) + 3 sizes
- **Input** - Text input with labels, errors, and helpers
- **Textarea** - Multi-line text input
- **Checkbox** - Custom styled checkboxes
- **Radio** - Radio button groups with horizontal/vertical layout
- **Switch** - Animated toggle switches
- **Select** - Modal dropdown with single/multi-select
- **Slider** - Range input with value display
- **Stepper** - Increment/decrement control

### Progress Components
- **ProgressBar** - Linear progress indicator with labels
- **CircularProgress** - Circular progress indicator

### Feedback & Overlay
- **Alert** - 4 types (success, warning, error, info)
- **Toast** - Notifications with auto-dismiss
- **Modal** - Customizable dialogs
- **Spinner** - Loading indicator
- **Tooltip** - Contextual help text

### Layout Components
- **Container** - Flexible spacing and alignment wrapper
- **Stack** - Row/column layout with gap support
- **Grid** - Multi-column responsive layout
- **Divider** - Horizontal/vertical separator

### Display Components
- **Card** - Flexible container with shadow options
- **Badge** - 6 variants (default, primary, secondary, destructive, success, warning)
- **Avatar** - Profile images with initials fallback
- **Text** - Typography component (h1-h4, body, small, caption)
- **Image** - Responsive image component
- **List** - List items with separators and icons

### Navigation Components
- **Tabs** - Tab navigation with smooth transitions
- **Accordion** - Expandable sections

---

## 💻 Installation

### Method 1: One-Command Setup (Recommended)

```bash
npx prasanga-init MyNewApp
cd MyNewApp
npm install
npx expo start
```

### Method 2: Manual Setup

Clone or download from GitHub:

```bash
git clone https://github.com/prasangapokharel/PrasangaKit.git MyApp
cd MyApp
npm install
npm start
```

---

## 🎯 Usage Examples

### Basic Button

```tsx
import { Button } from 'prasanga-ui';

export default function App() {
  return (
    <Button variant="primary" onPress={() => console.log('Pressed!')}>
      Click Me
    </Button>
  );
}
```

### Form Inputs

```tsx
import { Input, Textarea, Select } from 'prasanga-ui';
import { useState } from 'react';

export default function FormExample() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [option, setOption] = useState('opt1');

  return (
    <>
      <Input
        label="Full Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Textarea
        label="Message"
        placeholder="Type your message"
        value={message}
        onChangeText={setMessage}
        rows={4}
      />
      <Select
        label="Choose Option"
        value={option}
        onValueChange={setOption}
        options={[
          { label: 'Option 1', value: 'opt1' },
          { label: 'Option 2', value: 'opt2' },
        ]}
      />
    </>
  );
}
```

### Modal Dialog

```tsx
import { Modal, Button } from 'prasanga-ui';
import { useState } from 'react';

export default function ModalExample() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>Open Modal</Button>
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        title="Welcome!"
      >
        <Text>This is a modal dialog content.</Text>
      </Modal>
    </>
  );
}
```

### Toast Notifications

```tsx
import { Toast, Button } from 'prasanga-ui';
import { useState } from 'react';

export default function ToastExample() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>Show Toast</Button>
      {visible && (
        <Toast
          message="Success! Action completed."
          type="success"
          duration={3000}
          onDismiss={() => setVisible(false)}
        />
      )}
    </>
  );
}
```

---

## 🛠️ Component Variants

### Button Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="default">Default</Button>

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Badge Variants

```tsx
<Badge variant="default">Draft</Badge>
<Badge variant="primary">New</Badge>
<Badge variant="secondary">Hot</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="success">Verified</Badge>
<Badge variant="warning">Pending</Badge>
```

### Alert Types

```tsx
<Alert type="success" title="Success!" message="Operation completed" />
<Alert type="error" title="Error!" message="Something went wrong" />
<Alert type="warning" title="Warning!" message="Please review" />
<Alert type="info" title="Info!" message="Here's some info" />
```

---

## 📁 Project Structure

```
src/
├── components/ui/           # All UI components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   ├── modal.tsx
│   ├── toast.tsx
│   ├── ... (30+ more)
├── lib/
│   └── utils.ts             # Utility functions
├── index.ts                 # Main exports
└── globals.css              # Global styles

App.tsx                       # Demo application
tailwind.config.js            # Tailwind configuration
babel.config.js               # Babel configuration with NativeWind
tsconfig.json                 # TypeScript configuration
package.json                  # Dependencies
```

---

## 🔧 Configuration

### Tailwind CSS

The project includes a pre-configured `tailwind.config.js` with a shadcn-inspired color scheme:

```js
export default {
  content: ['./App.tsx', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#f97316',
        success: '#22c55e',
        // ... more colors
      },
    },
  },
};
```

### NativeWind

NativeWind is pre-configured in `babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo'], ['nativewind/babel']],
  };
};
```

---

## 📝 TypeScript Support

All components are fully typed with TypeScript:

```tsx
import { Button, type ButtonVariant } from 'prasanga-ui';

const variants: ButtonVariant[] = ['primary', 'secondary', 'outline'];

// Full type safety and autocomplete
<Button variant="primary" onPress={() => {}}>
  Click
</Button>
```

---

## 🎨 Customization

### Custom Styling

All components accept style props for customization:

```tsx
<Card style={{ backgroundColor: '#f5f5f5', paddingHorizontal: 20 }}>
  <Text>Custom Card</Text>
</Card>

<Button
  variant="primary"
  style={{ borderRadius: 12 }}
>
  Custom Button
</Button>
```

### Theme Colors

Edit `tailwind.config.js` to customize colors:

```js
colors: {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
  success: '#YOUR_COLOR',
  // ... etc
}
```

---

## 📚 API Reference

### Button

```tsx
<Button
  variant="primary"      // 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'default'
  size="md"              // 'sm' | 'md' | 'lg'
  disabled={false}
  onPress={() => {}}
>
  Label
</Button>
```

### Input

```tsx
<Input
  label="Name"
  placeholder="Enter name"
  value={text}
  onChangeText={setText}
  error="Error message"
  hasError={false}
  disabled={false}
/>
```

### Card

```tsx
<Card style={{ shadow: 'large' }}>
  <Text>Content</Text>
</Card>
```

### Modal

```tsx
<Modal
  visible={true}
  onClose={() => {}}
  title="Title"
  closeButtonText="Close"
>
  <Text>Modal content</Text>
</Modal>
```

### Toast

```tsx
<Toast
  message="Success!"
  type="success"         // 'success' | 'error' | 'info' | 'warning'
  duration={3000}
  onDismiss={() => {}}
/>
```

---

## 🌐 API Endpoint

Access the Prasanga UI documentation and API at:

- **Website**: https://prasangakit.smmv.shop
- **API Endpoint**: https://prasangakit.smmv.shop
- **Documentation**: https://prasangakit.smmv.shop/docs

The API endpoint is configured in your `package.json`:

```json
{
  "api": {
    "endpoint": "https://prasangakit.smmv.shop",
    "docs": "https://prasangakit.smmv.shop/docs"
  }
}
```

You can access it programmatically:

```tsx
import { readFileSync } from 'fs';
import { resolve } from 'path';

const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, 'package.json'), 'utf8')
);

const apiEndpoint = packageJson.api.endpoint;
// https://prasangakit.smmv.shop
```

---

## 🚀 Publishing Updates

To publish new versions:

1. Make changes and test locally
2. Update version in `package.json`
3. Run: `npm publish --access public`
4. Push to GitHub: `git push origin master`

---

## 📦 Dependencies

- **Expo** ~54.0.33 - React Native framework
- **React** 19.1.0 - UI library
- **React Native** 0.81.5 - Mobile framework
- **NativeWind** ^2.0.11 - Tailwind for React Native
- **Tailwind CSS** ^3.4.1 - Utility CSS framework
- **TypeScript** ~5.9.2 - Type safety

---

## 🎓 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [NativeWind Guide](https://www.nativewind.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📄 License

MIT - Feel free to use in personal and commercial projects.

---

## 👤 Author

**Prasanga Pokharel**

- GitHub: [@prasangapokharel](https://github.com/prasangapokharel)
- npm: [@prasanga741](https://www.npmjs.com/~prasanga741)

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

## 🎉 Get Started

**Create your first Prasanga app now:**

```bash
npx prasanga-init MyApp
cd MyApp
npm install
npx expo start
```

Scan the QR code with Expo Go app to see it running! 📱✨

---

**Made with ❤️ for React Native developers**
