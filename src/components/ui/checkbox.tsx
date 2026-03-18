import React from "react";
import {
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
  Text,
} from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";

interface CheckboxProps {
  /** Whether checkbox is checked */
  checked?: boolean;
  /** Callback when checkbox is pressed */
  onPress?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Custom size */
  size?: number;
  /** Color when checked */
  activeColor?: string;
}

const Checkbox = React.forwardRef<View, CheckboxProps>(
  (
    {
      checked = false,
      onPress,
      label,
      disabled = false,
      containerStyle,
      size = 20,
      activeColor,
    },
    ref
  ) => {
    const { colors } = useTheme();
    const defaultActiveColor = activeColor || colors.primary;

    const styles = StyleSheet.create({
      container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        opacity: disabled ? 0.5 : 1,
      },
      checkbox: {
        width: size,
        height: size,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: checked ? defaultActiveColor : colors.inputBorder,
        backgroundColor: checked ? defaultActiveColor : colors.background,
        justifyContent: "center",
        alignItems: "center",
      },
      checkmark: {
        fontSize: size * 0.6,
        color: colors.primaryForeground,
        fontWeight: "bold",
      },
      label: {
        ...typography.label.md,
        color: colors.foreground,
      },
    });

    return (
      <TouchableOpacity
        ref={ref}
        style={[styles.container, containerStyle]}
        disabled={disabled}
        onPress={() => !disabled && onPress?.(!checked)}
        activeOpacity={0.7}
      >
        <View style={styles.checkbox}>
          {checked && <Text style={styles.checkmark}>✓</Text>}
        </View>
        {label && <Text style={styles.label}>{label}</Text>}
      </TouchableOpacity>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
