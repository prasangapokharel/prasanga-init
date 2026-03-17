import React from "react";
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";

export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Whether button is loading */
  isLoading?: boolean;
  /** Button text label */
  children: React.ReactNode;
  /** Callback when pressed */
  onPress?: () => void;
  /** Additional container styles */
  containerStyle?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Full width button */
  fullWidth?: boolean;
}

const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      disabled = false,
      isLoading = false,
      children,
      onPress,
      containerStyle,
      textStyle,
      leftIcon,
      rightIcon,
      fullWidth = false,
    },
    ref
  ) => {
    // Size styles
    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      sm: { paddingHorizontal: 12, paddingVertical: 8 },
      md: { paddingHorizontal: 16, paddingVertical: 12 },
      lg: { paddingHorizontal: 24, paddingVertical: 16 },
    };

    // Variant styles
    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      default: { backgroundColor: "#e5e7eb", borderWidth: 1, borderColor: "#d1d5db" },
      primary: { backgroundColor: "#0ea5e9" },
      secondary: { backgroundColor: "#f97316" },
      outline: { borderWidth: 2, borderColor: "#0ea5e9", backgroundColor: "transparent" },
      ghost: { backgroundColor: "transparent" },
      destructive: { backgroundColor: "#ef4444" },
    };

    // Text color variants
    const textColorVariants: Record<ButtonVariant, string> = {
      default: "#1f2937",
      primary: "#ffffff",
      secondary: "#ffffff",
      outline: "#0ea5e9",
      ghost: "#1f2937",
      destructive: "#ffffff",
    };

    // Text size styles
    const textSizeStyles: Record<ButtonSize, number> = {
      sm: 12,
      md: 14,
      lg: 16,
    };

    const styles = StyleSheet.create({
      container: {
        ...sizeStyles[size],
        ...variantStyles[variant],
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? "100%" : "auto",
      },
      text: {
        fontSize: textSizeStyles[size],
        color: textColorVariants[variant],
        fontWeight: "600",
        letterSpacing: 0.5,
      },
      row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      },
    });

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={disabled || isLoading}
        activeOpacity={0.7}
        style={[styles.container, containerStyle]}
      >
        <View style={styles.row}>
          {leftIcon && !isLoading ? <View>{leftIcon}</View> : null}
          {isLoading && (
            <ActivityIndicator
              size="small"
              color={
                variant === "primary" || variant === "secondary"
                  ? "#fff"
                  : "#000"
              }
            />
          )}
          <Text style={[styles.text, textStyle]}>
            {typeof children === "string" ? children : ""}
          </Text>
          {rightIcon && !isLoading ? <View>{rightIcon}</View> : null}
        </View>
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";

export default Button;
