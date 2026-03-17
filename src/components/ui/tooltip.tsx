import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
} from "react-native";

interface TooltipProps {
  /** Tooltip text */
  text: string;
  /** Children component */
  children: React.ReactNode;
  /** Position */
  position?: "top" | "bottom" | "left" | "right";
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Container style */
  containerStyle?: ViewStyle;
}

const Tooltip = React.forwardRef<View, TooltipProps>(
  (
    {
      text,
      children,
      position = "top",
      backgroundColor = "#1f2937",
      textColor = "#ffffff",
      containerStyle,
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);

    const styles = StyleSheet.create({
      container: {
        position: "relative",
      },
      tooltip: {
        backgroundColor: backgroundColor,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        marginBottom: position === "bottom" ? -40 : position === "top" ? 8 : 0,
        marginTop: position === "bottom" ? 8 : 0,
        marginRight: position === "left" ? 8 : 0,
        marginLeft: position === "right" ? 8 : 0,
        zIndex: 1000,
      },
      tooltipText: {
        fontSize: 12,
        color: textColor,
        fontWeight: "500",
        textAlign: "center",
      },
      arrow: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 6,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: backgroundColor,
        alignSelf: "center",
        marginTop: position === "top" ? -2 : 0,
        marginBottom: position === "bottom" ? 0 : 0,
      },
    });

    return (
      <TouchableOpacity
        ref={ref}
        style={[styles.container, containerStyle]}
        onPress={() => setVisible(!visible)}
        onLongPress={() => setVisible(true)}
        delayLongPress={200}
      >
        {visible && (
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>{text}</Text>
            {(position === "top" || position === "bottom") && (
              <View style={styles.arrow} />
            )}
          </View>
        )}
        {children}
      </TouchableOpacity>
    );
  }
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
