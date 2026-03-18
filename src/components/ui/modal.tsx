import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import Button from "./button";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";

interface ModalComponentProps {
  /** Whether modal is visible */
  visible: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children?: React.ReactNode;
  /** Custom close button text */
  closeButtonText?: string;
  /** Show close button */
  showCloseButton?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Overlay opacity (0-1) */
  overlayOpacity?: number;
  /** Whether to close on overlay tap */
  closeOnOverlayTap?: boolean;
}

const ModalComponent = React.forwardRef<View, ModalComponentProps>(
  (
    {
      visible,
      onClose,
      title,
      children,
      closeButtonText = "Close",
      showCloseButton = true,
      containerStyle,
      overlayOpacity = 0.5,
      closeOnOverlayTap = true,
    },
    ref
  ) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
      overlay: {
        flex: 1,
        backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        justifyContent: "center",
        alignItems: "center",
      },
      container: {
        backgroundColor: colors.background,
        borderRadius: 12,
        padding: 24,
        width: "85%",
        maxWidth: 400,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 12,
      },
      title: {
        ...typography.heading.xs,
        color: colors.foreground,
        marginBottom: 16,
        letterSpacing: 0.3,
      },
      content: {
        marginBottom: 20,
        lineHeight: 24,
      },
      buttonContainer: {
        flexDirection: "row",
        gap: 12,
        marginTop: 16,
      },
    });

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeOnOverlayTap ? onClose : undefined}
        >
          <TouchableOpacity
            ref={ref}
            activeOpacity={1}
            style={[styles.container, containerStyle]}
          >
            {title && <Text style={styles.title}>{title}</Text>}
            {children && <View style={styles.content}>{children}</View>}
            {showCloseButton && (
              <View style={styles.buttonContainer}>
                <Button
                  variant="outline"
                  onPress={onClose}
                  fullWidth
                >
                  {closeButtonText}
                </Button>
              </View>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }
);

ModalComponent.displayName = "Modal";

export default ModalComponent;
