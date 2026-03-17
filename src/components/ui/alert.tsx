import React from "react";
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  /** Alert title */
  title: string;
  /** Alert message */
  message?: string;
  /** Alert type */
  type?: AlertType;
  /** Callback to close alert */
  onClose?: () => void;
  /** Show close button */
  showCloseButton?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
}

const Alert = React.forwardRef<View, AlertProps>(
  (
    {
      title,
      message,
      type = "info",
      onClose,
      showCloseButton = true,
      containerStyle,
    },
    ref
  ) => {
    const typeStyles: Record<AlertType, { bg: string; border: string; text: string; icon: string }> = {
      success: {
        bg: "#dcfce7",
        border: "#22c55e",
        text: "#166534",
        icon: "✓",
      },
      error: {
        bg: "#fee2e2",
        border: "#ef4444",
        text: "#991b1b",
        icon: "✕",
      },
      warning: {
        bg: "#fef3c7",
        border: "#eab308",
        text: "#92400e",
        icon: "!",
      },
      info: {
        bg: "#dbeafe",
        border: "#0ea5e9",
        text: "#0369a1",
        icon: "ⓘ",
      },
    };

    const selectedType = typeStyles[type];

    const styles = StyleSheet.create({
      alert: {
        backgroundColor: selectedType.bg,
        borderLeftWidth: 4,
        borderLeftColor: selectedType.border,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
      },
      content: {
        flex: 1,
        marginRight: 12,
      },
      icon: {
        fontSize: 18,
        color: selectedType.text,
        fontWeight: "bold",
        marginRight: 12,
      },
      title: {
        fontSize: 14,
        fontWeight: "600",
        color: selectedType.text,
        marginBottom: message ? 4 : 0,
      },
      message: {
        fontSize: 13,
        color: selectedType.text,
        lineHeight: 19,
      },
      closeButton: {
        padding: 4,
      },
      closeText: {
        fontSize: 18,
        color: selectedType.text,
        fontWeight: "bold",
      },
    });

    return (
      <View ref={ref} style={[styles.alert, containerStyle]}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={styles.icon}>{selectedType.icon}</Text>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            {message && <Text style={styles.message}>{message}</Text>}
          </View>
        </View>
        {showCloseButton && (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

Alert.displayName = "Alert";

export default Alert;
