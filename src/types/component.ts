/**
 * ============================================================================
 * Prasanga UI - Component Types
 * ============================================================================
 * Common component prop types and patterns
 * ============================================================================
 */

import type { ViewStyle, TextStyle, ImageStyle, StyleProp } from "react-native";

/**
 * Common Component Props
 * Base props that most components share
 */
export type CommonComponentProps = {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  className?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

/**
 * Clickable Component Props
 * Props for interactive components
 */
export type ClickableComponentProps = CommonComponentProps & {
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

/**
 * Form Field Props
 * Props for form input components
 */
export type FormFieldProps<T = string> = CommonComponentProps & {
  value: T;
  onChange: (value: T) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  placeholder?: string;
};

/**
 * Input Component Props
 */
export type InputProps = FormFieldProps<string> & {
  type?: "text" | "email" | "password" | "phone" | "number";
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

/**
 * Select/Picker Component Props
 */
export type SelectProps<T = string | number> = FormFieldProps<T> & {
  options: SelectOption<T>[];
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
};

/**
 * Select Option
 */
export type SelectOption<T = string | number> = {
  label: string;
  value: T;
  disabled?: boolean;
  description?: string;
};

/**
 * Checkbox Component Props
 */
export type CheckboxProps = Omit<
  FormFieldProps<boolean>,
  "placeholder" | "helperText"
> & {
  label?: string;
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
};

/**
 * Radio Component Props
 */
export type RadioProps = Omit<
  FormFieldProps<string | number>,
  "placeholder" | "helperText" | "multiline"
> & {
  label?: string;
  size?: "sm" | "md" | "lg";
};

/**
 * Button Component Props
 */
export type ButtonProps = ClickableComponentProps & {
  label: string;
  variant?: "primary" | "secondary" | "tertiary" | "destructive";
  size?: "xs" | "sm" | "md" | "lg";
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

/**
 * Badge Component Props
 */
export type BadgeProps = CommonComponentProps & {
  label: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "md";
  icon?: React.ReactNode;
  closeable?: boolean;
  onClose?: () => void;
};

/**
 * Card Component Props
 */
export type CardProps = CommonComponentProps & {
  children: React.ReactNode;
  variant?: "elevated" | "filled" | "outlined";
  interactive?: boolean;
  onPress?: () => void;
  padding?: "xs" | "sm" | "md" | "lg";
};

/**
 * Modal Component Props
 */
export type ModalProps = CommonComponentProps & {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: ModalAction[];
  size?: "sm" | "md" | "lg";
  dismissible?: boolean;
};

/**
 * Modal Action
 */
export type ModalAction = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "destructive";
  disabled?: boolean;
};

/**
 * Toast Message
 */
export type ToastMessage = {
  id?: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
};

/**
 * Alert Component Props
 */
export type AlertProps = CommonComponentProps & {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  title?: string;
  icon?: React.ReactNode;
  closeable?: boolean;
  onClose?: () => void;
  action?: {
    label: string;
    onPress: () => void;
  };
};

/**
 * Separator/Divider Component Props
 */
export type SeparatorProps = CommonComponentProps & {
  orientation?: "horizontal" | "vertical";
  color?: string;
  thickness?: number;
};

/**
 * List Component Props
 */
export type ListProps<T> = CommonComponentProps & {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  horizontal?: boolean;
  numColumns?: number;
};

/**
 * List Item Component Props
 */
export type ListItemProps = ClickableComponentProps & {
  title: string;
  subtitle?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  trailing?: React.ReactNode;
};

/**
 * Spinner/Loader Component Props
 */
export type SpinnerProps = CommonComponentProps & {
  size?: "sm" | "md" | "lg";
  color?: string;
  message?: string;
};

/**
 * Progress Component Props
 */
export type ProgressProps = CommonComponentProps & {
  value: number;
  max?: number;
  animated?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "success" | "warning" | "error";
};

/**
 * Tooltip Component Props
 */
export type TooltipProps = CommonComponentProps & {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
};

/**
 * Popover Component Props
 */
export type PopoverProps = CommonComponentProps & {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  trigger?: "press" | "long-press";
  onOpenChange?: (isOpen: boolean) => void;
};
