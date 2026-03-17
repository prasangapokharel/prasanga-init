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
      activeColor = "#0e7ae5",
      inactiveColor = "#e8e8e8",
      width = 52,
      height = 32,
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
    }, [value, width, height, translateX]);

    const styles = StyleSheet.create({
      container: {
        opacity: disabled ? 0.6 : 1,
      },
      track: {
        width: width,
        height: height,
        borderRadius: height / 2,
        backgroundColor: value ? activeColor : inactiveColor,
        padding: 2,
        justifyContent: "center",
        shadowColor: value ? activeColor : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: value ? 0.15 : 0.05,
        shadowRadius: value ? 6 : 3,
        elevation: value ? 3 : 1,
      },
      thumb: {
        width: height - 4,
        height: height - 4,
        borderRadius: (height - 4) / 2,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 4,
      },
    });

    return (
      <TouchableOpacity
        ref={ref}
        style={[styles.container, containerStyle]}
        onPress={() => !disabled && onValueChange?.(!value)}
        disabled={disabled}
        activeOpacity={0.8}
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
