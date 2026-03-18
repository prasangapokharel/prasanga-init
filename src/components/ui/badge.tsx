import React from "react";
import { View, Text, ViewStyle, TextStyle, StyleSheet } from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";

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
    const { colors } = useTheme();

    const variantStyles: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
      default: { bg: colors.muted, text: colors.foreground, border: colors.border },
      primary: { bg: colors.primaryLight, text: colors.primary, border: colors.primary },
      secondary: { bg: colors.secondaryLight, text: colors.secondary, border: colors.secondary },
      destructive: { bg: colors.destructiveLight, text: colors.destructive, border: colors.destructive },
      success: { bg: colors.successLight, text: colors.success, border: colors.success },
      warning: { bg: colors.warningLight, text: colors.warning, border: colors.warning },
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
        ...typography.tiny.md,
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
