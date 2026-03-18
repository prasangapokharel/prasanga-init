import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../lib/theme-context";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  /** Toast message (alias for message) */
  message?: string;
  /** Toast message (for backward compatibility with visible prop) */
  msg?: string;
  /** Whether toast is visible */
  visible?: boolean;
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
      msg,
      visible: visibleProp,
      type = "info",
      duration = 3000,
      onDismiss,
      containerStyle,
      position = "bottom",
    },
    ref
  ) => {
    const { colors } = useTheme();
    const [visible, setVisible] = useState(visibleProp ?? true);
    const slideAnim = React.useRef(new Animated.Value(-100)).current;

    useEffect(() => {
      setVisible(visibleProp ?? true);
    }, [visibleProp]);

    useEffect(() => {
      if (!visible) return;

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
    }, [visible]);

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

    const toastMessage = message || msg || "Message";

    const typeStyles: Record<
      ToastType,
      { bg: string; text: string; indicator: string }
    > = {
      success: {
        bg: colors.successLight,
        text: colors.success,
        indicator: colors.success,
      },
      error: {
        bg: colors.destructiveLight,
        text: colors.destructive,
        indicator: colors.destructive,
      },
      info: {
        bg: colors.primaryLight,
        text: colors.primary,
        indicator: colors.primary,
      },
      warning: {
        bg: colors.warningLight,
        text: colors.warning,
        indicator: colors.warning,
      },
    };

    const typeStyle = typeStyles[type];

    const styles = StyleSheet.create({
      container: {
        position: "absolute",
        [position]: 20,
        left: 16,
        right: 16,
        backgroundColor: typeStyle.bg,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: typeStyle.indicator,
        paddingHorizontal: 14,
        paddingVertical: 12,
        shadowColor: typeStyle.indicator,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        zIndex: 999,
      },
      content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      messageContainer: {
        flex: 1,
      },
      message: {
        fontSize: 13,
        fontWeight: "500",
        color: typeStyle.text,
        lineHeight: 19,
      },
      closeButton: {
        padding: 6,
        marginLeft: 12,
      },
      closeIcon: {
        fontSize: 16,
        color: typeStyle.indicator,
        fontWeight: "600",
      },
    });

    return (
      <Animated.View
        ref={ref}
        style={[
          styles.container,
          containerStyle,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.messageContainer}>
            <Text style={styles.message} numberOfLines={2}>
              {toastMessage}
            </Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={handleDismiss}>
            <Text style={styles.closeIcon}>×</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
);

Toast.displayName = "Toast";

export default Toast;
