import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

interface DividerProps {
  /** Direction */
  direction?: "horizontal" | "vertical";
  /** Color */
  color?: string;
  /** Thickness */
  thickness?: number;
  /** Margin */
  margin?: number;
  /** Custom style */
  style?: ViewStyle;
}

const Divider = React.forwardRef<View, DividerProps>(
  (
    {
      direction = "horizontal",
      color = "#e5e7eb",
      thickness = 1,
      margin = 16,
      style,
    },
    ref
  ) => {
    const styles = StyleSheet.create({
      divider: {
        backgroundColor: color,
        ...(direction === "horizontal" && {
          height: thickness,
          width: "100%",
          marginVertical: margin,
        }),
        ...(direction === "vertical" && {
          width: thickness,
          height: "100%",
          marginHorizontal: margin,
        }),
      },
    });

    return <View ref={ref} style={[styles.divider, style]} />;
  }
);

Divider.displayName = "Divider";

export default Divider;
