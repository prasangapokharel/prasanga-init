import React from "react";
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  Image as RNImage,
  ImageSourcePropType,
} from "react-native";
import { useTheme } from "../../lib/theme-context";

interface AvatarProps {
  /** Source for the image */
  source?: ImageSourcePropType;
  /** Avatar size */
  size?: number;
  /** Fallback initials */
  initials?: string;
  /** Background color for initials */
  backgroundColor?: string;
  /** Text color for initials */
  textColor?: string;
  /** Custom style */
  style?: ViewStyle;
}

const Avatar = React.forwardRef<View, AvatarProps>(
  (
    {
      source,
      size = 40,
      initials = "A",
      backgroundColor,
      textColor,
      style,
    },
    ref
  ) => {
    const { colors } = useTheme();
    
    const defaultBgColor = backgroundColor || colors.primary;
    const defaultTextColor = textColor || colors.primaryForeground;

    const styles = StyleSheet.create({
      avatar: {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: defaultBgColor,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      },
      image: {
        width: size,
        height: size,
        borderRadius: size / 2,
      },
      initials: {
        fontSize: size * 0.4,
        fontWeight: "700",
        color: defaultTextColor,
      },
    });

    return (
      <View ref={ref} style={[styles.avatar, style]}>
        {source ? (
          <RNImage source={source} style={styles.image} />
        ) : (
          <Text style={styles.initials}>{initials}</Text>
        )}
      </View>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;
