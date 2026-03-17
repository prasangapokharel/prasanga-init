import React from "react";
import {
  TouchableOpacity,
  Animated,
  View,
  ViewStyle,
  StyleSheet,
} from "react-native";

interface SwitchProps {
  /** Whether switch is ON */
  value?: boolean;
  /** Callback when switch is toggled */
  onValueChange?: (value: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Active color */
  activeColor?: string;
  /** Inactive color */
  inactiveColor?: string;
  /** Track width */
  width?: number;
  /** Track height */
  height?: number;
}

const Switch = React.forwardRef<View, SwitchProps>(
  (
    {
      value = false,
      onValueChange,
      disabled = false,
      containerStyle,
      activeColor = "#0ea5e9",
      inactiveColor = "#e5e7eb",
      width = 48,
      height = 28,
    },
    ref
  ) => {
    const translateX = React.useRef(
      new Animated.Value(value ? width - height : 0)
    ).current;

    React.useEffect(() => {
      Animated.timing(translateX, {
        toValue: value ? width - height : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [value]);

    const styles = StyleSheet.create({
      container: {
        opacity: disabled ? 0.5 : 1,
      },
      track: {
        width: width,
        height: height,
        borderRadius: height / 2,
        backgroundColor: value ? activeColor : inactiveColor,
        padding: 2,
        justifyContent: "center",
      },
      thumb: {
        width: height - 4,
        height: height - 4,
        borderRadius: (height - 4) / 2,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
      },
    });

    return (
      <TouchableOpacity
        ref={ref}
        style={[styles.container, containerStyle]}
        onPress={() => !disabled && onValueChange?.(!value)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <View style={styles.track}>
          <Animated.View
            style={[
              styles.thumb,
              {
                transform: [{ translateX }],
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
