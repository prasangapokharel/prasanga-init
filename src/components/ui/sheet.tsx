import React, { useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { useTheme } from "../../lib/theme-context";
import Button from "./button";

interface SheetProps {
  /** Whether sheet is visible (alias for isOpen) */
  visible?: boolean;
  /** Whether sheet is open */
  isOpen?: boolean;
  /** Callback when sheet should close */
  onClose: () => void;
  /** Sheet title */
  title?: string;
  /** Sheet content */
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
  /** Maximum height of sheet (0-1 for percentage, or pixels) */
  maxHeight?: number | string;
}

const Sheet = React.forwardRef<View, SheetProps>(
  (
    {
      visible,
      isOpen,
      onClose,
      title,
      children,
      closeButtonText = "Close",
      showCloseButton = true,
      containerStyle,
      overlayOpacity = 0.4,
      closeOnOverlayTap = true,
      maxHeight = 0.75,
    },
    ref
  ) => {
    const { colors } = useTheme();
    const isSheetOpen = isOpen ?? visible ?? false;

    const slideAnim = useRef(new Animated.Value(Dimensions.get("window").height)).current;
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 5,
        onPanResponderMove: (_, { dy }) => {
          if (dy > 0) {
            slideAnim.setValue(dy);
          }
        },
        onPanResponderRelease: (_, { dy, vy }) => {
          if (dy > 100 || vy > 0.5) {
            Animated.timing(slideAnim, {
              toValue: Dimensions.get("window").height,
              duration: 300,
              useNativeDriver: false,
            }).start(() => onClose());
          } else {
            Animated.timing(slideAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false,
            }).start();
          }
        },
      })
    ).current;

    useEffect(() => {
      if (isSheetOpen) {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }).start();
      }
    }, [isSheetOpen, slideAnim]);

    const styles = StyleSheet.create({
      overlay: {
        flex: 1,
        backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        justifyContent: "flex-end",
      },
      container: {
        backgroundColor: colors.card,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        maxHeight: typeof maxHeight === "number" 
          ? (maxHeight > 1 
              ? maxHeight 
              : Dimensions.get("window").height * maxHeight) as any
          : maxHeight as any,
        borderTopWidth: 1,
        borderTopColor: colors.border,
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      },
      title: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.foreground,
        flex: 1,
      },
      content: {
        flex: 1,
        paddingVertical: 16,
      },
      closeButton: {
        padding: 8,
      },
      closeButtonText: {
        fontSize: 24,
        color: colors.foreground,
      },
      dragHandle: {
        width: 40,
        height: 4,
        backgroundColor: colors.border,
        borderRadius: 2,
        alignSelf: "center",
        marginBottom: 8,
      },
    });

    return (
      <Modal
        visible={isSheetOpen}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeOnOverlayTap ? onClose : undefined}
        >
          <TouchableOpacity activeOpacity={1}>
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.container,
                containerStyle,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
              ref={ref}
            >
              <View style={styles.dragHandle} />

              {(title || showCloseButton) && (
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                  {showCloseButton && (
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                      <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              <View style={styles.content}>{children}</View>
            </Animated.View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }
);

Sheet.displayName = "Sheet";

export default Sheet;
