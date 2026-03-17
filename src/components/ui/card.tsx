import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Whether to show shadow */
  shadow?: boolean;
  /** Card padding */
  padding?: number;
  /** Border radius */
  rounded?: number;
  /** Container style override */
  style?: ViewStyle;
}

const Card = React.forwardRef<View, CardProps>(
  (
    {
      children,
      shadow = true,
      padding = 16,
      rounded = 8,
      style,
    },
    ref
  ) => {
    const styles = StyleSheet.create({
      card: {
        backgroundColor: "#ffffff",
        borderRadius: rounded,
        padding: padding,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        ...(shadow && {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 2,
        }),
      },
    });

    return (
      <View ref={ref} style={[styles.card, style]}>
        {children}
      </View>
    );
  }
);

Card.displayName = "Card";

export default Card;
