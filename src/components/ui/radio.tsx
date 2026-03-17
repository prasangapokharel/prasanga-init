import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
  StyleSheet,
} from "react-native";

interface RadioOption {
  label: string;
  value: string | number;
}

interface RadioProps {
  /** Selected value */
  value?: string | number;
  /** Options to choose from */
  options: RadioOption[];
  /** Callback when option is selected */
  onValueChange?: (value: string | number) => void;
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Direction: horizontal or vertical */
  direction?: "row" | "column";
  /** Active color */
  activeColor?: string;
}

const Radio = React.forwardRef<View, RadioProps>(
  (
    {
      value,
      options,
      onValueChange,
      label,
      disabled = false,
      containerStyle,
      direction = "column",
      activeColor = "#0ea5e9",
    },
    ref
  ) => {
  const styles = StyleSheet.create({
    container: {
      marginBottom: 12,
      opacity: disabled ? 0.5 : 1,
    },
    labelText: {
      fontSize: 14,
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: 8,
    },
    optionsContainer: {
      flexDirection: direction,
      gap: 12,
    },
    radioItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    radioButton: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#d1d5db",
      justifyContent: "center",
      alignItems: "center",
    },
    radioDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: activeColor,
    },
    optionLabel: {
      fontSize: 14,
      color: "#1f2937",
      fontWeight: "500",
    },
  });

    return (
      <View ref={ref} style={[styles.container, containerStyle]}>
        {label && <Text style={styles.labelText}>{label}</Text>}
        <View style={styles.optionsContainer}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={styles.radioItem}
              onPress={() => !disabled && onValueChange?.(opt.value)}
              disabled={disabled}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.radioButton,
                  {
                    borderColor:
                      value === opt.value ? activeColor : "#d1d5db",
                  },
                ]}
              >
                {value === opt.value && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.optionLabel}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;
