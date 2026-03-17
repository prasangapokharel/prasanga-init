import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Whether to show shadow */
  shadow?: boolean;
  /** Card padding */
  padding?: number;
  /** Border radius */
  rounded?: number;
  /** Container style override */
  style?: ViewStyle;
  /** Background color */
  backgroundColor?: string;
  /** Border color */
  borderColor?: string;
  /** Shadow intensity: subtle, medium, premium */
  shadowIntensity?: "subtle" | "medium" | "premium";
}

const Card = React.forwardRef<View, CardProps>(
  (
    {
      children,
      shadow = true,
      padding = 16,
      rounded = 12,
      style,
      backgroundColor = "#ffffff",
      borderColor = "#e8e8e8",
      shadowIntensity = "medium",
    },
    ref
  ) => {
    // Shadow configurations for different intensities
    const shadowConfigs = {
      subtle: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
      },
      medium: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
      },
      premium: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.10,
        shadowRadius: 16,
        elevation: 4,
      },
    };

    const styles = StyleSheet.create({
      card: {
        backgroundColor: backgroundColor,
        borderRadius: rounded,
        padding: padding,
        borderWidth: 1,
        borderColor: borderColor,
        ...(shadow && shadowConfigs[shadowIntensity]),
      },
    });

    return (
      <View ref={ref} style={[styles.card, style]}>
        {children}
      </View>
    );
  }
);

Card.displayName = "Card";

export default Card;
