import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Button from "./src/components/ui/button";
import Card from "./src/components/ui/card";
import Sheet from "./src/components/ui/sheet";
import Drawer from "./src/components/ui/drawer";
import Popover from "./src/components/ui/popover";
import DatePicker from "./src/components/ui/date-picker";
import Toast from "./src/components/ui/toast";

export default function App() {
  const [activeDemo, setActiveDemo] = useState<"sheet" | "drawer" | "popover" | "datepicker" | "buttons" | "inputs" | "cards" | "badges" | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    safeArea: {
      flex: 1,
    },
    scrollContent: {
      padding: 24,
      paddingBottom: 40,
    },
    // Hero Section
    heroSection: {
      marginBottom: 48,
      alignItems: "center",
    },
    logo: {
      fontSize: 48,
      marginBottom: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: 12,
      textAlign: "center",
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 16,
      color: "#6b7280",
      textAlign: "center",
      lineHeight: 24,
      marginBottom: 8,
    },
    badge: {
      marginTop: 16,
      backgroundColor: "#f0f9ff",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      alignSelf: "center",
    },
    badgeText: {
      fontSize: 12,
      fontWeight: "600",
      color: "#0369a1",
      letterSpacing: 0.5,
    },
    // Demo Grid Section
    demoSection: {
      marginBottom: 48,
    },
    sectionLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: "#9ca3af",
      marginBottom: 16,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    demoGrid: {
      gap: 12,
    },
    demoCard: {
      borderRadius: 12,
      padding: 20,
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#e5e7eb",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    demoCategoryText: {
      fontSize: 13,
      color: "#9ca3af",
      marginBottom: 6,
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    demoTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: 8,
      letterSpacing: -0.3,
    },
    demoDescription: {
      fontSize: 14,
      color: "#6b7280",
      lineHeight: 20,
      marginBottom: 16,
    },
    demoButton: {
      paddingVertical: 10,
      borderRadius: 8,
    },
    // Footer Section
    footerSection: {
      marginTop: 32,
      paddingTop: 24,
      borderTopWidth: 1,
      borderTopColor: "#f0f0f0",
      alignItems: "center",
    },
    footerText: {
      fontSize: 12,
      color: "#9ca3af",
      marginBottom: 12,
      letterSpacing: 0.3,
    },
    footerLink: {
      fontSize: 14,
      fontWeight: "600",
      color: "#3b82f6",
      marginBottom: 4,
    },
  });

  const demos = [
    {
      id: "sheet",
      emoji: "📄",
      title: "Sheet",
      category: "Overlay Component",
      description: "Bottom sheet modal that slides up from the bottom with smooth animations.",
    },
    {
      id: "drawer",
      emoji: "🎪",
      title: "Drawer",
      category: "Navigation Component",
      description: "Side panel drawer that slides from the edge with gesture support.",
    },
    {
      id: "popover",
      emoji: "💬",
      title: "Popover",
      category: "Floating Component",
      description: "Floating content positioned relative to trigger with smart positioning.",
    },
    {
      id: "datepicker",
      emoji: "📅",
      title: "DatePicker",
      category: "Form Component",
      description: "Interactive calendar with date selection and optional time picker.",
    },
    {
      id: "buttons",
      emoji: "🔘",
      title: "Buttons",
      category: "Interactive Component",
      description: "Multiple button variants (primary, secondary, outline, destructive) with sizes.",
    },
    {
      id: "inputs",
      emoji: "✏️",
      title: "Inputs",
      category: "Form Component",
      description: "Polished text input with focus states, placeholder, and validation support.",
    },
    {
      id: "cards",
      emoji: "🎯",
      title: "Cards",
      category: "Display Component",
      description: "Elegant card containers with shadows and professional styling.",
    },
    {
      id: "badges",
      emoji: "🏷️",
      title: "Badges",
      category: "Display Component",
      description: "Status badges with multiple variants and color options.",
    },
  ];

  return (
    <SafeAreaView style={[styles.container, styles.safeArea]}>
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.logo}>🎨</Text>
          <Text style={styles.title}>Prasanga UI</Text>
          <Text style={styles.subtitle}>
            Modern React Native Components{"\n"}Built with TypeScript & NativeWind
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✨ This is from PrasangaKit • v1.2.0</Text>
          </View>
          <Text style={{ fontSize: 13, color: "#6b7280", marginTop: 16, textAlign: "center", fontWeight: "500" }}>
            34+ Production-Ready Components
          </Text>
        </View>

        {/* Demo Components Section */}
        <View style={styles.demoSection}>
          <Text style={styles.sectionLabel}>Explore Components</Text>
          <View style={styles.demoGrid}>
            {demos.map((demo) => (
              <Card key={demo.id} style={{ borderRadius: 12, overflow: "hidden" }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setActiveDemo(demo.id as any)}
                >
                  <View style={styles.demoCard}>
                    <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 12 }}>
                      <Text style={{ fontSize: 24, marginRight: 12 }}>{demo.emoji}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.demoCategoryText}>{demo.category}</Text>
                        <Text style={styles.demoTitle}>{demo.title}</Text>
                      </View>
                    </View>
                    <Text style={styles.demoDescription}>{demo.description}</Text>
                    <Button
                      variant="outline"
                      size="sm"
                      onPress={() => setActiveDemo(demo.id as any)}
                    >
                      View Example
                    </Button>
                  </View>
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        </View>

        {/* Footer Section */}
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>Powered by Expo & React Native</Text>
          <Text style={styles.footerLink}>github.com/prasangapokharel/PrasangaKit</Text>
          <Text style={styles.footerText}>MIT License</Text>
        </View>
      </ScrollView>

      {/* Sheet Demo */}
      <Sheet
        visible={activeDemo === "sheet"}
        onClose={() => setActiveDemo(null)}
        title="Sheet Example"
        showCloseButton
      >
        <View style={{ gap: 16 }}>
          <Text style={{ fontSize: 14, color: "#6b7280", lineHeight: 20 }}>
            This is a bottom sheet modal that slides up from the bottom of the screen. You can drag it down to close or tap the button below.
          </Text>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: "600", color: "#9ca3af", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Features:
            </Text>
            <Text style={{ fontSize: 13, color: "#6b7280", lineHeight: 18 }}>• Smooth slide-up animation</Text>
            <Text style={{ fontSize: 13, color: "#6b7280", lineHeight: 18 }}>• Drag to close gesture</Text>
            <Text style={{ fontSize: 13, color: "#6b7280", lineHeight: 18 }}>• Customizable height & styling</Text>
            <Text style={{ fontSize: 13, color: "#6b7280", lineHeight: 18 }}>• Smooth transitions</Text>
          </View>
          <Button
            variant="secondary"
            onPress={() => {
              setActiveDemo(null);
              showToast("Sheet closed successfully!");
            }}
          >
            Close Sheet
          </Button>
        </View>
      </Sheet>

      {/* Drawer Demo */}
      <Drawer
        visible={activeDemo === "drawer"}
        onClose={() => setActiveDemo(null)}
        title="Drawer Example"
        position="left"
        showCloseButton
      >
        <View style={{ gap: 16 }}>
          <Text style={{ fontSize: 14, color: "#6b7280", lineHeight: 20 }}>
            This is a left-side drawer panel that slides from the edge of the screen. You can swipe to close or use the button.
          </Text>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: "600", color: "#9ca3af", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Features:
            </Text>
            <Text style={{ fontSize: 13, color: "#6b7280", lineHeight: 18 }}>• Smooth slide animation</Text>
            <Text style={{ fontSize: 13, color: "#6b7280", lineHeight: 18 }}>• Swipe to close support</Text>
            <Text style={{ fontSize: 13, color: "#6b7280", lineHeight: 18 }}>• Left or right positioning</Text>
            <Text style={{ fontSize: 13, color: "#6b7280", lineHeight: 18 }}>• Professional styling</Text>
          </View>
          <Button
            variant="secondary"
            onPress={() => {
              setActiveDemo(null);
              showToast("Drawer closed successfully!");
            }}
          >
            Close Drawer
          </Button>
        </View>
      </Drawer>

      {/* Popover Demo */}
      <Popover
        visible={activeDemo === "popover"}
        onClose={() => setActiveDemo(null)}
        trigger={<View />}
        title="Popover Example"
        position="bottom"
      >
        <Text style={{ fontSize: 13, color: "#6b7280", lineHeight: 18 }}>
          This is a floating popover component that appears relative to a trigger element. Click outside to close.{"\n\n"}• Smart positioning to avoid edges{"\n"}• Optional arrow indicator{"\n"}• Smooth fade animation
        </Text>
      </Popover>

      {/* DatePicker Demo */}
      <DatePicker
        visible={activeDemo === "datepicker"}
        onClose={() => setActiveDemo(null)}
        value={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setActiveDemo(null);
          showToast(`Selected: ${date.toLocaleDateString()}`);
        }}
        showTime={false}
      />

      {/* Buttons Demo */}
      {activeDemo === "buttons" && (
        <Sheet
          visible={true}
          onClose={() => setActiveDemo(null)}
          title="Button Component"
          showCloseButton
        >
          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 14, color: "#6b7280", lineHeight: 20 }}>
              Buttons with multiple variants and sizes for every use case.
            </Text>
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="destructive">Destructive Button</Button>
          </View>
        </Sheet>
      )}

      {/* Inputs Demo */}
      {activeDemo === "inputs" && (
        <Sheet
          visible={true}
          onClose={() => setActiveDemo(null)}
          title="Input Component"
          showCloseButton
        >
          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 14, color: "#6b7280", lineHeight: 20 }}>
              Text input with smooth focus states and professional styling.
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "600", color: "#9ca3af", marginTop: 8 }}>
              Try typing below:
            </Text>
            <View style={{ height: 40, borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8, paddingHorizontal: 12, justifyContent: "center" }}>
              <Text style={{ color: "#6b7280" }}>Focus states • Validation • Placeholders</Text>
            </View>
          </View>
        </Sheet>
      )}

      {/* Cards Demo */}
      {activeDemo === "cards" && (
        <Sheet
          visible={true}
          onClose={() => setActiveDemo(null)}
          title="Card Component"
          showCloseButton
        >
          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 14, color: "#6b7280", lineHeight: 20 }}>
              Elegant card containers with subtle shadows and professional styling.
            </Text>
            <View style={{ backgroundColor: "#f9fafb", borderRadius: 8, padding: 12, borderWidth: 1, borderColor: "#e5e7eb" }}>
              <Text style={{ fontSize: 13, fontWeight: "600", color: "#1f2937", marginBottom: 4 }}>
                Card Title
              </Text>
              <Text style={{ fontSize: 12, color: "#6b7280", lineHeight: 16 }}>
                Cards are perfect for organizing content with depth and hierarchy.
              </Text>
            </View>
          </View>
        </Sheet>
      )}

      {/* Badges Demo */}
      {activeDemo === "badges" && (
        <Sheet
          visible={true}
          onClose={() => setActiveDemo(null)}
          title="Badge Component"
          showCloseButton
        >
          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 14, color: "#6b7280", lineHeight: 20 }}>
              Status badges with multiple color variants for visual feedback.
            </Text>
            <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
              <View style={{ backgroundColor: "#dcfce7", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>
                <Text style={{ fontSize: 12, color: "#15803d", fontWeight: "600" }}>Success</Text>
              </View>
              <View style={{ backgroundColor: "#fee2e2", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>
                <Text style={{ fontSize: 12, color: "#dc2626", fontWeight: "600" }}>Error</Text>
              </View>
              <View style={{ backgroundColor: "#dbeafe", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>
                <Text style={{ fontSize: 12, color: "#2563eb", fontWeight: "600" }}>Info</Text>
              </View>
              <View style={{ backgroundColor: "#fef3c7", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>
                <Text style={{ fontSize: 12, color: "#d97706", fontWeight: "600" }}>Warning</Text>
              </View>
            </View>
          </View>
        </Sheet>
      )}

      {/* Toast Notification */}
      {toastVisible && (
        <Toast
          message={toastMessage}
          type="success"
          duration={2000}
          onDismiss={() => setToastVisible(false)}
        />
      )}
    </SafeAreaView>
  );
}
