import React, { useState } from "react";
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  Dimensions,
} from "react-native";
import { PanResponder, Animated } from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";

interface SliderProps {
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Current value */
  value?: number;
  /** Step size */
  step?: number;
  /** Callback when value changes */
  onValueChange?: (value: number) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Label */
  label?: string;
  /** Track color */
  trackColor?: string;
  /** Thumb color */
  thumbColor?: string;
}

const Slider = React.forwardRef<View, SliderProps>(
  (
    {
      min = 0,
      max = 100,
      value = 0,
      step = 1,
      onValueChange,
      disabled = false,
      containerStyle,
      label,
      trackColor,
      thumbColor,
    },
    ref
  ) => {
    const { colors } = useTheme();
    const defaultTrackColor = trackColor || colors.muted;
    const defaultThumbColor = thumbColor || colors.primary;

    const [sliderWidth, setSliderWidth] = useState(0);
    const thumbPosition = (value - min) / (max - min);

     const styles = StyleSheet.create({
       container: {
         marginBottom: 12,
         opacity: disabled ? 0.5 : 1,
       },
       labelText: {
         ...typography.label.md,
         color: colors.foreground,
         marginBottom: 8,
       },
       labelRow: {
         flexDirection: "row",
         justifyContent: "space-between",
         alignItems: "center",
       },
       value: {
         ...typography.label.md,
         color: defaultThumbColor,
       },
      sliderContainer: {
        height: 40,
        justifyContent: "center",
        marginVertical: 8,
      },
      track: {
        height: 6,
        backgroundColor: defaultTrackColor,
        borderRadius: 3,
        position: "relative",
      },
      filledTrack: {
        height: 6,
        backgroundColor: defaultThumbColor,
        borderRadius: 3,
        width: `${thumbPosition * 100}%`,
      },
      thumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: defaultThumbColor,
        position: "absolute",
        top: 10,
        left: `${thumbPosition * 100}%`,
        marginLeft: -10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
      },
    });

    const handleValueChange = (newValue: number) => {
      let adjustedValue = Math.round(newValue / step) * step;
      adjustedValue = Math.max(min, Math.min(max, adjustedValue));
      onValueChange?.(adjustedValue);
    };

    return (
      <View ref={ref} style={[styles.container, containerStyle]}>
        {label && (
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        )}
        <View
          style={styles.sliderContainer}
          onLayout={(event) => {
            setSliderWidth(event.nativeEvent.layout.width);
          }}
        >
          <View style={styles.track}>
            <View
              style={[
                styles.filledTrack,
                {
                  width: `${thumbPosition * 100}%`,
                },
              ]}
            />
            <View
              style={[
                styles.thumb,
                {
                  left: `${thumbPosition * 100}%`,
                },
              ]}
            />
          </View>
        </View>
      </View>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;
