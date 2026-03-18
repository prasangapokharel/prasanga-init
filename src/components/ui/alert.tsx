import React from "react";
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../lib/theme-context";

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
    const { colors } = useTheme();

    const typeStyles: Record<
      AlertType,
      { bg: string; accent: string; text: string; border: string }
    > = {
      success: {
        bg: colors.successLight,
        accent: colors.success,
        text: colors.foreground,
        border: colors.success + "30",
      },
      error: {
        bg: colors.destructiveLight,
        accent: colors.destructive,
        text: colors.foreground,
        border: colors.destructive + "30",
      },
      warning: {
        bg: colors.warningLight,
        accent: colors.warning,
        text: colors.foreground,
        border: colors.warning + "30",
      },
      info: {
        bg: colors.primaryLight,
        accent: colors.primary,
        text: colors.foreground,
        border: colors.primary + "30",
      },
    };

    const selectedType = typeStyles[type];

    const styles = StyleSheet.create({
      alert: {
        backgroundColor: selectedType.bg,
        borderLeftWidth: 3,
        borderLeftColor: selectedType.accent,
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        shadowColor: selectedType.accent,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
        borderWidth: 1,
        borderColor: selectedType.border,
      },
      indicator: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: selectedType.accent,
        marginRight: 10,
        marginTop: 7,
      },
      content: {
        flex: 1,
        marginRight: 12,
      },
      title: {
        fontSize: 14,
        fontWeight: "600",
        color: selectedType.text,
        marginBottom: message ? 4 : 0,
        lineHeight: 20,
      },
      message: {
        fontSize: 13,
        color: selectedType.text,
        lineHeight: 18,
        opacity: 0.85,
      },
      closeButton: {
        padding: 4,
        marginTop: -2,
      },
      closeText: {
        fontSize: 16,
        color: selectedType.accent,
        fontWeight: "600",
      },
    });

    return (
      <View ref={ref} style={[styles.alert, containerStyle]}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={styles.indicator} />
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            {message && <Text style={styles.message}>{message}</Text>}
          </View>
        </View>
        {showCloseButton && (
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

Alert.displayName = "Alert";

export default Alert;
