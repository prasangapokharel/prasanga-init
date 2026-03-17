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
    // Enhanced size styles with premium spacing
    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      sm: { paddingHorizontal: 12, paddingVertical: 8, minHeight: 32 },
      md: { paddingHorizontal: 16, paddingVertical: 12, minHeight: 40 },
      lg: { paddingHorizontal: 24, paddingVertical: 16, minHeight: 48 },
    };

    // Premium variant styles with enhanced shadows and gradients
    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      default: { 
        backgroundColor: "#f5f5f5", 
        borderWidth: 1, 
        borderColor: "#e8e8e8",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
      },
      primary: { 
        backgroundColor: "#0e7ae5",
        shadowColor: "#0e7ae5",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 5,
      },
      secondary: { 
        backgroundColor: "#14b8a6",
        shadowColor: "#14b8a6",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 5,
      },
      outline: { 
        borderWidth: 2, 
        borderColor: "#0e7ae5", 
        backgroundColor: "#f0f8ff",
        shadowColor: "transparent",
      },
      ghost: { 
        backgroundColor: "transparent",
        shadowColor: "transparent",
      },
      destructive: { 
        backgroundColor: "#ef4444",
        shadowColor: "#ef4444",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 5,
      },
    };

    // Enhanced text color variants
    const textColorVariants: Record<ButtonVariant, string> = {
      default: "#242424",
      primary: "#ffffff",
      secondary: "#ffffff",
      outline: "#0e7ae5",
      ghost: "#0a0a0a",
      destructive: "#ffffff",
    };

    // Text size styles with better typography
    const textSizeStyles: Record<ButtonSize, number> = {
      sm: 13,
      md: 15,
      lg: 16,
    };

    const textWeightStyles: Record<ButtonSize, "600" | "700"> = {
      sm: "600",
      md: "600",
      lg: "700",
    };

    const styles = StyleSheet.create({
      container: {
        ...sizeStyles[size],
        ...variantStyles[variant],
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        opacity: disabled || isLoading ? 0.65 : 1,
        width: fullWidth ? "100%" : "auto",
      },
      text: {
        fontSize: textSizeStyles[size],
        color: textColorVariants[variant],
        fontWeight: textWeightStyles[size],
        letterSpacing: 0.25,
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
        activeOpacity={disabled || isLoading ? 1 : 0.75}
        style={[styles.container, containerStyle]}
      >
        <View style={styles.row}>
          {leftIcon && !isLoading ? <View>{leftIcon}</View> : null}
          {isLoading && (
            <ActivityIndicator
              size="small"
              color={
                variant === "primary" || variant === "secondary" || variant === "destructive"
                  ? "#fff"
                  : variant === "outline"
                  ? "#0e7ae5"
                  : "#242424"
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
