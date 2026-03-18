import React from "react";
import { View, Text, ViewStyle, StyleSheet } from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";

interface ProgressBarProps {
  /** Progress value (0-100) */
  value?: number;
  /** Label text */
  label?: string;
  /** Show percentage text */
  showLabel?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Height of bar */
  height?: number;
  /** Bar color */
  color?: string;
  /** Background color */
  backgroundColor?: string;
  /** Animated */
  animated?: boolean;
  /** Label position */
  labelPosition?: "top" | "right" | "inside";
}

const ProgressBar = React.forwardRef<View, ProgressBarProps>(
  (
    {
      value = 0,
      label,
      showLabel = true,
      containerStyle,
      height = 8,
      color,
      backgroundColor,
      labelPosition = "top",
    },
    ref
  ) => {
    const { colors } = useTheme();
    const defaultColor = color || colors.primary;
    const defaultBackgroundColor = backgroundColor || colors.muted;

    const percentage = Math.min(Math.max(value, 0), 100);

    const styles = StyleSheet.create({
      container: {
        marginBottom: 12,
      },
      labelContainer: {
        flexDirection:
          labelPosition === "right" ? "row" : "column",
        justifyContent: "space-between",
        alignItems: labelPosition === "inside" ? "center" : "flex-start",
        marginBottom: labelPosition === "top" ? 8 : 0,
      },
       label: {
         ...typography.caption.sm,
         color: colors.mutedForeground,
         marginBottom: labelPosition === "top" ? 0 : 4,
       },
       barContainer: {
         height: height,
         backgroundColor: defaultBackgroundColor,
         borderRadius: height / 2,
         overflow: "hidden",
       },
       bar: {
         height: height,
         backgroundColor: defaultColor,
         borderRadius: height / 2,
         width: `${percentage}%`,
       },
       percentage: {
         ...typography.caption.sm,
         color: labelPosition === "inside" ? colors.primaryForeground : colors.mutedForeground,
         marginLeft: labelPosition === "right" ? 8 : 0,
       },
    });

    return (
      <View ref={ref} style={[styles.container, containerStyle]}>
        {showLabel && (labelPosition === "top" || labelPosition === "right") && (
          <View style={styles.labelContainer}>
            {label && <Text style={styles.label}>{label}</Text>}
            <Text style={styles.percentage}>{percentage}%</Text>
          </View>
        )}
        <View style={styles.barContainer}>
          <View style={[styles.bar, { width: `${percentage}%` }]} />
          {labelPosition === "inside" && showLabel && (
            <Text style={styles.percentage}>{percentage}%</Text>
          )}
        </View>
      </View>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
