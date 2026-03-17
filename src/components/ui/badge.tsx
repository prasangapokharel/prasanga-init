import React from "react";
import { View, Text, ViewStyle, TextStyle, StyleSheet } from "react-native";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "destructive"
  | "success"
  | "warning";

interface BadgeProps {
  /** Badge text */
  children: string;
  /** Badge variant */
  variant?: BadgeVariant;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Custom text style */
  textStyle?: TextStyle;
  /** Rounded style */
  rounded?: boolean;
}

const Badge = React.forwardRef<View, BadgeProps>(
  (
    {
      children,
      variant = "default",
      containerStyle,
      textStyle,
      rounded = true,
    },
    ref
  ) => {
    const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
      default: { bg: "#f3f4f6", text: "#6b7280" },
      primary: { bg: "#dbeafe", text: "#0369a1" },
      secondary: { bg: "#fed7aa", text: "#92400e" },
      destructive: { bg: "#fee2e2", text: "#991b1b" },
      success: { bg: "#dcfce7", text: "#166534" },
      warning: { bg: "#fef3c7", text: "#92400e" },
    };

    const selectedVariant = variantStyles[variant];

    const styles = StyleSheet.create({
      badge: {
        backgroundColor: selectedVariant.bg,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: rounded ? 12 : 4,
        alignSelf: "flex-start",
      },
      text: {
        fontSize: 12,
        fontWeight: "600",
        color: selectedVariant.text,
      },
    });

    return (
      <View ref={ref} style={[styles.badge, containerStyle]}>
        <Text style={[styles.text, textStyle]}>{children}</Text>
      </View>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
