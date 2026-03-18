import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { useTheme } from "../../lib/theme-context";

interface StepperProps {
  /** Current value */
  value?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Callback when value changes */
  onValueChange?: (value: number) => void;
  /** Label */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Button size */
  size?: "sm" | "md" | "lg";
}

const Stepper = React.forwardRef<View, StepperProps>(
  (
    {
      value = 0,
      min = 0,
      max = 100,
      onValueChange,
      label,
      disabled = false,
      containerStyle,
      size = "md",
    },
    ref
  ) => {
    const { colors } = useTheme();

    const buttonSizes: Record<"sm" | "md" | "lg", number> = {
      sm: 32,
      md: 40,
      lg: 48,
    };

    const textSizes: Record<"sm" | "md" | "lg", number> = {
      sm: 12,
      md: 14,
      lg: 16,
    };

    const buttonSize = buttonSizes[size];
    const textSize = textSizes[size];

    const styles = StyleSheet.create({
      container: {
        marginBottom: 12,
        opacity: disabled ? 0.5 : 1,
      },
      labelText: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.foreground,
        marginBottom: 8,
      },
      stepperContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        alignSelf: "flex-start",
      },
      button: {
        width: buttonSize,
        height: buttonSize,
        borderRadius: 6,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.primary,
      },
      buttonText: {
        fontSize: textSize * 1.2,
        color: colors.primaryForeground,
        fontWeight: "bold",
      },
      valueContainer: {
        minWidth: 50,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
      },
      value: {
        fontSize: textSize,
        fontWeight: "600",
        color: colors.foreground,
      },
    });

    const handleIncrement = () => {
      if (!disabled && value < max) {
        onValueChange?.(value + 1);
      }
    };

    const handleDecrement = () => {
      if (!disabled && value > min) {
        onValueChange?.(value - 1);
      }
    };

    return (
      <View ref={ref} style={[styles.container, containerStyle]}>
        {label && <Text style={styles.labelText}>{label}</Text>}
        <View style={styles.stepperContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                opacity: value <= min || disabled ? 0.5 : 1,
              },
            ]}
            onPress={handleDecrement}
            disabled={value <= min || disabled}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>−</Text>
          </TouchableOpacity>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{value}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              {
                opacity: value >= max || disabled ? 0.5 : 1,
              },
            ]}
            onPress={handleIncrement}
            disabled={value >= max || disabled}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

Stepper.displayName = "Stepper";

export default Stepper;
