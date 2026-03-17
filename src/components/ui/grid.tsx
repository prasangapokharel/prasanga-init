import React from "react";
import { View, ViewStyle, StyleSheet, Dimensions } from "react-native";

interface GridProps {
  /** Children */
  children: React.ReactNode;
  /** Number of columns */
  columns?: number;
  /** Gap between items */
  gap?: number;
  /** Custom styles */
  style?: ViewStyle;
}

const Grid = React.forwardRef<View, GridProps>(
  (
    {
      children,
      columns = 2,
      gap = 8,
      style,
    },
    ref
  ) => {
    const screenWidth = Dimensions.get("window").width;
    const itemWidth = (screenWidth - gap * (columns - 1)) / columns;

    const styles = StyleSheet.create({
      grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: gap,
        justifyContent: "space-between",
      },
      item: {
        width: itemWidth,
      },
    });

    // Ensure children is an array
    const childrenArray = React.Children.toArray(children);

    return (
      <View ref={ref} style={[styles.grid, style]}>
        {childrenArray.map((child, index) => (
          <View key={index} style={styles.item}>
            {child}
          </View>
        ))}
      </View>
    );
  }
);

Grid.displayName = "Grid";

export default Grid;
