import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { ThemeProvider, useTheme } from "./src/lib/theme-context";
import Button from "./src/components/ui/button";
import Card from "./src/components/ui/card";
import Sheet from "./src/components/ui/sheet";
import Drawer from "./src/components/ui/drawer";
import Popover from "./src/components/ui/popover";
import DatePicker from "./src/components/ui/date-picker";
import Toast from "./src/components/ui/toast";
import Alert from "./src/components/ui/alert";
import Badge from "./src/components/ui/badge";
import Input from "./src/components/ui/input";

function AppContent() {
  const { theme, colors, toggleTheme } = useTheme();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputValue, setInputValue] = useState("");

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.foreground,
    },
    themeToggleButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
      backgroundColor: colors.muted,
      borderWidth: 1,
      borderColor: colors.border,
    },
    themeToggleText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.primary,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 40,
    },
    heroSection: {
      marginBottom: 40,
    },
    heroTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.foreground,
      marginBottom: 8,
      letterSpacing: -0.5,
    },
    heroSubtitle: {
      fontSize: 16,
      color: colors.mutedForeground,
      lineHeight: 24,
      marginBottom: 16,
    },
    heroDescription: {
      fontSize: 14,
      color: colors.mutedForeground,
      lineHeight: 22,
      marginBottom: 20,
    },
    badgeContainer: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 20,
    },
    sectionContainer: {
      marginBottom: 40,
    },
    sectionHeader: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.foreground,
      marginBottom: 4,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    sectionSubtitle: {
      fontSize: 13,
      color: colors.mutedForeground,
    },
    demoGrid: {
      gap: 12,
    },
    demoCard: {
      borderRadius: 8,
      padding: 16,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.foreground,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
    },
    demoCardHeader: {
      marginBottom: 12,
    },
    demoCardTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.foreground,
      marginBottom: 4,
    },
    demoCardLabel: {
      fontSize: 12,
      fontWeight: "500",
      color: colors.primary,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 8,
    },
    demoCardDescription: {
      fontSize: 13,
      color: colors.mutedForeground,
      lineHeight: 19,
      marginBottom: 12,
    },
    demoButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: colors.primary,
      borderRadius: 6,
      alignItems: "center",
    },
    demoButtonText: {
      color: colors.primaryForeground,
      fontSize: 13,
      fontWeight: "600",
    },
    footer: {
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      alignItems: "center",
    },
    footerText: {
      fontSize: 12,
      color: colors.mutedForeground,
      textAlign: "center",
      lineHeight: 18,
    },
    statsContainer: {
      flexDirection: "row",
      gap: 12,
      marginTop: 16,
    },
    statBox: {
      flex: 1,
      padding: 12,
      backgroundColor: colors.muted,
      borderRadius: 6,
      alignItems: "center",
    },
    statNumber: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 11,
      color: colors.mutedForeground,
      textAlign: "center",
    },
    demoSheetContent: {
      padding: 20,
    },
    demoSheetTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.foreground,
      marginBottom: 12,
    },
    demoSheetDescription: {
      fontSize: 14,
      color: colors.mutedForeground,
      lineHeight: 21,
      marginBottom: 16,
    },
  });

  const demos = [
    {
      id: "buttons",
      label: "Form Components",
      title: "Buttons",
      description: "Multiple button variants and sizes for different actions and contexts",
    },
    {
      id: "inputs",
      label: "Form Components",
      title: "Inputs",
      description: "Text inputs with validation states and helper text support",
    },
    {
      id: "cards",
      label: "Display Components",
      title: "Cards",
      description: "Flexible containers with customizable shadows and borders",
    },
    {
      id: "badges",
      label: "Display Components",
      title: "Badges",
      description: "Status indicators with multiple variants and styles",
    },
    {
      id: "sheet",
      label: "Overlay Components",
      title: "Bottom Sheet",
      description: "Modal with drag to close and smooth animations",
    },
    {
      id: "drawer",
      label: "Overlay Components",
      title: "Drawer",
      description: "Side panel with swipe gesture support and responsive design",
    },
    {
      id: "alert",
      label: "Feedback Components",
      title: "Alerts",
      description: "Contextual feedback messages with different severity levels",
    },
    {
      id: "datepicker",
      label: "Form Components",
      title: "Date Picker",
      description: "Interactive calendar for intuitive date selection",
    },
  ];

  return (
    <View style={dynamicStyles.container}>
      {/* Header */}
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.headerTitle}>Prasanga UI</Text>
        <TouchableOpacity
          style={dynamicStyles.themeToggleButton}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <Text style={dynamicStyles.themeToggleText}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </Text>
        </TouchableOpacity>
      </View>

      <SafeAreaView style={dynamicStyles.safeArea}>
        <ScrollView
          style={dynamicStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Hero Section */}
          <View style={dynamicStyles.heroSection}>
            <Text style={dynamicStyles.heroTitle}>Beautiful UI Components</Text>
            <Text style={dynamicStyles.heroSubtitle}>
              Professional React Native components with shadcn design
            </Text>
            <Text style={dynamicStyles.heroDescription}>
              Explore our collection of 32+ fully-typed, theme-aware components built with React Native and Expo. Each component supports both light and dark modes seamlessly.
            </Text>
            <View style={dynamicStyles.badgeContainer}>
              <Badge variant="primary">v1.2.0</Badge>
              <Badge variant="secondary">32+ Components</Badge>
              <Badge variant="success">Open Source</Badge>
            </View>

            <View style={dynamicStyles.statsContainer}>
              <View style={dynamicStyles.statBox}>
                <Text style={dynamicStyles.statNumber}>32+</Text>
                <Text style={dynamicStyles.statLabel}>Components</Text>
              </View>
              <View style={dynamicStyles.statBox}>
                <Text style={dynamicStyles.statNumber}>2</Text>
                <Text style={dynamicStyles.statLabel}>Themes</Text>
              </View>
              <View style={dynamicStyles.statBox}>
                <Text style={dynamicStyles.statNumber}>100%</Text>
                <Text style={dynamicStyles.statLabel}>Typed</Text>
              </View>
            </View>
          </View>

          {/* Demo Section */}
          <View style={dynamicStyles.sectionContainer}>
            <View style={dynamicStyles.sectionHeader}>
              <Text style={dynamicStyles.sectionTitle}>Component Library</Text>
              <Text style={dynamicStyles.sectionSubtitle}>
                Click to see component demos
              </Text>
            </View>
            <View style={dynamicStyles.demoGrid}>
              {demos.map((demo) => (
                <TouchableOpacity
                  key={demo.id}
                  onPress={() => {
                    setActiveDemo(demo.id);
                    showToast(`Opened ${demo.title} demo`);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={dynamicStyles.demoCard}>
                    <View style={dynamicStyles.demoCardHeader}>
                      <Text style={dynamicStyles.demoCardLabel}>{demo.label}</Text>
                      <Text style={dynamicStyles.demoCardTitle}>{demo.title}</Text>
                    </View>
                    <Text style={dynamicStyles.demoCardDescription}>
                      {demo.description}
                    </Text>
                    <View style={dynamicStyles.demoButton}>
                      <Text style={dynamicStyles.demoButtonText}>View Demo</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Features Section */}
          <View style={dynamicStyles.sectionContainer}>
            <View style={dynamicStyles.sectionHeader}>
              <Text style={dynamicStyles.sectionTitle}>Key Features</Text>
            </View>
            <View style={dynamicStyles.demoGrid}>
              <Card shadow shadowIntensity="subtle">
                <View style={{ padding: 4 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4 }}>
                    Fully Typed
                  </Text>
                  <Text style={{ fontSize: 13, color: colors.mutedForeground, lineHeight: 18 }}>
                    Complete TypeScript support with proper type definitions
                  </Text>
                </View>
              </Card>

              <Card shadow shadowIntensity="subtle">
                <View style={{ padding: 4 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4 }}>
                    Dark and Light Mode
                  </Text>
                  <Text style={{ fontSize: 13, color: colors.mutedForeground, lineHeight: 18 }}>
                    Toggle between themes with one click
                  </Text>
                </View>
              </Card>

              <Card shadow shadowIntensity="subtle">
                <View style={{ padding: 4 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4 }}>
                    Production Ready
                  </Text>
                  <Text style={{ fontSize: 13, color: colors.mutedForeground, lineHeight: 18 }}>
                    Built with best practices and enterprise standards
                  </Text>
                </View>
              </Card>

              <Card shadow shadowIntensity="subtle">
                <View style={{ padding: 4 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4 }}>
                    Easy Integration
                  </Text>
                  <Text style={{ fontSize: 13, color: colors.mutedForeground, lineHeight: 18 }}>
                    Simple API with sensible defaults
                  </Text>
                </View>
              </Card>
            </View>
          </View>

          {/* Footer */}
          <View style={dynamicStyles.footer}>
            <Text style={dynamicStyles.footerText}>
              Built with React Native, Expo, and TypeScript
            </Text>
            <Text style={[dynamicStyles.footerText, { marginTop: 8 }]}>
              Theme: {theme === "light" ? "Light Mode" : "Dark Mode"}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Sheet Demo */}
      <Sheet
        isOpen={activeDemo === "sheet"}
        onClose={() => setActiveDemo(null)}
        title="Bottom Sheet Demo"
      >
        <View style={dynamicStyles.demoSheetContent}>
          <Text style={dynamicStyles.demoSheetTitle}>Bottom Sheet Component</Text>
          <Text style={dynamicStyles.demoSheetDescription}>
            This is a premium bottom sheet modal with drag to close support. Drag down or tap outside to dismiss.
          </Text>
          <Button
            variant="primary"
            size="md"
            onPress={() => {
              setActiveDemo(null);
              showToast("Sheet closed successfully");
            }}
            containerStyle={{ marginTop: 16 }}
          >
            Close Sheet
          </Button>
        </View>
      </Sheet>

      {/* Drawer Demo */}
      <Drawer
        isOpen={activeDemo === "drawer"}
        onClose={() => setActiveDemo(null)}
        title="Drawer Demo"
      >
        <View style={dynamicStyles.demoSheetContent}>
          <Text style={dynamicStyles.demoSheetTitle}>Drawer Component</Text>
          <Text style={dynamicStyles.demoSheetDescription}>
            This is a side drawer with swipe gesture support. Swipe left or tap outside to dismiss.
          </Text>
          <Button
            variant="secondary"
            size="md"
            onPress={() => {
              setActiveDemo(null);
              showToast("Drawer closed successfully");
            }}
            containerStyle={{ marginTop: 16 }}
          >
            Close Drawer
          </Button>
        </View>
      </Drawer>

      {/* Alert Demo */}
      {activeDemo === "alert" && (
        <View style={{ padding: 20, gap: 12 }}>
          <Alert type="info" title="Information" message="This is an informational alert message" />
          <Alert type="success" title="Success" message="Action completed successfully" />
          <Alert type="warning" title="Warning" message="Please review this warning carefully" />
          <Alert type="error" title="Error" message="An error occurred during the operation" />
          <Button
            variant="primary"
            size="md"
            onPress={() => setActiveDemo(null)}
          >
            Close Alerts
          </Button>
        </View>
      )}

      {/* Toast */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        onDismiss={() => setToastVisible(false)}
        duration={3000}
      />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
