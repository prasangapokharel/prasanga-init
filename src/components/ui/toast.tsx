import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TouchableOpacity,
} from "react-native";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  /** Toast message */
  message: string;
  /** Toast type */
  type?: ToastType;
  /** Duration in milliseconds (0 = no auto-dismiss) */
  duration?: number;
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Position */
  position?: "top" | "bottom";
}

const Toast = React.forwardRef<View, ToastProps>(
  (
    {
      message,
      type = "info",
      duration = 3000,
      onDismiss,
      containerStyle,
      position = "bottom",
    },
    ref
  ) => {
    const [visible, setVisible] = useState(true);
    const slideAnim = React.useRef(new Animated.Value(-100)).current;

    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      if (duration > 0) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, duration);

        return () => clearTimeout(timer);
      }

      return undefined;
    }, []);

    const handleDismiss = () => {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        onDismiss?.();
      });
    };

    if (!visible) {
      return null;
    }

    const typeStyles: Record<ToastType, { bg: string; text: string }> = {
      success: { bg: "#dcfce7", text: "#166534" },
      error: { bg: "#fee2e2", text: "#991b1b" },
      info: { bg: "#dbeafe", text: "#0369a1" },
      warning: { bg: "#fef3c7", text: "#92400e" },
    };

    const selectedStyle = typeStyles[type];

    const styles = StyleSheet.create({
      animatedContainer: {
        position: "absolute",
        [position === "top" ? "top" : "bottom"]: 20,
        left: 16,
        right: 16,
        zIndex: 9999,
      },
      toast: {
        backgroundColor: selectedStyle.bg,
        borderLeftWidth: 4,
        borderLeftColor: selectedStyle.text,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      },
      message: {
        flex: 1,
        fontSize: 14,
        color: selectedStyle.text,
        fontWeight: "500",
      },
      closeButton: {
        padding: 4,
        marginLeft: 12,
      },
      closeText: {
        fontSize: 18,
        color: selectedStyle.text,
        fontWeight: "bold",
      },
    });

    return (
      <Animated.View
        ref={ref}
        style={[
          styles.animatedContainer,
          {
            transform: [{ translateY: slideAnim }],
          },
          containerStyle,
        ]}
      >
        <View style={styles.toast}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleDismiss}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
);

Toast.displayName = "Toast";

export default Toast;
