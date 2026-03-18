import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ScrollView,
  Modal,
} from "react-native";
import Button from "./button";

interface DatePickerProps {
  /** Selected date */
  value?: Date;
  /** Callback when date is selected */
  onChange: (date: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Show time picker */
  showTime?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Modal visible state */
  visible: boolean;
  /** Callback when modal closes */
  onClose: () => void;
  /** Display format */
  displayFormat?: string;
  /** Locale */
  locale?: string;
}

const DatePicker = React.forwardRef<View, DatePickerProps>(
  (
    {
      value = new Date(),
      onChange,
      minDate,
      maxDate,
      showTime = false,
      containerStyle,
      visible,
      onClose,
      displayFormat = "MMM DD, YYYY",
      locale = "en-US",
    },
    ref
  ) => {
    const [selectedDate, setSelectedDate] = useState(value);
    const [selectedHour, setSelectedHour] = useState(value.getHours());
    const [selectedMinute, setSelectedMinute] = useState(value.getMinutes());

    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();

    const daysInMonth = useMemo(() => {
      return new Date(currentYear, currentMonth + 1, 0).getDate();
    }, [currentMonth, currentYear]);

    const firstDayOfMonth = useMemo(() => {
      return new Date(currentYear, currentMonth, 1).getDay();
    }, [currentMonth, currentYear]);

    const calendarDays = useMemo(() => {
      const days: (number | null)[] = [];
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
      }
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
      }
      return days;
    }, [daysInMonth, firstDayOfMonth]);

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    const handleDayPress = (day: number) => {
      const newDate = new Date(currentYear, currentMonth, day);
      newDate.setHours(selectedHour, selectedMinute, 0, 0);
      setSelectedDate(newDate);
    };

    const handlePreviousMonth = () => {
      setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
      setSelectedDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const handleConfirm = () => {
      onChange(selectedDate);
      onClose();
    };

    const isDateDisabled = (day: number) => {
      const date = new Date(currentYear, currentMonth, day);
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };

    const isDateSelected = (day: number) => {
      return (
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear
      );
    };

    const styles = StyleSheet.create({
      overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
      },
      container: {
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
      } as ViewStyle,
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      },
      title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1f2937",
        letterSpacing: 0.3,
      } as TextStyle,
      monthYear: {
        fontSize: 16,
        fontWeight: "600",
        color: "#4b5563",
        marginBottom: 16,
        textAlign: "center",
      } as TextStyle,
      navigationButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: "#f3f4f6",
      } as ViewStyle,
      navigationText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1f2937",
      } as TextStyle,
      weekdayContainer: {
        flexDirection: "row",
        marginBottom: 12,
      },
      weekday: {
        flex: 1,
        textAlign: "center",
        fontSize: 12,
        fontWeight: "600",
        color: "#9ca3af",
        paddingVertical: 8,
      } as TextStyle,
      calendarRow: {
        flexDirection: "row",
        marginBottom: 8,
      },
      dayButton: {
        flex: 1,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#ffffff",
      } as ViewStyle,
      dayButtonSelected: {
        backgroundColor: "#3b82f6",
      } as ViewStyle,
      dayButtonDisabled: {
        opacity: 0.3,
      } as ViewStyle,
      dayText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1f2937",
      } as TextStyle,
      dayTextSelected: {
        color: "#ffffff",
        fontWeight: "700",
      } as TextStyle,
      timeContainer: {
        flexDirection: "row",
        gap: 16,
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
      },
      timeInputContainer: {
        flex: 1,
      },
      timeLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#9ca3af",
        marginBottom: 8,
        textAlign: "center",
      } as TextStyle,
      timeScrollView: {
        height: 150,
      },
      timeOption: {
        paddingVertical: 12,
        alignItems: "center",
      } as ViewStyle,
      timeText: {
        fontSize: 14,
        color: "#6b7280",
      } as TextStyle,
      timeTextSelected: {
        fontSize: 16,
        fontWeight: "700",
        color: "#3b82f6",
      } as TextStyle,
      buttonContainer: {
        flexDirection: "row",
        gap: 12,
        marginTop: 20,
      },
    });

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.container, containerStyle]}
            ref={ref}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Select Date</Text>
            </View>

            <Text style={styles.monthYear}>
              {monthNames[currentMonth]} {currentYear}
            </Text>

            <View style={styles.weekdayContainer}>
              {weekdays.map((day) => (
                <Text key={day} style={styles.weekday}>
                  {day}
                </Text>
              ))}
            </View>

            {calendarDays.reduce((rows: (number | null)[][], day, index) => {
              if (index % 7 === 0) rows.push([]);
              rows[rows.length - 1].push(day);
              return rows;
            }, []).map((week, weekIndex) => (
              <View key={weekIndex} style={styles.calendarRow}>
                {week.map((day, dayIndex) => (
                  <TouchableOpacity
                    key={dayIndex}
                    style={[
                      styles.dayButton,
                      day !== null && isDateSelected(day) && styles.dayButtonSelected,
                      day !== null && isDateDisabled(day) && styles.dayButtonDisabled,
                    ]}
                    disabled={day === null || isDateDisabled(day || 1)}
                    onPress={() => day !== null && handleDayPress(day)}
                  >
                    {day !== null && (
                      <Text
                        style={[
                          styles.dayText,
                          isDateSelected(day) && styles.dayTextSelected,
                        ]}
                      >
                        {day}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}

            {showTime && (
              <View style={styles.timeContainer}>
                <View style={styles.timeInputContainer}>
                  <Text style={styles.timeLabel}>Hour</Text>
                  <ScrollView
                    style={styles.timeScrollView}
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                  >
                    {Array.from({ length: 24 }).map((_, i) => (
                      <TouchableOpacity
                        key={i}
                        style={styles.timeOption}
                        onPress={() => setSelectedHour(i)}
                      >
                        <Text
                          style={[
                            styles.timeText,
                            selectedHour === i && styles.timeTextSelected,
                          ]}
                        >
                          {String(i).padStart(2, "0")}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.timeInputContainer}>
                  <Text style={styles.timeLabel}>Minute</Text>
                  <ScrollView
                    style={styles.timeScrollView}
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                  >
                    {Array.from({ length: 60 }).map((_, i) => (
                      <TouchableOpacity
                        key={i}
                        style={styles.timeOption}
                        onPress={() => setSelectedMinute(i)}
                      >
                        <Text
                          style={[
                            styles.timeText,
                            selectedMinute === i && styles.timeTextSelected,
                          ]}
                        >
                          {String(i).padStart(2, "0")}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <Button variant="outline" onPress={onClose} fullWidth>
                Cancel
              </Button>
              <Button onPress={handleConfirm} fullWidth>
                Confirm
              </Button>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
