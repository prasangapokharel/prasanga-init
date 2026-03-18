import React from "react";
import {
  View,
  ViewStyle,
  StyleSheet,
  Image as RNImage,
  ImageSourcePropType,
} from "react-native";
import { useTheme } from "../../lib/theme-context";

interface ImageProps {
  /** Image source */
  source: ImageSourcePropType;
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
  /** Aspect ratio */
  aspectRatio?: number;
  /** Border radius */
  borderRadius?: number;
  /** Fit type */
  resizeMode?: "cover" | "contain" | "stretch" | "center";
  /** Custom style */
  style?: ViewStyle;
}

const Image = React.forwardRef<View, ImageProps>(
  (
    {
      source,
      width = 200,
      height = 200,
      aspectRatio,
      borderRadius = 0,
      resizeMode = "cover",
      style,
    },
    ref
  ) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
      container: {
        width: width,
        height: aspectRatio ? undefined : height,
        aspectRatio: aspectRatio,
        borderRadius: borderRadius,
        overflow: "hidden",
        backgroundColor: colors.muted,
        justifyContent: "center",
        alignItems: "center",
      },
      image: {
        width: "100%" as any,
        height: "100%" as any,
      },
    });

    return (
      <View ref={ref} style={[styles.container, style]}>
        <RNImage
          source={source}
          style={styles.image}
          resizeMode={resizeMode}
        />
      </View>
    );
  }
);

Image.displayName = "Image";

export default Image;
