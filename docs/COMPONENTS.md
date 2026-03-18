# Prasanga UI - Component Library

Complete reference for all 33 production-ready UI components. Each component is fully typed, accessible, and uses the centralized design system.

## Table of Contents

- [Form Components](#form-components)
- [Display Components](#display-components)
- [Container Components](#container-components)
- [Feedback Components](#feedback-components)
- [Data Components](#data-components)

---

## Form Components

### Input

Text input field with validation support.

```tsx
import { Input } from "@/components/ui";

<Input
  placeholder="Enter email"
  value={email}
  onChange={(value) => setEmail(value)}
  error={emailError}
  keyboardType="email-address"
  leftIcon={<MailIcon />}
/>
```

**Props**: `value`, `onChange`, `onBlur`, `onFocus`, `placeholder`, `disabled`, `error`, `keyboardType`, `secureTextEntry`, `multiline`, `maxLength`

---

### Textarea

Multi-line text input.

```tsx
import { Textarea } from "@/components/ui";

<Textarea
  placeholder="Enter message"
  value={message}
  onChange={(value) => setMessage(value)}
  numberOfLines={5}
  maxLength={500}
/>
```

**Props**: `value`, `onChange`, `placeholder`, `disabled`, `numberOfLines`, `maxLength`, `error`

---

### Button

Clickable action button with multiple variants.

```tsx
import { Button } from "@/components/ui";

// Primary button
<Button label="Submit" variant="primary" onPress={handleSubmit} />

// Secondary button
<Button label="Cancel" variant="secondary" onPress={handleCancel} />

// Large button
<Button label="Get Started" size="lg" fullWidth />

// With loading state
<Button label="Saving..." disabled={isLoading} />
```

**Props**: `label`, `variant` ("primary" | "secondary" | "tertiary" | "destructive"), `size` ("xs" | "sm" | "md" | "lg"), `onPress`, `disabled`, `loading`, `fullWidth`, `leftIcon`, `rightIcon`

---

### Checkbox

Boolean selection with checkmark.

```tsx
import { Checkbox } from "@/components/ui";

<Checkbox
  label="I agree to terms"
  value={agreed}
  onChange={(value) => setAgreed(value)}
  disabled={false}
/>

// Indeterminate state
<Checkbox
  label="Select all items"
  indeterminate={someSelected && !allSelected}
  value={allSelected}
  onChange={handleSelectAll}
/>
```

**Props**: `label`, `value`, `onChange`, `disabled`, `indeterminate`, `size` ("sm" | "md" | "lg")

---

### Radio

Single selection from group.

```tsx
import { Radio } from "@/components/ui";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

{options.map(option => (
  <Radio
    key={option.value}
    label={option.label}
    value={selected === option.value}
    onChange={() => setSelected(option.value)}
  />
))}
```

**Props**: `label`, `value`, `onChange`, `disabled`, `size` ("sm" | "md" | "lg")

---

### Select

Dropdown selection component.

```tsx
import { Select } from "@/components/ui";

<Select
  options={[
    { label: "New York", value: "ny" },
    { label: "Los Angeles", value: "la" },
    { label: "Chicago", value: "ch" },
  ]}
  value={city}
  onChange={(value) => setCity(value)}
  placeholder="Select city"
  searchable
/>
```

**Props**: `options`, `value`, `onChange`, `placeholder`, `disabled`, `multiple`, `searchable`, `clearable`, `error`

---

### Switch

Toggle on/off state.

```tsx
import { Switch } from "@/components/ui";

<Switch
  value={notificationsEnabled}
  onChange={(value) => setNotificationsEnabled(value)}
  disabled={false}
/>
```

**Props**: `value`, `onChange`, `disabled`, `size` ("sm" | "md" | "lg")

---

### DatePicker

Date selection component.

```tsx
import { DatePicker } from "@/components/ui";

<DatePicker
  value={birthDate}
  onChange={(date) => setBirthDate(date)}
  placeholder="Select date"
  minDate={new Date("1950-01-01")}
  maxDate={new Date()}
/>
```

**Props**: `value`, `onChange`, `placeholder`, `minDate`, `maxDate`, `disabled`, `error`

---

### Slider

Numeric range selection.

```tsx
import { Slider } from "@/components/ui";

<Slider
  value={volume}
  onValueChange={(value) => setVolume(value)}
  min={0}
  max={100}
  step={1}
/>
```

**Props**: `value`, `onValueChange`, `min`, `max`, `step`, `disabled`

---

## Display Components

### Text

Typography component using design system.

```tsx
import { Text } from "@/components/ui";

<Text variant="heading-lg">Main Title</Text>
<Text variant="body">Regular text content</Text>
<Text variant="caption" color="text-secondary">Small note</Text>
```

**Props**: `variant` (typography style), `color`, `weight`, `size`, `align`, `numberOfLines`

---

### Avatar

User profile image or initials.

```tsx
import { Avatar } from "@/components/ui";

// With image
<Avatar source={{ uri: "https://..." }} size="lg" />

// With initials fallback
<Avatar initials="JD" size="md" />

// Status indicator
<Avatar initials="JD" status="online" />
```

**Props**: `source`, `initials`, `size` ("xs" | "sm" | "md" | "lg"), `status`, `badge`

---

### Badge

Label or status indicator.

```tsx
import { Badge } from "@/components/ui";

<Badge label="New" variant="primary" />
<Badge label="5" variant="error" size="sm" />
<Badge label="Active" icon={<CheckIcon />} closeable onClose={handleClose} />
```

**Props**: `label`, `variant`, `size`, `icon`, `closeable`, `onClose`

---

### Image

Optimized image component.

```tsx
import { Image } from "@/components/ui";

<Image
  source={{ uri: "https://..." }}
  width={200}
  height={200}
  resizeMode="cover"
  placeholder={{ uri: "data:image/..." }}
/>
```

**Props**: `source`, `width`, `height`, `resizeMode`, `placeholder`, `onLoad`, `onError`

---

### Divider

Visual separator line.

```tsx
import { Divider } from "@/components/ui";

<Divider />              {/* Horizontal */}
<Divider orientation="vertical" /> {/* Vertical */}
<Divider color="red" thickness={2} />
```

**Props**: `orientation` ("horizontal" | "vertical"), `color`, `thickness`

---

## Container Components

### Card

Container with elevation and styling.

```tsx
import { Card } from "@/components/ui";

<Card variant="elevated" padding="md">
  <Text>Card content</Text>
</Card>

// Interactive card
<Card interactive onPress={() => navigate("Details")}>
  <Avatar initials="JD" />
  <Text>John Doe</Text>
</Card>
```

**Props**: `children`, `variant` ("elevated" | "filled" | "outlined"), `padding`, `interactive`, `onPress`

---

### Container

Layout wrapper with padding.

```tsx
import { Container } from "@/components/ui";

<Container maxWidth={1200} padding="lg">
  <Text>Centered content with padding</Text>
</Container>
```

**Props**: `children`, `maxWidth`, `padding`, `centered`

---

### Stack

Flexible layout (row or column).

```tsx
import { Stack } from "@/components/ui";

// Column (default)
<Stack spacing="md">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Stack>

// Row
<Stack direction="row" spacing="lg">
  <Button label="Cancel" />
  <Button label="Submit" variant="primary" />
</Stack>
```

**Props**: `children`, `direction` ("row" | "column"), `spacing`, `align`, `justify`

---

### Grid

Multi-column layout.

```tsx
import { Grid } from "@/components/ui";

<Grid columns={2} spacing="md">
  <Card><Text>Item 1</Text></Card>
  <Card><Text>Item 2</Text></Card>
  <Card><Text>Item 3</Text></Card>
  <Card><Text>Item 4</Text></Card>
</Grid>
```

**Props**: `children`, `columns`, `spacing`, `minWidth`

---

### List

Render flat or sectioned list with items.

```tsx
import { List } from "@/components/ui";

const items = [
  { id: "1", title: "Item 1", subtitle: "Description" },
  { id: "2", title: "Item 2", subtitle: "Description" },
];

<List
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <Text>{item.title}</Text>
  )}
  onEndReached={loadMore}
/>
```

**Props**: `data`, `renderItem`, `keyExtractor`, `loading`, `error`, `horizontal`, `numColumns`

---

### Table

Data table with rows and columns.

```tsx
import { Table } from "@/components/ui";

<Table
  columns={["Name", "Email", "Status"]}
  rows={[
    ["John Doe", "john@example.com", "Active"],
    ["Jane Smith", "jane@example.com", "Inactive"],
  ]}
  sortable
  selectable
/>
```

**Props**: `columns`, `rows`, `sortable`, `selectable`, `striped`, `bordered`

---

## Feedback Components

### Alert

Message box for notifications and alerts.

```tsx
import { Alert } from "@/components/ui";

<Alert message="Success!" type="success" />
<Alert
  title="Error"
  message="Something went wrong"
  type="error"
  closeable
  onClose={handleClose}
/>
<Alert
  message="Action required"
  type="warning"
  action={{ label: "Learn more", onPress: () => {} }}
/>
```

**Props**: `message`, `title`, `type` ("success" | "error" | "warning" | "info"), `closeable`, `onClose`, `action`

---

### Toast

Temporary notification message.

```tsx
import { toast } from "@/components/ui";

toast.success("Changes saved!");
toast.error("Failed to save changes");
toast.info("Processing...");
toast.warning("This action cannot be undone");
```

**Methods**: `success()`, `error()`, `warning()`, `info()`

---

### Modal

Full-screen overlay dialog.

```tsx
import { Modal } from "@/components/ui";

<Modal
  visible={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  actions={[
    { label: "Cancel", onPress: () => setIsOpen(false) },
    { label: "Confirm", variant: "primary", onPress: handleConfirm },
  ]}
  dismissible
>
  <Text>Are you sure?</Text>
</Modal>
```

**Props**: `visible`, `onClose`, `title`, `children`, `actions`, `size` ("sm" | "md" | "lg"), `dismissible`

---

### Sheet

Bottom sheet overlay.

```tsx
import { Sheet } from "@/components/ui";

<Sheet
  visible={isOpen}
  onClose={() => setIsOpen(false)}
  title="Options"
  height={300}
>
  <Button label="Option 1" onPress={() => {}} />
  <Button label="Option 2" onPress={() => {}} />
</Sheet>
```

**Props**: `visible`, `onClose`, `title`, `children`, `height`, `snapPoints`

---

### Drawer

Side drawer navigation.

```tsx
import { Drawer } from "@/components/ui";

<Drawer
  visible={isOpen}
  onClose={() => setIsOpen(false)}
  side="left"
>
  <Button label="Home" onPress={() => navigate("Home")} />
  <Button label="Profile" onPress={() => navigate("Profile")} />
  <Button label="Settings" onPress={() => navigate("Settings")} />
</Drawer>
```

**Props**: `visible`, `onClose`, `children`, `side` ("left" | "right"), `width`

---

### Popover

Context menu or popover.

```tsx
import { Popover } from "@/components/ui";

<Popover
  trigger={<Button label="More" />}
  position="bottom-right"
>
  <Button label="Edit" size="sm" />
  <Button label="Delete" size="sm" variant="destructive" />
</Popover>
```

**Props**: `children`, `trigger`, `position`, `onOpenChange`

---

### Tooltip

Informational tooltip.

```tsx
import { Tooltip } from "@/components/ui";

<Tooltip content="Click to save your changes">
  <Button label="Save" onPress={handleSave} />
</Tooltip>
```

**Props**: `content`, `children`, `position` ("top" | "bottom" | "left" | "right"), `delay`

---

## Data Components

### Progress

Progress bar showing completion.

```tsx
import { ProgressBar } from "@/components/ui";

<ProgressBar value={65} max={100} animated />
<ProgressBar value={3} max={10} variant="success" size="lg" />
```

**Props**: `value`, `max`, `animated`, `variant` ("primary" | "success" | "warning" | "error"), `size`

---

### CircularProgress

Circular progress indicator.

```tsx
import { CircularProgress } from "@/components/ui";

<CircularProgress value={75} />
<CircularProgress value={50} size="lg" color="primary" />
```

**Props**: `value`, `max`, `size` ("sm" | "md" | "lg"), `color`

---

### Spinner

Loading spinner/activity indicator.

```tsx
import { Spinner } from "@/components/ui";

<Spinner />
<Spinner size="lg" color="primary" />
<Spinner message="Loading..." />
```

**Props**: `size` ("sm" | "md" | "lg"), `color`, `message`

---

### Stepper

Multi-step progress indicator.

```tsx
import { Stepper } from "@/components/ui";

<Stepper
  steps={["Personal", "Address", "Payment", "Confirm"]}
  currentStep={1}
  onStepPress={(step) => setCurrentStep(step)}
/>
```

**Props**: `steps`, `currentStep`, `onStepPress`, `vertical`

---

### Tabs

Tab navigation.

```tsx
import { Tabs } from "@/components/ui";

const tabs = [
  { label: "Tab 1", content: <Text>Content 1</Text> },
  { label: "Tab 2", content: <Text>Content 2</Text> },
  { label: "Tab 3", content: <Text>Content 3</Text> },
];

<Tabs tabs={tabs} activeTab={0} onChange={(index) => setActiveTab(index)} />
```

**Props**: `tabs`, `activeTab`, `onChange`, `scrollable`

---

## Component Usage Patterns

### Form with Validation

```tsx
import { Input, Button, Alert } from "@/components/ui";
import { useValidation } from "@/hooks";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errors, validateForm } = useValidation();

  const handleSubmit = () => {
    const newErrors = validateForm(
      { email, password },
      {
        email: { required: true, pattern: VALIDATION_RULES.EMAIL },
        password: { required: true, minLength: 8 },
      }
    );

    if (Object.keys(newErrors).length === 0) {
      // Submit form
    }
  };

  return (
    <>
      <Input
        placeholder="Email"
        value={email}
        onChange={setEmail}
        error={errors.email?.[0]}
      />
      <Input
        placeholder="Password"
        value={password}
        onChange={setPassword}
        secureTextEntry
        error={errors.password?.[0]}
      />
      <Button label="Login" onPress={handleSubmit} />
    </>
  );
}
```

### List with Pagination

```tsx
import { List, Spinner, Alert } from "@/components/ui";
import { useApi, usePagination } from "@/hooks";

export function UsersList() {
  const { page, nextPage, prevPage } = usePagination();
  const { data, isLoading, error, refetch } = useApi(
    () => apiService.get("/users", { page, limit: 20 })
  );

  if (isLoading) return <Spinner />;
  if (error) return <Alert message={error.message} type="error" />;

  return (
    <>
      <List
        data={data?.users || []}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={(user) => user.id}
      />
      <Button
        label="Load More"
        onPress={nextPage}
        disabled={!data?.pagination.hasNextPage}
      />
    </>
  );
}
```

---

## Best Practices

1. **Use barrel exports** - Import from `@/components/ui`
2. **Type props** - All components are fully typed
3. **Accessibility** - All components support ARIA labels
4. **Theming** - Components use `useTheme()` automatically
5. **Typography** - Components use centralized typography system
6. **Validation** - Use `useValidation` hook for forms
7. **Error handling** - Show errors in dedicated fields
8. **Loading states** - Disable and show loading indicators
9. **Responsive** - Components adapt to screen size
10. **Testing** - Use `testID` prop for automation

---

## See Also

- [Project Structure](./STRUCTURE.md) - Folder organization
- [API Reference](./API.md) - Backend endpoints
- [Setup Guide](./SETUP.md) - Configuration
- [Contributing](./CONTRIBUTING.md) - Development guidelines
