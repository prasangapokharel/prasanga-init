import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Modal,
  Dimensions,
  LayoutChangeEvent,
} from "react-native";

interface PopoverProps {
  /** Whether popover is visible */
  visible: boolean;
  /** Callback when popover should close */
  onClose: () => void;
  /** Popover title */
  title?: string;
  /** Popover content */
  children?: React.ReactNode;
  /** Trigger element or button */
  trigger?: React.ReactNode;
  /** On trigger press callback */
  onTriggerPress?: () => void;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Position relative to trigger: top, bottom, left, right */
  position?: "top" | "bottom" | "left" | "right";
  /** Arrow/triangle pointing to trigger */
  showArrow?: boolean;
  /** Overlay opacity (0-1) */
  overlayOpacity?: number;
  /** Whether to close on overlay tap */
  closeOnOverlayTap?: boolean;
}

interface TriggerLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Popover = React.forwardRef<View, PopoverProps>(
  (
    {
      visible,
      onClose,
      title,
      children,
      trigger,
      onTriggerPress,
      containerStyle,
      position = "bottom",
      showArrow = true,
      overlayOpacity = 0.3,
      closeOnOverlayTap = true,
    },
    ref
  ) => {
    const [triggerLayout, setTriggerLayout] = useState<TriggerLayout | null>(null);
    const triggerRef = useRef<View>(null);

    const handleTriggerLayout = (event: LayoutChangeEvent) => {
      triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setTriggerLayout({ x: pageX, y: pageY, width, height });
      });
    };

    const getPopoverPosition = () => {
      if (!triggerLayout) return {};

      const { x, y, width, height } = triggerLayout;
      const windowHeight = Dimensions.get("window").height;
      const windowWidth = Dimensions.get("window").width;
      const popoverWidth = 250;
      const popoverHeight = 150;
      const spacing = 12;
      const arrowSize = 8;

      const positionStyles: Record<string, ViewStyle> = {
        top: {
          top: y - popoverHeight - spacing - arrowSize,
          left: Math.max(8, Math.min(x + width / 2 - popoverWidth / 2, windowWidth - popoverWidth - 8)),
        },
        bottom: {
          top: y + height + spacing + arrowSize,
          left: Math.max(8, Math.min(x + width / 2 - popoverWidth / 2, windowWidth - popoverWidth - 8)),
        },
        left: {
          left: x - popoverWidth - spacing - arrowSize,
          top: Math.max(8, Math.min(y + height / 2 - popoverHeight / 2, windowHeight - popoverHeight - 8)),
        },
        right: {
          left: x + width + spacing + arrowSize,
          top: Math.max(8, Math.min(y + height / 2 - popoverHeight / 2, windowHeight - popoverHeight - 8)),
        },
      };

      return positionStyles[position] || positionStyles.bottom;
    };

    const styles = StyleSheet.create({
      triggerContainer: {
        alignSelf: "flex-start",
      },
      overlay: {
        flex: 1,
        backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
      },
      popover: {
        position: "absolute",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 16,
        width: 250,
        maxHeight: 250,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        ...getPopoverPosition(),
      } as ViewStyle,
      arrow: {
        position: "absolute",
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "#ffffff",
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 8,
      } as ViewStyle,
      arrowTop: {
        bottom: -8,
        alignSelf: "center",
      } as ViewStyle,
      arrowBottom: {
        top: -8,
        alignSelf: "center",
      } as ViewStyle,
      title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1f2937",
        marginBottom: 8,
        letterSpacing: 0.3,
      } as TextStyle,
      content: {
        fontSize: 14,
        color: "#6b7280",
        lineHeight: 20,
      } as TextStyle,
    });

    return (
      <>
        <View
          ref={triggerRef}
          style={styles.triggerContainer}
          onLayout={handleTriggerLayout}
        >
          <TouchableOpacity
            onPress={() => {
              onTriggerPress?.();
            }}
          >
            {trigger}
          </TouchableOpacity>
        </View>

        <Modal
          visible={visible && !!triggerLayout}
          transparent
          animationType="fade"
          onRequestClose={onClose}
        >
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={closeOnOverlayTap ? onClose : undefined}
          >
            <View
              ref={ref}
              style={[styles.popover, containerStyle]}
            >
              {showArrow && (
                <View
                  style={[
                    styles.arrow,
                    position === "bottom" ? styles.arrowBottom : styles.arrowTop,
                  ]}
                />
              )}
              {title && <Text style={styles.title}>{title}</Text>}
              {children && <Text style={styles.content}>{children}</Text>}
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    );
  }
);

Popover.displayName = "Popover";

export default Popover;
