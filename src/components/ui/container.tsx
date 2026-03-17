import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

interface ContainerProps {
  /** Children */
  children: React.ReactNode;
  /** Flex direction */
  direction?: "row" | "column";
  /** Gap between items */
  gap?: number;
  /** Padding */
  padding?: number;
  /** Padding horizontal */
  paddingHorizontal?: number;
  /** Padding vertical */
  paddingVertical?: number;
  /** Background color */
  backgroundColor?: string;
  /** Border radius */
  borderRadius?: number;
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

const Container = React.forwardRef<View, ContainerProps>(
  (
    {
      children,
      direction = "column",
      gap = 0,
      padding,
      paddingHorizontal,
      paddingVertical,
      backgroundColor = "transparent",
      borderRadius = 0,
      justifyContent = "flex-start",
      alignItems = "stretch",
      style,
    },
    ref
  ) => {
    const styles = StyleSheet.create({
      container: {
        flexDirection: direction,
        gap: gap,
        padding: padding,
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        justifyContent: justifyContent,
        alignItems: alignItems,
      },
    });

    return (
      <View ref={ref} style={[styles.container, style]}>
        {children}
      </View>
    );
  }
);

Container.displayName = "Container";

export default Container;
