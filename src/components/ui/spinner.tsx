import React from "react";
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface SpinnerProps {
  /** Size of spinner */
  size?: "small" | "medium" | "large";
  /** Color of spinner */
  color?: string;
  /** Label text */
  label?: string;
  /** Full screen mode */
  fullScreen?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
}

const Spinner = React.forwardRef<View, SpinnerProps>(
  (
    {
      size = "large",
      color = "#0ea5e9",
      label,
      fullScreen = false,
      containerStyle,
    },
    ref
  ) => {
    const sizeMap = {
      small: 24 as const,
      medium: 36 as const,
      large: 48 as const,
    };

    const styles = StyleSheet.create({
      container: {
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        ...(fullScreen && {
          flex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }),
      },
      content: {
        alignItems: "center",
        gap: 12,
      },
      label: {
        fontSize: 14,
        color: "#6b7280",
        fontWeight: "500",
        marginTop: 8,
      },
    });

    return (
      <View
        ref={ref}
        style={[
          styles.container,
          containerStyle,
        ]}
      >
        <View style={styles.content}>
          <ActivityIndicator
            size={sizeMap[size]}
            color={color}
          />
          {label && <Text style={styles.label}>{label}</Text>}
        </View>
      </View>
    );
  }
);

Spinner.displayName = "Spinner";

export default Spinner;
