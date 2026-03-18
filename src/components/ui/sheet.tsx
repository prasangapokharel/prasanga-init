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

interface SheetProps {
  /** Whether sheet is visible */
  visible: boolean;
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
      if (visible) {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }).start();
      }
    }, [visible, slideAnim]);

    const styles = StyleSheet.create({
      overlay: {
        flex: 1,
        backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        justifyContent: "flex-end",
      },
      container: {
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        maxHeight: typeof maxHeight === "string" 
          ? parseInt(maxHeight) 
          : maxHeight > 1 
          ? maxHeight 
          : Dimensions.get("window").height * maxHeight,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
      } as ViewStyle,
      handle: {
        width: 40,
        height: 4,
        backgroundColor: "#e5e7eb",
        borderRadius: 2,
        alignSelf: "center",
        marginBottom: 16,
      },
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
        flexDirection: "row",
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
                transform: [{ translateY: slideAnim }],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <View style={styles.handle} />
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

Sheet.displayName = "Sheet";

export default Sheet;
