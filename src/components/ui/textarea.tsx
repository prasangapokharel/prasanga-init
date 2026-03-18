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
import { typography } from "../../lib/typography";

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
    const { colors } = useTheme();

     const styles = StyleSheet.create({
       container: {
         marginBottom: 12,
       },
       labelText: {
         ...typography.label.md,
         color: colors.foreground,
         marginBottom: 6,
       },
       textareaContainer: {
         borderRadius: 8,
         borderWidth: 1,
         borderColor: hasError || error ? colors.destructive : colors.inputBorder,
         backgroundColor: colors.background,
         minHeight: rows * 24 + 24,
         paddingHorizontal: 12,
         paddingVertical: 12,
       },
       textarea: {
         ...typography.body.md,
         color: colors.foreground,
         textAlignVertical: "top",
         padding: 0,
         fontFamily: "System",
       },
       errorText: {
         ...typography.caption.sm,
         color: colors.destructive,
         marginTop: 4,
       },
       helperText: {
         ...typography.caption.sm,
         color: colors.mutedForeground,
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
             placeholderTextColor={colors.mutedForeground}
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
