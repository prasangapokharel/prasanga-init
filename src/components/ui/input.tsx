import React from "react";
import {
  TextInput,
  View,
  Text,
  ViewStyle,
  TextInputProps,
  StyleSheet,
} from "react-native";
import { useTheme } from "../../lib/theme-context";

export type InputSize = "sm" | "md" | "lg";

interface InputComponentProps extends TextInputProps {
  /** Input size */
  size?: InputSize;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Left element/icon */
  leftElement?: React.ReactNode;
  /** Right element/icon */
  rightElement?: React.ReactNode;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Whether input has error state */
  hasError?: boolean;
  /** Placeholder text */
  placeholder?: string;
}

const Input = React.forwardRef<TextInput, InputComponentProps>(
  (
    {
      size = "md",
      label,
      error,
      helperText,
      leftElement,
      rightElement,
      containerStyle,
      hasError = false,
      placeholder = "",
      ...props
    },
    ref
  ) => {
    const { colors } = useTheme();
    const [isFocused, setIsFocused] = React.useState(false);

    const sizeStyles: Record<InputSize, number> = {
      sm: 36,
      md: 44,
      lg: 52,
    };

    const textSizeStyles: Record<InputSize, number> = {
      sm: 13,
      md: 15,
      lg: 16,
    };

    const paddingStyles: Record<InputSize, number> = {
      sm: 10,
      md: 12,
      lg: 14,
    };

    const getBorderColor = () => {
      if (hasError || error) return colors.destructive;
      if (isFocused) return colors.primary;
      return colors.inputBorder;
    };

    const getBackgroundColor = () => {
      if (isFocused) return colors.primaryLight;
      if (hasError || error) return colors.destructiveLight;
      return colors.background;
    };

    const styles = StyleSheet.create({
      container: {
        marginBottom: 12,
      },
      labelText: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.foreground,
        marginBottom: 8,
        letterSpacing: 0.3,
      },
      inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: getBorderColor(),
        backgroundColor: getBackgroundColor(),
        height: sizeStyles[size],
        paddingHorizontal: paddingStyles[size],
        gap: 8,
        shadowColor: isFocused ? colors.primary : hasError ? colors.destructive : "transparent",
        shadowOffset: { width: 0, height: isFocused ? 4 : 2 },
        shadowOpacity: isFocused ? 0.12 : hasError ? 0.08 : 0,
        shadowRadius: isFocused ? 8 : 4,
        elevation: isFocused ? 3 : hasError ? 2 : 0,
      },
      input: {
        flex: 1,
        fontSize: textSizeStyles[size],
        color: colors.foreground,
        padding: 0,
        fontFamily: "System",
      },
      errorText: {
        fontSize: 12,
        color: colors.destructive,
        marginTop: 6,
        fontWeight: "500",
        letterSpacing: 0.2,
      },
      helperText: {
        fontSize: 12,
        color: colors.mutedForeground,
        marginTop: 6,
        letterSpacing: 0.2,
      },
      leftElement: {
        marginRight: 4,
      },
      rightElement: {
        marginLeft: 4,
      },
    });

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.labelText}>{label}</Text>}
        <View style={styles.inputContainer}>
          {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
          <TextInput
             ref={ref}
             style={styles.input}
             placeholder={placeholder}
             placeholderTextColor={colors.mutedForeground}
             onFocus={() => setIsFocused(true)}
             onBlur={() => setIsFocused(false)}
             {...props}
           />
          {rightElement && (
            <View style={styles.rightElement}>{rightElement}</View>
          )}
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!error && helperText && (
          <Text style={styles.helperText}>{helperText}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

export default Input;
