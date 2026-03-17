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
    const variantStyles: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
      default: { bg: "#f5f5f5", text: "#525252", border: "#e8e8e8" },
      primary: { bg: "#f0f8ff", text: "#052242", border: "#c1e3ff" },
      secondary: { bg: "#f0fdfa", text: "#023632", border: "#99fbe8" },
      destructive: { bg: "#fef2f2", text: "#7f1d1d", border: "#fecaca" },
      success: { bg: "#f0fdf4", text: "#145231", border: "#bbf7d0" },
      warning: { bg: "#fef7e0", text: "#78350f", border: "#fde047" },
    };

    const selectedVariant = variantStyles[variant];

    const styles = StyleSheet.create({
      badge: {
        backgroundColor: selectedVariant.bg,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: rounded ? 20 : 6,
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: selectedVariant.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
      },
      text: {
        fontSize: 13,
        fontWeight: "600",
        color: selectedVariant.text,
        letterSpacing: 0.2,
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
