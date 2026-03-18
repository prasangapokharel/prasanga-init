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
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";
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
  /** Drawer size: sm, md, lg */
  size?: "sm" | "md" | "lg";
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
      overlayOpacity = 0.5,
      closeOnOverlayTap = true,
      position = "left",
      width = "75%",
      size = "md",
    },
    ref
  ) => {
    const { colors } = useTheme();
    const isDrawerOpen = isOpen ?? visible ?? false;
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    // Responsive width based on screen size and size prop
    const getDrawerWidth = () => {
      if (typeof width === "number") return width;
      
      // Device breakpoints
      const isSmallDevice = screenWidth < 480;
      const isMediumDevice = screenWidth >= 480 && screenWidth < 768;
      const isLargeDevice = screenWidth >= 768;
      
      // Responsive max-widths for premium UX
      const sizeMap = {
        sm: isSmallDevice ? Math.min(280, screenWidth * 0.85) : 
            isMediumDevice ? Math.min(320, screenWidth * 0.7) : 
            Math.min(400, screenWidth * 0.5),
        md: isSmallDevice ? Math.min(320, screenWidth * 0.85) : 
            isMediumDevice ? Math.min(380, screenWidth * 0.75) : 
            Math.min(450, screenWidth * 0.55),
        lg: isSmallDevice ? Math.min(360, screenWidth * 0.9) : 
            isMediumDevice ? Math.min(420, screenWidth * 0.8) : 
            Math.min(520, screenWidth * 0.6),
      };
      
      if (typeof width === "string" && width.endsWith("%")) {
        return (parseInt(width) / 100) * screenWidth;
      }
      
      return sizeMap[size];
    };

    const drawerWidth = getDrawerWidth();

    const slideAnim = useRef(
      new Animated.Value(
        position === "left" ? -drawerWidth : drawerWidth
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
          // Adaptive gesture thresholds based on drawer size
          const baseThreshold = drawerWidth * 0.25; // More sensitive (was 0.3)
          const velocityThreshold = 0.4; // More responsive (was 0.5)
          
          if (Math.abs(dx) > baseThreshold || Math.abs(vx) > velocityThreshold) {
            Animated.timing(slideAnim, {
              toValue: position === "left" ? -drawerWidth : drawerWidth,
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
        width: drawerWidth,
        height: "100%",
        borderRightWidth: position === "left" ? 1 : 0,
        borderLeftWidth: position === "right" ? 1 : 0,
        borderRightColor: position === "left" ? colors.border : "transparent",
        borderLeftColor: position === "right" ? colors.border : "transparent",
        shadowColor: colors.foreground,
        shadowOffset: { 
          width: position === "left" ? 4 : -4, 
          height: 0 
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
      },
      safeAreaContainer: {
        flex: 1,
        backgroundColor: colors.card,
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.card,
        gap: 12,
      },
      title: {
        ...typography.heading.sm,
        color: colors.foreground,
        flex: 1,
        letterSpacing: -0.3,
      },
      closeButton: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: colors.muted,
        minWidth: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
      },
      closeButtonText: {
        ...typography.heading.xs,
        color: colors.foreground,
      },
      content: {
        flex: 1,
      },
      contentScroll: {
        padding: 20,
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
            <SafeAreaView style={styles.safeAreaContainer}>
              {(title || showCloseButton) && (
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                  {showCloseButton && (
                    <TouchableOpacity 
                      style={styles.closeButton} 
                      onPress={onClose}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              <ScrollView 
                style={styles.content}
                contentContainerStyle={styles.contentScroll}
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                {children}
              </ScrollView>
            </SafeAreaView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    );
  }
);

Drawer.displayName = "Drawer";

export default Drawer;
