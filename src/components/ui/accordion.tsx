import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleSheet,
} from "react-native";

interface AccordionItem {
  id: string | number;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  /** Accordion items */
  items: AccordionItem[];
  /** Allow multiple open */
  allowMultiple?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
}

const Accordion = React.forwardRef<View, AccordionProps>(
  (
    {
      items,
      allowMultiple = false,
      containerStyle,
    },
    ref
  ) => {
    const [expanded, setExpanded] = useState<(string | number)[]>([]);

    const toggleItem = (id: string | number) => {
      if (allowMultiple) {
        setExpanded((prev) =>
          prev.includes(id)
            ? prev.filter((item) => item !== id)
            : [...prev, id]
        );
      } else {
        setExpanded((prev) => (prev.includes(id) ? [] : [id]));
      }
    };

    const styles = StyleSheet.create({
      container: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
      item: {
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
      },
      itemLast: {
        borderBottomWidth: 0,
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#ffffff",
      },
      headerText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1f2937",
        flex: 1,
        letterSpacing: 0.2,
      },
      arrow: {
        fontSize: 14,
        color: "#0ea5e9",
        fontWeight: "bold",
        marginLeft: 12,
      },
      content: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#fafafa",
      },
      contentText: {
        fontSize: 13,
        color: "#6b7280",
        lineHeight: 20,
        letterSpacing: 0.15,
      },
    });

    return (
      <View ref={ref} style={[styles.container, containerStyle]}>
        {items.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.item,
              index === items.length - 1 && styles.itemLast,
            ]}
          >
            <TouchableOpacity
              style={styles.header}
              onPress={() => toggleItem(item.id)}
              activeOpacity={0.6}
            >
              <Text style={styles.headerText}>{item.title}</Text>
              <Text
                style={[
                  styles.arrow,
                  {
                    transform: expanded.includes(item.id)
                      ? [{ rotate: "180deg" }]
                      : [],
                  },
                ]}
              >
                ▼
              </Text>
            </TouchableOpacity>
            {expanded.includes(item.id) && (
              <View style={styles.content}>
                {typeof item.content === "string" ? (
                  <Text style={styles.contentText}>{item.content}</Text>
                ) : (
                  item.content
                )}
              </View>
            )}
          </View>
        ))}
      </View>
    );
  }
);

Accordion.displayName = "Accordion";

export default Accordion;
