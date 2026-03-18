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
import { typography } from "./src/lib/typography";
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
import Table from "./src/components/ui/table";

function AppContent() {
  const { theme, colors, toggleTheme } = useTheme();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputValue, setInputValue] = useState("");
  const [datePickerVisible, setDatePickerVisible] = useState(false);

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
       ...typography.heading.sm,
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
       ...typography.label.md,
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
       ...typography.display.lg,
       color: colors.foreground,
       marginBottom: 8,
       letterSpacing: -0.5,
     },
     heroSubtitle: {
       ...typography.heading.xs,
       color: colors.mutedForeground,
       marginBottom: 16,
     },
     heroDescription: {
       ...typography.body.md,
       color: colors.mutedForeground,
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
       ...typography.subheading.lg,
       color: colors.foreground,
       marginBottom: 4,
       textTransform: "uppercase",
       letterSpacing: 0.5,
     },
     sectionSubtitle: {
       ...typography.body.sm,
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
       ...typography.subheading.md,
       color: colors.foreground,
       marginBottom: 4,
     },
     demoCardLabel: {
       ...typography.tiny.md,
       color: colors.primary,
       textTransform: "uppercase",
       letterSpacing: 0.5,
       marginBottom: 8,
     },
     demoCardDescription: {
       ...typography.body.sm,
       color: colors.mutedForeground,
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
       ...typography.label.md,
       color: colors.primaryForeground,
     },
     footerText: {
       ...typography.caption.sm,
       color: colors.mutedForeground,
       textAlign: "center",
     },
     statNumber: {
       ...typography.heading.xs,
       color: colors.primary,
       marginBottom: 4,
     },
     statLabel: {
       ...typography.tiny.sm,
       color: colors.mutedForeground,
       textAlign: "center",
     },
     demoSheetTitle: {
       ...typography.heading.sm,
       color: colors.foreground,
       marginBottom: 12,
     },
     demoSheetDescription: {
       ...typography.body.md,
       color: colors.mutedForeground,
       marginBottom: 16,
     },
     footer: {
       paddingTop: 20,
       borderTopWidth: 1,
       borderTopColor: colors.border,
       alignItems: "center",
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
     demoSheetContent: {
       padding: 20,
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
      id: "table",
      label: "Display Components",
      title: "Table",
      description: "Responsive data table with sorting and striping support",
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

      {/* Buttons Demo */}
      {activeDemo === "buttons" && (
        <View style={{ padding: 20, gap: 12, backgroundColor: colors.background }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.foreground, marginBottom: 8 }}>
            Button Variants
          </Text>
          <Button variant="primary" size="md">Primary Button</Button>
          <Button variant="secondary" size="md">Secondary Button</Button>
          <Button variant="destructive" size="md">Destructive Button</Button>
          <Button variant="outline" size="md">Outline Button</Button>
          <Button variant="ghost" size="md">Ghost Button</Button>
          <Button
            variant="primary"
            size="md"
            onPress={() => setActiveDemo(null)}
            containerStyle={{ marginTop: 8 }}
          >
            Close Demo
          </Button>
        </View>
      )}

      {/* Inputs Demo */}
      {activeDemo === "inputs" && (
        <View style={{ padding: 20, gap: 12, backgroundColor: colors.background }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.foreground, marginBottom: 8 }}>
            Input Components
          </Text>
          <Input
            placeholder="Enter your name"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <Input
            placeholder="Enter email"
            editable={false}
            defaultValue="user@example.com"
          />
          <Input
            placeholder="Password input"
            secureTextEntry
          />
          <Button
            variant="primary"
            size="md"
            onPress={() => setActiveDemo(null)}
            containerStyle={{ marginTop: 8 }}
          >
            Close Demo
          </Button>
        </View>
      )}

      {/* Cards Demo */}
      {activeDemo === "cards" && (
        <View style={{ padding: 20, gap: 12, backgroundColor: colors.background }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.foreground, marginBottom: 8 }}>
            Card Variants
          </Text>
          <Card shadow shadowIntensity="subtle">
            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4 }}>
              Subtle Card
            </Text>
            <Text style={{ fontSize: 13, color: colors.mutedForeground }}>
              This card has a subtle shadow
            </Text>
          </Card>
          <Card shadow shadowIntensity="medium">
            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4 }}>
              Medium Card
            </Text>
            <Text style={{ fontSize: 13, color: colors.mutedForeground }}>
              This card has a medium shadow
            </Text>
          </Card>
          <Button
            variant="primary"
            size="md"
            onPress={() => setActiveDemo(null)}
            containerStyle={{ marginTop: 8 }}
          >
            Close Demo
          </Button>
        </View>
      )}

      {/* Badges Demo */}
      {activeDemo === "badges" && (
        <View style={{ padding: 20, gap: 12, backgroundColor: colors.background }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.foreground, marginBottom: 8 }}>
            Badge Variants
          </Text>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="default">Default</Badge>
          </View>
          <Button
            variant="primary"
            size="md"
            onPress={() => setActiveDemo(null)}
            containerStyle={{ marginTop: 8 }}
          >
            Close Demo
          </Button>
        </View>
      )}

      {/* Date Picker Demo */}
      {activeDemo === "datepicker" && (
        <View style={{ padding: 20, gap: 12, backgroundColor: colors.background }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.foreground, marginBottom: 8 }}>
            Date Picker
          </Text>
          <Button
            variant="primary"
            size="md"
            onPress={() => setDatePickerVisible(true)}
            containerStyle={{ marginBottom: 8 }}
          >
            Open Date Picker
          </Button>
          <Card shadow shadowIntensity="subtle">
            <Text style={{ fontSize: 14, color: colors.mutedForeground }}>
              Selected Date: {selectedDate.toLocaleDateString()}
            </Text>
          </Card>
          <Button
            variant="primary"
            size="md"
            onPress={() => setActiveDemo(null)}
            containerStyle={{ marginTop: 8 }}
          >
            Close Demo
          </Button>
        </View>
      )}

       {/* Date Picker Modal */}
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        visible={datePickerVisible}
        onClose={() => setDatePickerVisible(false)}
      />

      {/* Table Demo */}
      {activeDemo === "table" && (
        <View style={{ padding: 20, gap: 12, backgroundColor: colors.background }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.foreground, marginBottom: 8 }}>
            Data Table
          </Text>
          <Table
            columns={[
              { key: "id", title: "ID", width: 60, align: "center" },
              { key: "name", title: "Name", width: 120 },
              { key: "status", title: "Status", width: 100 },
              { key: "value", title: "Value", width: 80, align: "right" },
            ]}
            data={[
              { id: 1, name: "Product A", status: "Active", value: 1200 },
              { id: 2, name: "Product B", status: "Inactive", value: 800 },
              { id: 3, name: "Product C", status: "Active", value: 1500 },
              { id: 4, name: "Product D", status: "Pending", value: 950 },
              { id: 5, name: "Product E", status: "Active", value: 2100 },
            ]}
            striped
            bordered
            density="normal"
            containerStyle={{ marginBottom: 12 }}
          />
          <Button
            variant="primary"
            size="md"
            onPress={() => setActiveDemo(null)}
            containerStyle={{ marginTop: 8 }}
          >
            Close Demo
          </Button>
        </View>
      )}

      {/* Alert Demo */}
      {activeDemo === "alert" && (
        <View style={{ padding: 20, gap: 12, backgroundColor: colors.background }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.foreground, marginBottom: 8 }}>
            Alert Variants
          </Text>
          <Alert type="info" title="Information" message="This is an informational alert message" />
          <Alert type="success" title="Success" message="Action completed successfully" />
          <Alert type="warning" title="Warning" message="Please review this warning carefully" />
          <Alert type="error" title="Error" message="An error occurred during the operation" />
          <Button
            variant="primary"
            size="md"
            onPress={() => setActiveDemo(null)}
            containerStyle={{ marginTop: 8 }}
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
