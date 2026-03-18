import React from "react";
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";

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
      color,
      label,
      fullScreen = false,
      containerStyle,
    },
    ref
  ) => {
    const { colors } = useTheme();
    const defaultColor = color || colors.primary;

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
          backgroundColor: fullScreen ? colors.background : undefined,
        }),
      },
      content: {
        alignItems: "center",
        gap: 12,
      },
       label: {
         ...typography.body.md,
         color: colors.mutedForeground,
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
             color={defaultColor}
           />
          {label && <Text style={styles.label}>{label}</Text>}
        </View>
      </View>
    );
  }
);

Spinner.displayName = "Spinner";

export default Spinner;
