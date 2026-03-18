import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Button from "./src/components/ui/button";
import Input from "./src/components/ui/input";
import Textarea from "./src/components/ui/textarea";
import Card from "./src/components/ui/card";
import Badge from "./src/components/ui/badge";
import Modal from "./src/components/ui/modal";
import Toast from "./src/components/ui/toast";
import Checkbox from "./src/components/ui/checkbox";
import Radio from "./src/components/ui/radio";
import Switch from "./src/components/ui/switch";
import Select from "./src/components/ui/select";
import Slider from "./src/components/ui/slider";
import Stepper from "./src/components/ui/stepper";
import ProgressBar from "./src/components/ui/progress-bar";
import CircularProgress from "./src/components/ui/circular-progress";
import Alert from "./src/components/ui/alert";
import Spinner from "./src/components/ui/spinner";
import Container from "./src/components/ui/container";
import Stack from "./src/components/ui/stack";
import Divider from "./src/components/ui/divider";
import Avatar from "./src/components/ui/avatar";
import TextComponent from "./src/components/ui/text";
import List from "./src/components/ui/list";
import Tabs from "./src/components/ui/tabs";
import Accordion from "./src/components/ui/accordion";
import Tooltip from "./src/components/ui/tooltip";
import Sheet from "./src/components/ui/sheet";
import Drawer from "./src/components/ui/drawer";
import Popover from "./src/components/ui/popover";
import DatePicker from "./src/components/ui/date-picker";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info" | "warning">("success");
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Form states
  const [checkboxState, setCheckboxState] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [switchValue, setSwitchValue] = useState(false);
  const [selectValue, setSelectValue] = useState("opt1");
  const [sliderValue, setSliderValue] = useState(50);
  const [stepperValue, setStepperValue] = useState(1);
  const [textValue, setTextValue] = useState("");

  const showToast = (message: string, type: "success" | "error" | "info" | "warning" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f9fafb",
    },
    scrollContent: {
      padding: 16,
      gap: 24,
      paddingBottom: 40,
    },
    header: {
      fontSize: 28,
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: "#6b7280",
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: 12,
      marginTop: 8,
    },
    section: {
      gap: 12,
    },
    buttonRow: {
      flexDirection: "row",
      gap: 8,
      flexWrap: "wrap",
    },
    badgeRow: {
      flexDirection: "row",
      gap: 8,
      flexWrap: "wrap",
    },
    divider: {
      marginVertical: 16,
    },
    alertContainer: {
      marginBottom: 12,
    },
    tabContainer: {
      marginTop: 12,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <TextComponent variant="h1" color="primary">
            Welcome to Prasanga
          </TextComponent>
          <Text style={styles.subtitle}>
            Complete React Native UI Component Library
          </Text>
        </View>

        {/* ===== BUTTONS ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔘 Buttons</Text>
          <View style={styles.buttonRow}>
            <Button variant="primary" onPress={() => showToast("Primary clicked!")}>
              Primary
            </Button>
            <Button variant="secondary" onPress={() => showToast("Secondary clicked!")}>
              Secondary
            </Button>
          </View>
          <View style={styles.buttonRow}>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </View>
          <View style={styles.buttonRow}>
            <Button variant="default">Default</Button>
            <Button variant="destructive">Delete</Button>
          </View>
          <View style={styles.buttonRow}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </View>
        </View>

        {/* ===== INPUT & TEXT FIELDS ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✏️ Input Fields</Text>
          <Input placeholder="Enter name" label="Name" />
          <Input placeholder="Enter email" label="Email" />
          <Textarea placeholder="Enter message" label="Message" rows={3} />
          <Input placeholder="Error field" label="Error" error="This is required" hasError />
        </View>

        {/* ===== CHECKBOXES ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>☑️ Checkboxes</Text>
          <Checkbox checked={checkboxState} onPress={setCheckboxState} label="Accept terms" />
          <Checkbox checked={!checkboxState} onPress={() => setCheckboxState(!checkboxState)} label="Subscribe" />
        </View>

        {/* ===== RADIO BUTTONS ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭕ Radio Buttons</Text>
          <Radio
            value={radioValue}
            onValueChange={(val) => setRadioValue(val as string)}
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
          />
        </View>

        {/* ===== SWITCH ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 Switch/Toggle</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Switch value={switchValue} onValueChange={setSwitchValue} />
            <Text>{switchValue ? "Enabled" : "Disabled"}</Text>
          </View>
        </View>

        {/* ===== SELECT/DROPDOWN ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Select/Dropdown</Text>
          <Select
            label="Choose option"
            value={selectValue}
            onValueChange={(val) => setSelectValue(val as string)}
            options={[
              { label: "Option 1", value: "opt1" },
              { label: "Option 2", value: "opt2" },
              { label: "Option 3", value: "opt3" },
            ]}
          />
        </View>

        {/* ===== SLIDER ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎚️ Slider</Text>
          <Slider
            min={0}
            max={100}
            value={sliderValue}
            onValueChange={setSliderValue}
            label="Volume"
          />
        </View>

        {/* ===== STEPPER ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⬆️⬇️ Stepper</Text>
          <Stepper
            value={stepperValue}
            min={1}
            max={10}
            onValueChange={setStepperValue}
            label="Quantity"
          />
        </View>

        {/* ===== PROGRESS ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Progress Bars</Text>
          <ProgressBar value={sliderValue} label="Download" showLabel />
          <ProgressBar value={75} label="Upload" />
          <View style={{ alignItems: "center", marginTop: 12 }}>
            <CircularProgress value={sliderValue} label="Loading" />
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* ===== ALERTS ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ Alerts</Text>
          <Alert
            title="Success!"
            message="Your action was completed successfully"
            type="success"
            containerStyle={styles.alertContainer}
          />
          <Alert
            title="Warning"
            message="Please review before proceeding"
            type="warning"
            containerStyle={styles.alertContainer}
          />
          <Alert
            title="Error"
            message="Something went wrong"
            type="error"
            containerStyle={styles.alertContainer}
          />
        </View>

        {/* ===== CARDS & BADGES ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎴 Cards & Badges</Text>
          <Card>
            <TextComponent variant="h4" color="primary" style={{ marginBottom: 8 }}>
              Card Title
            </TextComponent>
            <Text style={{ color: "#6b7280", lineHeight: 20 }}>
              This is a card component with shadow, border, and rounded corners.
            </Text>
          </Card>
          <View style={styles.badgeRow}>
            <Badge variant="default">Draft</Badge>
            <Badge variant="primary">New</Badge>
            <Badge variant="secondary">Hot</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="success">Verified</Badge>
            <Badge variant="warning">Pending</Badge>
          </View>
        </View>

        {/* ===== AVATAR ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Avatar</Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Avatar initials="JD" />
            <Avatar initials="AB" backgroundColor="#f97316" />
            <Avatar initials="XY" backgroundColor="#22c55e" />
          </View>
        </View>

        {/* ===== LISTS ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Lists</Text>
          <List
            items={[
              { id: 1, title: "Item 1", subtitle: "Subtitle 1" },
              { id: 2, title: "Item 2", subtitle: "Subtitle 2" },
              { id: 3, title: "Item 3", subtitle: "Subtitle 3" },
            ]}
          />
        </View>

        {/* ===== TABS ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📑 Tabs</Text>
          <Tabs
            tabs={[
              { label: "Tab 1", content: <Text>Content for tab 1</Text> },
              { label: "Tab 2", content: <Text>Content for tab 2</Text> },
              { label: "Tab 3", content: <Text>Content for tab 3</Text> },
            ]}
            containerStyle={styles.tabContainer}
          />
        </View>

        {/* ===== ACCORDION ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📂 Accordion</Text>
          <Accordion
            items={[
              { id: 1, title: "Section 1", content: "Content for section 1" },
              { id: 2, title: "Section 2", content: "Content for section 2" },
              { id: 3, title: "Section 3", content: "Content for section 3" },
            ]}
          />
        </View>

        {/* ===== MODALS & TOOLTIPS ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Modals & Tooltips</Text>
          <Button variant="primary" onPress={() => setModalVisible(true)}>
            Open Modal
          </Button>
          <Tooltip text="This is a helpful tooltip!">
            <Button variant="outline">Hover Me</Button>
          </Tooltip>
          <Modal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="Welcome!"
            closeButtonText="Got it"
          >
            <Text style={{ fontSize: 14, color: "#6b7280", lineHeight: 20 }}>
              This is a modal dialog. You can customize the title, content, and buttons.
            </Text>
          </Modal>
        </View>

        {/* ===== SPINNER ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏳ Spinner</Text>
          <Spinner size="large" label="Loading..." />
        </View>

        {/* ===== SHEET ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📄 Sheet (Bottom Sheet)</Text>
          <Button onPress={() => setSheetVisible(true)}>Open Sheet</Button>
          <Sheet
            visible={sheetVisible}
            onClose={() => setSheetVisible(false)}
            title="Bottom Sheet Example"
            showCloseButton
          >
            <Text style={{ fontSize: 14, color: "#6b7280", lineHeight: 20 }}>
              This is a bottom sheet that slides up from the bottom of the screen. You can drag it down to close.
            </Text>
          </Sheet>
        </View>

        {/* ===== DRAWER ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎪 Drawer (Side Panel)</Text>
          <Button onPress={() => setDrawerVisible(true)}>Open Drawer</Button>
          <Drawer
            visible={drawerVisible}
            onClose={() => setDrawerVisible(false)}
            title="Navigation Drawer"
            position="left"
            showCloseButton
          >
            <Text style={{ fontSize: 14, color: "#6b7280", lineHeight: 20 }}>
              This is a left-side drawer panel. You can drag it to close or tap outside.
            </Text>
          </Drawer>
        </View>

        {/* ===== POPOVER ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Popover</Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Popover
              visible={popoverVisible}
              onClose={() => setPopoverVisible(false)}
              trigger={
                <Button onPress={() => setPopoverVisible(true)} size="sm">
                  Open Popover
                </Button>
              }
              title="Popover Title"
              position="bottom"
            >
              Click outside to close this popover!
            </Popover>
          </View>
        </View>

        {/* ===== DATE PICKER ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Date Picker</Text>
          <Button onPress={() => setDatePickerVisible(true)}>
            {selectedDate.toLocaleDateString()}
          </Button>
          <DatePicker
            visible={datePickerVisible}
            onClose={() => setDatePickerVisible(false)}
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              showToast(`Selected: ${date.toLocaleDateString()}`, "success");
            }}
            showTime={false}
          />
        </View>

        {/* ===== TOAST ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Toast Notifications</Text>
          <View style={styles.buttonRow}>
            <Button size="sm" variant="primary" onPress={() => showToast("Success!", "success")}>
              Success
            </Button>
            <Button size="sm" variant="destructive" onPress={() => showToast("Error!", "error")}>
              Error
            </Button>
          </View>
          <View style={styles.buttonRow}>
            <Button size="sm" variant="outline" onPress={() => showToast("Info!", "info")}>
              Info
            </Button>
            <Button size="sm" variant="secondary" onPress={() => showToast("Warning!", "warning")}>
              Warning
            </Button>
          </View>
        </View>

        {/* Footer */}
        <Divider style={styles.divider} />
        <View style={{ alignItems: "center", gap: 8 }}>
          <TextComponent variant="small" color="muted" align="center">
            Prasanga UI Starter Kit v1.2.0
          </TextComponent>
          <TextComponent variant="caption" color="muted" align="center">
            Built with Expo, TypeScript, and NativeWind
          </TextComponent>
          <TextComponent variant="caption" color="muted" align="center">
            34+ Production-Ready Components
          </TextComponent>
        </View>
      </ScrollView>

      {toastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={3000}
          onDismiss={() => setToastVisible(false)}
        />
      )}
    </SafeAreaView>
  );
}
