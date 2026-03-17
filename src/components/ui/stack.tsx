import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

type StackDirection = "row" | "column";

interface StackProps {
  /** Children */
  children: React.ReactNode;
  /** Direction */
  direction?: StackDirection;
  /** Spacing */
  spacing?: number;
  /** Justify content */
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  /** Align items */
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  /** Custom styles */
  style?: ViewStyle;
}

const Stack = React.forwardRef<View, StackProps>(
  (
    {
      children,
      direction = "column",
      spacing = 8,
      justifyContent = "flex-start",
      alignItems = "stretch",
      style,
    },
    ref
  ) => {
    const styles = StyleSheet.create({
      stack: {
        flexDirection: direction,
        gap: spacing,
        justifyContent: justifyContent,
        alignItems: alignItems,
      },
    });

    return (
      <View ref={ref} style={[styles.stack, style]}>
        {children}
      </View>
    );
  }
);

Stack.displayName = "Stack";

export default Stack;
