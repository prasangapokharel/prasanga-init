import React from "react";
import { View, Text, ViewStyle, TextStyle, StyleSheet } from "react-native";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "body" | "small" | "caption";
type TextColor = "primary" | "secondary" | "muted" | "error" | "success";

interface TextComponentProps {
  /** Text content */
  children: string | React.ReactNode;
  /** Text variant */
  variant?: TextVariant;
  /** Text color */
  color?: TextColor | string;
  /** Font weight */
  fontWeight?: "normal" | "500" | "600" | "700" | "bold";
  /** Text alignment */
  align?: "left" | "center" | "right" | "justify";
  /** Line height */
  lineHeight?: number;
  /** Custom style */
  style?: TextStyle;
}

const textVariants: Record<TextVariant, TextStyle> = {
  h1: { fontSize: 32, fontWeight: "700", lineHeight: 40 },
  h2: { fontSize: 28, fontWeight: "700", lineHeight: 36 },
  h3: { fontSize: 24, fontWeight: "700", lineHeight: 32 },
  h4: { fontSize: 20, fontWeight: "600", lineHeight: 28 },
  body: { fontSize: 16, fontWeight: "400", lineHeight: 24 },
  small: { fontSize: 14, fontWeight: "400", lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: "400", lineHeight: 16 },
};

const colorMap: Record<TextColor, string> = {
  primary: "#0ea5e9",
  secondary: "#f97316",
  muted: "#6b7280",
  error: "#ef4444",
  success: "#22c55e",
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
