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
        fontSize: 14,
        fontWeight: "600",
        color: "#1f2937",
        marginBottom: 6,
      },
      selectButton: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: error ? "#ef4444" : "#d1d5db",
        backgroundColor: "#ffffff",
        paddingHorizontal: 12,
        paddingVertical: 12,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        opacity: disabled ? 0.5 : 1,
      },
      selectText: {
        fontSize: 14,
        color: selectedOption || selectedOptions.length > 0 ? "#1f2937" : "#9ca3af",
        flex: 1,
      },
      arrow: {
        fontSize: 12,
        color: "#6b7280",
        marginLeft: 8,
      },
      errorText: {
        fontSize: 12,
        color: "#ef4444",
        marginTop: 4,
        fontWeight: "500",
      },
      modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
      },
      modalContent: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        width: "80%",
        maxHeight: 400,
        paddingVertical: 12,
      },
      optionItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      optionText: {
        fontSize: 14,
        color: "#1f2937",
      },
      checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#d1d5db",
        justifyContent: "center",
        alignItems: "center",
      },
      checkmarkText: {
        fontSize: 12,
        color: "#ffffff",
        fontWeight: "bold",
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
                              ? "#0ea5e9"
                              : "#ffffff",
                            borderColor: (
                              value as (string | number)[]
                            )?.includes(item.value)
                              ? "#0ea5e9"
                              : "#d1d5db",
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
