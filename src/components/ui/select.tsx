import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
  StyleSheet,
  Modal,
  FlatList,
  TextStyle,
} from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps {
  /** Selected value(s) */
  value?: string | number | (string | number)[];
  /** Options to choose from */
  options: SelectOption[];
  /** Callback when option is selected */
  onValueChange?: (value: string | number | (string | number)[]) => void;
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Multi-select mode */
  multiple?: boolean;
  /** Error message */
  error?: string;
}

const Select = React.forwardRef<View, SelectProps>(
  (
    {
      value,
      options,
      onValueChange,
      label,
      placeholder = "Select an option",
      disabled = false,
      containerStyle,
      multiple = false,
      error,
    },
    ref
  ) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    const selectedOption = options.find((opt) => opt.value === value);
    const selectedOptions = Array.isArray(value)
      ? options.filter((opt) => (value as (string | number)[]).includes(opt.value))
      : [];

    const displayText = multiple
      ? selectedOptions.map((opt) => opt.label).join(", ") || placeholder
      : selectedOption?.label || placeholder;

    const handleSelect = (optionValue: string | number) => {
      if (multiple) {
        const newValue = Array.isArray(value) ? [...value] : [];
        if (newValue.includes(optionValue)) {
          newValue.splice(newValue.indexOf(optionValue), 1);
        } else {
          newValue.push(optionValue);
        }
        onValueChange?.(newValue);
      } else {
        onValueChange?.(optionValue);
        setModalVisible(false);
      }
    };

     const styles = StyleSheet.create({
       container: {
         marginBottom: 12,
       },
       labelText: {
         ...typography.label.md,
         color: colors.foreground,
         marginBottom: 6,
       },
       selectButton: {
         borderRadius: 8,
         borderWidth: 1,
         borderColor: error ? colors.destructive : colors.inputBorder,
         backgroundColor: colors.background,
         paddingHorizontal: 12,
         paddingVertical: 12,
         justifyContent: "space-between",
         flexDirection: "row",
         alignItems: "center",
         opacity: disabled ? 0.5 : 1,
       },
       selectText: {
         ...typography.body.md,
         color: selectedOption || selectedOptions.length > 0 ? colors.foreground : colors.mutedForeground,
         flex: 1,
       },
       arrow: {
         ...typography.caption.md,
         color: colors.mutedForeground,
         marginLeft: 8,
       },
       errorText: {
         ...typography.caption.sm,
         color: colors.destructive,
         marginTop: 4,
       },
       modalOverlay: {
         flex: 1,
         backgroundColor: "rgba(0, 0, 0, 0.5)",
         justifyContent: "center",
         alignItems: "center",
       },
       modalContent: {
         backgroundColor: colors.background,
         borderRadius: 12,
         width: "80%",
         maxHeight: 400,
         paddingVertical: 12,
       },
       optionItem: {
         paddingHorizontal: 16,
         paddingVertical: 12,
         borderBottomWidth: 1,
         borderBottomColor: colors.muted,
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "space-between",
       },
       optionText: {
         ...typography.body.md,
         color: colors.foreground,
       },
       checkbox: {
         width: 20,
         height: 20,
         borderRadius: 4,
         borderWidth: 2,
         borderColor: colors.inputBorder,
         justifyContent: "center",
         alignItems: "center",
       },
       checkmarkText: {
         ...typography.tiny.md,
         color: colors.primaryForeground,
       },
     });

    return (
      <View ref={ref} style={[styles.container, containerStyle]}>
        {label && <Text style={styles.labelText}>{label}</Text>}
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => !disabled && setModalVisible(true)}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Text style={styles.selectText}>{displayText}</Text>
          <Text style={styles.arrow}>▼</Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={styles.modalContent}
              onPress={(e) => e.stopPropagation()}
            >
              <FlatList
                data={options}
                keyExtractor={(item) => String(item.value)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => handleSelect(item.value)}
                  >
                    <Text style={styles.optionText}>{item.label}</Text>
                    {multiple && (
                       <View
                         style={[
                           styles.checkbox,
                           {
                             backgroundColor: (
                               value as (string | number)[]
                             )?.includes(item.value)
                               ? colors.primary
                               : colors.background,
                             borderColor: (
                               value as (string | number)[]
                             )?.includes(item.value)
                               ? colors.primary
                               : colors.inputBorder,
                           },
                         ]}
                       >
                        {(value as (string | number)[])?.includes(
                          item.value
                        ) && (
                          <Text style={styles.checkmarkText}>✓</Text>
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                )}
                scrollEnabled
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
);

Select.displayName = "Select";

export default Select;
