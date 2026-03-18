import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTheme } from "../../lib/theme-context";

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
      activeColor,
      inactiveColor,
    },
    ref
  ) => {
    const { colors } = useTheme();
    const defaultActiveColor = activeColor || colors.primary;
    const defaultInactiveColor = inactiveColor || colors.mutedForeground;

    const [activeTab, setActiveTab] = useState(defaultActive);

    const styles = StyleSheet.create({
      container: {
        backgroundColor: colors.background,
        borderRadius: 8,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
      tabBar: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.muted,
      },
      tab: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
      },
      activeTab: {
        borderBottomColor: defaultActiveColor,
        backgroundColor: colors.background,
      },
      tabText: {
        fontSize: 14,
        fontWeight: "600",
        letterSpacing: 0.2,
      },
      activeTabText: {
        color: defaultActiveColor,
      },
      inactiveTabText: {
        color: defaultInactiveColor,
      },
      content: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: colors.background,
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
