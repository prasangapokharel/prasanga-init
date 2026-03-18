import React from "react";
import { View, Text, ViewStyle, StyleSheet } from "react-native";
import { useTheme } from "../../lib/theme-context";

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
      color,
      backgroundColor,
      label,
    },
    ref
  ) => {
    const { colors } = useTheme();
    const defaultColor = color || colors.primary;
    const defaultBackgroundColor = backgroundColor || colors.muted;

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
        color: defaultColor,
      },
      label: {
        fontSize: 12,
        color: colors.mutedForeground,
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
               borderColor: defaultBackgroundColor,
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
               borderColor: defaultColor,
               borderRightColor: defaultBackgroundColor,
               borderBottomColor: defaultBackgroundColor,
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
