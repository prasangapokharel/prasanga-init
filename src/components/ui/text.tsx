import React from "react";
import { View, Text, ViewStyle, TextStyle, StyleSheet } from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "body" | "small" | "caption";
type TextColor = "primary" | "secondary" | "muted" | "error" | "success" | "warning";

interface TextComponentProps {
  /** Text content */
  children: string | React.ReactNode;
  /** Text variant */
  variant?: TextVariant;
  /** Text color */
  color?: TextColor | string;
  /** Font weight */
  fontWeight?: "300" | "400" | "500" | "600" | "700" | "800";
  /** Text alignment */
  align?: "left" | "center" | "right" | "justify";
  /** Line height */
  lineHeight?: number;
  /** Custom style */
  style?: TextStyle;
}

const textVariants: Record<TextVariant, TextStyle> = {
  h1: typography.display.lg,
  h2: typography.display.md,
  h3: typography.display.sm,
  h4: typography.heading.xs,
  body: typography.body.md,
  small: typography.body.sm,
  caption: typography.caption.sm,
};

const TextComponent = React.forwardRef<Text, TextComponentProps>(
  (
    {
      children,
      variant = "body",
      color = "muted",
      fontWeight,
      align = "left",
      lineHeight,
      style,
    },
    ref
  ) => {
    const { colors } = useTheme();

    const colorMap: Record<TextColor, string> = {
      primary: colors.primary,
      secondary: colors.secondary,
      muted: colors.mutedForeground,
      error: colors.destructive,
      success: colors.success,
      warning: colors.warning,
    };

    const baseStyle = textVariants[variant];
    const textColor = colorMap[color as TextColor] || color;

    const styles = StyleSheet.create({
      text: {
        ...baseStyle,
        color: textColor,
        textAlign: align,
        fontWeight: fontWeight || (baseStyle.fontWeight as any),
        lineHeight: lineHeight || baseStyle.lineHeight,
      },
    });

    return (
      <Text ref={ref} style={[styles.text, style]}>
        {children}
      </Text>
    );
  }
);

TextComponent.displayName = "Text";

export default TextComponent;
