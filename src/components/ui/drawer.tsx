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
import Button from "./button";

interface DrawerProps {
  /** Whether drawer is visible */
  visible: boolean;
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
          const threshold = Dimensions.get("window").width * 0.2;
          const shouldClose =
            (position === "left" && (dx < -threshold || vx < -0.5)) ||
            (position === "right" && (dx > threshold || vx > 0.5));

          if (shouldClose) {
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
      if (visible) {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }).start();
      }
    }, [visible, slideAnim, position]);

    const styles = StyleSheet.create({
      overlay: {
        flex: 1,
        backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        justifyContent: position === "left" ? "flex-start" : "flex-end",
      },
      container: {
        backgroundColor: "#ffffff",
        paddingVertical: 20,
        paddingHorizontal: 16,
        width: typeof width === "string" 
          ? width 
          : width,
        height: "100%",
        shadowColor: "#000",
        shadowOffset: { width: position === "left" ? 4 : -4, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
      } as ViewStyle,
      title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1f2937",
        marginBottom: 16,
        letterSpacing: 0.3,
      },
      content: {
        marginBottom: 20,
        lineHeight: 24,
      },
      buttonContainer: {
        gap: 12,
        marginTop: 16,
      },
    });

    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={onClose}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeOnOverlayTap ? onClose : undefined}
        >
          <Animated.View
            ref={ref}
            style={[
              styles.container,
              containerStyle,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
            {...panResponder.panHandlers}
          >
            {title && <Text style={styles.title}>{title}</Text>}
            {children && <View style={styles.content}>{children}</View>}
            {showCloseButton && (
              <View style={styles.buttonContainer}>
                <Button variant="outline" onPress={onClose} fullWidth>
                  {closeButtonText}
                </Button>
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    );
  }
);

Drawer.displayName = "Drawer";

export default Drawer;
