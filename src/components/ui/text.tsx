import React from "react";
import { View, Text, ViewStyle, TextStyle, StyleSheet } from "react-native";

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
  h1: { fontSize: 36, fontWeight: "700", lineHeight: 44, letterSpacing: -0.72 },
  h2: { fontSize: 30, fontWeight: "700", lineHeight: 36, letterSpacing: -0.6 },
  h3: { fontSize: 24, fontWeight: "700", lineHeight: 32, letterSpacing: -0.48 },
  h4: { fontSize: 20, fontWeight: "600", lineHeight: 28, letterSpacing: -0.2 },
  body: { fontSize: 16, fontWeight: "400", lineHeight: 24, letterSpacing: 0 },
  small: { fontSize: 14, fontWeight: "400", lineHeight: 20, letterSpacing: 0 },
  caption: { fontSize: 12, fontWeight: "400", lineHeight: 16, letterSpacing: 0.2 },
};

const colorMap: Record<TextColor, string> = {
  primary: "#0e7ae5",
  secondary: "#14b8a6",
  muted: "#737373",
  error: "#ef4444",
  success: "#22c55e",
  warning: "#f59e0b",
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
