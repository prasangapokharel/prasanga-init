import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  FlatList,
} from "react-native";

interface ListItem {
  id: string | number;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

interface ListProps {
  /** List items */
  items: ListItem[];
  /** Separator */
  showSeparator?: boolean;
  /** Custom item render */
  renderItem?: (item: ListItem) => React.ReactNode;
  /** Container style */
  containerStyle?: ViewStyle;
}

const List = React.forwardRef<View, ListProps>(
  (
    {
      items,
      showSeparator = true,
      renderItem,
      containerStyle,
    },
    ref
  ) => {
    const styles = StyleSheet.create({
      container: {
        borderRadius: 8,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        backgroundColor: "#ffffff",
      },
      item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
      },
      itemContent: {
        flex: 1,
      },
      title: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1f2937",
        marginBottom: 4,
      },
      subtitle: {
        fontSize: 12,
        color: "#6b7280",
      },
      separator: {
        height: 1,
        backgroundColor: "#f3f4f6",
      },
      rightElement: {
        marginLeft: 12,
      },
    });

    return (
      <View ref={ref} style={[styles.container, containerStyle]}>
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            {renderItem ? (
              renderItem(item)
            ) : (
              <TouchableOpacity
                style={styles.item}
                onPress={item.onPress}
                activeOpacity={item.onPress ? 0.7 : 1}
              >
                <View style={styles.itemContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  {item.subtitle && (
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                  )}
                </View>
                {item.rightElement && (
                  <View style={styles.rightElement}>
                    {item.rightElement}
                  </View>
                )}
              </TouchableOpacity>
            )}
            {showSeparator && index < items.length - 1 && (
              <View style={styles.separator} />
            )}
          </React.Fragment>
        ))}
      </View>
    );
  }
);

List.displayName = "List";

export default List;
