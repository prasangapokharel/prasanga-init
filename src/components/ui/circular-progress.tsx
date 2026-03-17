import React from "react";
import { View, Text, ViewStyle, StyleSheet } from "react-native";

interface CircularProgressProps {
  /** Progress value (0-100) */
  value?: number;
  /** Radius of circle */
  radius?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Show percentage text */
  showPercentage?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Progress color */
  color?: string;
  /** Background color */
  backgroundColor?: string;
  /** Label text */
  label?: string;
}

const CircularProgress = React.forwardRef<View, CircularProgressProps>(
  (
    {
      value = 0,
      radius = 50,
      strokeWidth = 4,
      showPercentage = true,
      containerStyle,
      color = "#0ea5e9",
      backgroundColor = "#e5e7eb",
      label,
    },
    ref
  ) => {
    const percentage = Math.min(Math.max(value, 0), 100);
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const styles = StyleSheet.create({
      container: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
      },
      circleContainer: {
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      },
      textContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
      },
      percentage: {
        fontSize: 24,
        fontWeight: "700",
        color: color,
      },
      label: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 4,
      },
    });

    return (
      <View ref={ref} style={[styles.container, containerStyle]}>
        <View
          style={[
            styles.circleContainer,
            {
              width: radius * 2,
              height: radius * 2,
            },
          ]}
        >
          {/* Background circle */}
          <View
            style={{
              width: radius * 2,
              height: radius * 2,
              borderRadius: radius,
              borderWidth: strokeWidth,
              borderColor: backgroundColor,
              position: "absolute",
            }}
          />

          {/* Progress arc (simplified as a colored circle) */}
          <View
            style={{
              width: radius * 2,
              height: radius * 2,
              borderRadius: radius,
              borderWidth: strokeWidth,
              borderColor: color,
              borderRightColor: backgroundColor,
              borderBottomColor: backgroundColor,
              transform: [{ rotate: `${(percentage / 100) * 360}deg` }],
              position: "absolute",
            }}
          />

          {/* Center text */}
          <View style={styles.textContainer}>
            {showPercentage && (
              <Text style={styles.percentage}>{percentage}%</Text>
            )}
            {label && <Text style={styles.label}>{label}</Text>}
          </View>
        </View>
      </View>
    );
  }
);

CircularProgress.displayName = "CircularProgress";

export default CircularProgress;
