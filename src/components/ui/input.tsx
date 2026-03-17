import React from "react";
import {
  TextInput,
  View,
  Text,
  ViewStyle,
  TextInputProps,
  StyleSheet,
} from "react-native";

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
    const sizeStyles: Record<InputSize, number> = {
      sm: 32,
      md: 40,
      lg: 48,
    };

    const textSizeStyles: Record<InputSize, number> = {
      sm: 12,
      md: 14,
      lg: 16,
    };

    const paddingStyles: Record<InputSize, number> = {
      sm: 8,
      md: 12,
      lg: 16,
    };

    const styles = StyleSheet.create({
      container: {
        marginBottom: 12,
      },
      labelText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1f2937",
        marginBottom: 6,
      },
      inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: hasError || error ? "#ef4444" : "#d1d5db",
        backgroundColor: "#ffffff",
        height: sizeStyles[size],
        paddingHorizontal: paddingStyles[size],
        gap: 8,
      },
      input: {
        flex: 1,
        fontSize: textSizeStyles[size],
        color: "#1f2937",
        padding: 0,
        fontFamily: "System",
      },
      errorText: {
        fontSize: 12,
        color: "#ef4444",
        marginTop: 4,
        fontWeight: "500",
      },
      helperText: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 4,
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
            placeholderTextColor="#9ca3af"
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
