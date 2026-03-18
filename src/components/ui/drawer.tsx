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

interface DrawerProps {
  /** Whether drawer is visible (alias for isOpen) */
  visible?: boolean;
  /** Whether drawer is open */
  isOpen?: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Drawer title */
  title?: string;
  /** Drawer content */
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
  /** Drawer position: left or right */
  position?: "left" | "right";
  /** Drawer width */
  width?: number | string;
}

const Drawer = React.forwardRef<View, DrawerProps>(
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
      position = "left",
      width = "75%",
    },
    ref
  ) => {
    const { colors } = useTheme();
    const isDrawerOpen = isOpen ?? visible ?? false;

    const slideAnim = useRef(
      new Animated.Value(
        position === "left" ? -Dimensions.get("window").width : Dimensions.get("window").width
      )
    ).current;

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, { dx }) => Math.abs(dx) > 5,
        onPanResponderMove: (_, { dx }) => {
          if ((position === "left" && dx < 0) || (position === "right" && dx > 0)) {
            slideAnim.setValue(dx);
          }
        },
        onPanResponderRelease: (_, { dx, vx }) => {
          const threshold = Dimensions.get("window").width * 0.3;
          if (Math.abs(dx) > threshold || Math.abs(vx) > 0.5) {
            Animated.timing(slideAnim, {
              toValue: position === "left" ? -Dimensions.get("window").width : Dimensions.get("window").width,
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
      if (isDrawerOpen) {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }).start();
      }
    }, [isDrawerOpen, slideAnim, position]);

    const styles = StyleSheet.create({
      overlay: {
        flex: 1,
        backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        flexDirection: position === "left" ? "row" : "row-reverse",
      },
      container: {
        backgroundColor: colors.card,
        width: typeof width === "string" 
          ? width === "100%" 
            ? "100%"
            : `${parseInt(width)}%` as any
          : width,
        height: "100%",
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRightWidth: position === "left" ? 1 : 0,
        borderLeftWidth: position === "right" ? 1 : 0,
        borderRightColor: position === "left" ? colors.border : "transparent",
        borderLeftColor: position === "right" ? colors.border : "transparent",
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        marginBottom: 16,
      },
      title: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.foreground,
        flex: 1,
      },
      closeButton: {
        padding: 8,
      },
      closeButtonText: {
        fontSize: 24,
        color: colors.foreground,
      },
      content: {
        flex: 1,
      },
    });

    return (
      <Modal
        visible={isDrawerOpen}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeOnOverlayTap ? onClose : undefined}
        >
          <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} />
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.container,
              containerStyle,
              {
                transform: [
                  {
                    translateX: slideAnim,
                  },
                ],
              },
            ]}
            ref={ref}
          >
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
      </Modal>
    );
  }
);

Drawer.displayName = "Drawer";

export default Drawer;
