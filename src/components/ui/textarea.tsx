import React from "react";
import {
  TextInput,
  View,
  Text,
  ViewStyle,
  TextInputProps,
  StyleSheet,
} from "react-native";

interface TextareaProps extends TextInputProps {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Number of lines */
  rows?: number;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Placeholder text */
  placeholder?: string;
  /** Has error state */
  hasError?: boolean;
}

const Textarea = React.forwardRef<TextInput, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      rows = 4,
      containerStyle,
      hasError = false,
      placeholder = "",
      ...props
    },
    ref
  ) => {
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
      textareaContainer: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: hasError || error ? "#ef4444" : "#d1d5db",
        backgroundColor: "#ffffff",
        minHeight: rows * 24 + 24,
        paddingHorizontal: 12,
        paddingVertical: 12,
      },
      textarea: {
        fontSize: 14,
        color: "#1f2937",
        textAlignVertical: "top",
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
    });

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.labelText}>{label}</Text>}
        <View style={styles.textareaContainer}>
          <TextInput
            ref={ref}
            style={styles.textarea}
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={rows}
            {...props}
          />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!error && helperText && (
          <Text style={styles.helperText}>{helperText}</Text>
        )}
      </View>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
