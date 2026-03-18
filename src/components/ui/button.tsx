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
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";

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
  /** Alias for containerStyle */
  style?: ViewStyle;
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
    const { colors } = useTheme();

    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      sm: { paddingHorizontal: 12, paddingVertical: 8, minHeight: 32 },
      md: { paddingHorizontal: 16, paddingVertical: 12, minHeight: 40 },
      lg: { paddingHorizontal: 24, paddingVertical: 16, minHeight: 48 },
    };

    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      default: {
        backgroundColor: colors.muted,
        borderWidth: 1,
        borderColor: colors.border,
      },
      primary: {
        backgroundColor: colors.primary,
      },
      secondary: {
        backgroundColor: colors.secondary,
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.border,
      },
      ghost: {
        backgroundColor: "transparent",
      },
      destructive: {
        backgroundColor: colors.destructive,
      },
    };

    const variantTextColors: Record<ButtonVariant, string> = {
      default: colors.foreground,
      primary: colors.primaryForeground,
      secondary: colors.secondaryForeground,
      outline: colors.foreground,
      ghost: colors.foreground,
      destructive: colors.destructiveForeground,
    };

    const sizeTextStyles: Record<ButtonSize, TextStyle> = {
      sm: typography.button.sm,
      md: typography.button.md,
      lg: typography.button.lg,
    };

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={disabled || isLoading}
        activeOpacity={0.7}
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            opacity: disabled ? 0.5 : 1,
          },
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && { alignSelf: "stretch" },
          containerStyle,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color={variantTextColors[variant]} size="small" />
        ) : (
          <>
            {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}
            <Text
              style={[
                {
                  color: variantTextColors[variant],
                },
                sizeTextStyles[size],
                textStyle,
              ]}
            >
              {children}
            </Text>
            {rightIcon && <View style={{ marginLeft: 8 }}>{rightIcon}</View>}
          </>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";

export default Button;
