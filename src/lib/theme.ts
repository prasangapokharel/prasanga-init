/**
 * shadcn-inspired theme system for light and dark modes
 * Uses official shadcn color palette with HSL values
 */

export type Theme = "light" | "dark";

// Light theme - shadcn light mode
export const lightTheme = {
  // Backgrounds
  background: "#ffffff", // 0 0% 100%
  foreground: "#0f172a", // 222.2 84% 4.9%
  muted: "#f1f5f9", // 210 40% 96.1%
  mutedForeground: "#64748b", // 215.4 16.3% 46.9%

  // Primary (Blue) - 221.2 83.2% 53.3%
  primary: "#3b82f6",
  primaryForeground: "#f8fafc", // 210 40% 98%
  primaryLight: "#eff6ff", // Light variant

  // Secondary (Gray) - 210 40% 96.1%
  secondary: "#f1f5f9",
  secondaryForeground: "#1e293b", // 222.2 47.4% 11.2%
  secondaryLight: "#f1f5f9",

  // Destructive (Red) - 0 84.2% 60.2%
  destructive: "#ef4444",
  destructiveForeground: "#f8fafc", // 210 40% 98%
  destructiveLight: "#fee2e2",

  // Accent (Gray) - 210 40% 96.1%
  accent: "#f1f5f9",
  accentForeground: "#1e293b", // 222.2 47.4% 11.2%
  accentLight: "#f1f5f9",

  // Success (Green)
  success: "#22c55e",
  successForeground: "#f8fafc",
  successLight: "#f0fdf4",

  // Warning (Orange)
  warning: "#f59e0b",
  warningForeground: "#f8fafc",
  warningLight: "#fffbeb",

  // Border & divider - 214.3 31.8% 91.4%
  border: "#e2e8f0",
  input: "#e2e8f0",
  inputBorder: "#cbd5e1",

  // Card & surfaces
  card: "#ffffff", // 0 0% 100%
  cardForeground: "#0f172a", // 222.2 84% 4.9%

  // Popover
  popover: "#ffffff",
  popoverForeground: "#0f172a",

  // Skeleton loading
  skeleton: "#e2e8f0",
};

// Dark theme - shadcn dark mode
export const darkTheme = {
  // Backgrounds
  background: "#0f172a", // 222.2 84% 4.9%
  foreground: "#f8fafc", // 210 40% 98%
  muted: "#1e293b", // 217.2 32.6% 17.5%
  mutedForeground: "#a1a5b8", // 215 20.2% 65.1%

  // Primary (Blue) - 217.2 91.2% 59.8%
  primary: "#60a5fa",
  primaryForeground: "#1e293b", // 222.2 47.4% 11.2%
  primaryLight: "#1e3a8a",

  // Secondary (Gray) - 217.2 32.6% 17.5%
  secondary: "#1e293b",
  secondaryForeground: "#f8fafc", // 210 40% 98%
  secondaryLight: "#0f172a",

  // Destructive (Red) - 0 62.8% 30.6%
  destructive: "#dc2626",
  destructiveForeground: "#f8fafc", // 210 40% 98%
  destructiveLight: "#4c1f1f",

  // Accent (Gray) - 217.2 32.6% 17.5%
  accent: "#1e293b",
  accentForeground: "#f8fafc", // 210 40% 98%
  accentLight: "#0f172a",

  // Success (Green)
  success: "#22c55e",
  successForeground: "#1e293b",
  successLight: "#1f3a1f",

  // Warning (Orange)
  warning: "#f59e0b",
  warningForeground: "#1e293b",
  warningLight: "#3f2817",

  // Border & divider - 217.2 32.6% 17.5%
  border: "#1e293b",
  input: "#1e293b",
  inputBorder: "#334155",

  // Card & surfaces
  card: "#0f172a", // 222.2 84% 4.9%
  cardForeground: "#f8fafc", // 210 40% 98%

  // Popover
  popover: "#0f172a",
  popoverForeground: "#f8fafc",

  // Skeleton loading
  skeleton: "#1e293b",
};

export type ThemeColors = typeof lightTheme;

export const getTheme = (theme: Theme): ThemeColors => {
  return theme === "light" ? lightTheme : darkTheme;
};

export const shadows = {
  sm: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 12,
    elevation: 8,
  },
};

