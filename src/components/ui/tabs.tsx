import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleSheet,
  ScrollView,
} from "react-native";

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  /** Tab items */
  tabs: TabItem[];
  /** Default active tab */
  defaultActive?: number;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Tab bar color */
  activeColor?: string;
  /** Inactive color */
  inactiveColor?: string;
}

const Tabs = React.forwardRef<View, TabsProps>(
  (
    {
      tabs,
      defaultActive = 0,
      containerStyle,
      activeColor = "#0ea5e9",
      inactiveColor = "#9ca3af",
    },
    ref
  ) => {
    const [activeTab, setActiveTab] = useState(defaultActive);

    const styles = StyleSheet.create({
      container: {
        backgroundColor: "#ffffff",
      },
      tabBar: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
      },
      tab: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
      },
      activeTab: {
        borderBottomColor: activeColor,
      },
      tabText: {
        fontSize: 14,
        fontWeight: "600",
      },
      activeTabText: {
        color: activeColor,
      },
      inactiveTabText: {
        color: inactiveColor,
      },
      content: {
        paddingVertical: 16,
        paddingHorizontal: 16,
      },
    });

    return (
      <View ref={ref} style={[styles.container, containerStyle]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabBar}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                activeTab === index && styles.activeTab,
              ]}
              onPress={() => setActiveTab(index)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === index
                    ? styles.activeTabText
                    : styles.inactiveTabText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.content}>{tabs[activeTab].content}</View>
      </View>
    );
  }
);

Tabs.displayName = "Tabs";

export default Tabs;
