/**
 * shadcn-inspired theme system using CSS variables
 * Connects to globals.css @layer base definitions
 * HSL format for easy customization
 */

import { getCSSVariableColor } from "./utils";

export type Theme = "light" | "dark";

/**
 * Generate theme colors from CSS variables
 * Converts HSL CSS variables to React Native hex colors
 */
function generateTheme(isDark: boolean) {
  return {
    // Backgrounds
    background: getCSSVariableColor("background", isDark),
    foreground: getCSSVariableColor("foreground", isDark),
    muted: getCSSVariableColor("muted", isDark),
    mutedForeground: getCSSVariableColor("muted-foreground", isDark),

    // Primary (Neutral in light, White in dark)
    primary: getCSSVariableColor("primary", isDark),
    primaryForeground: getCSSVariableColor("primary-foreground", isDark),
    primaryLight: getCSSVariableColor("secondary", isDark), // Updated to use secondary for consistency

    // Secondary (Light Gray in light, Dark Gray in dark)
    secondary: getCSSVariableColor("secondary", isDark),
    secondaryForeground: getCSSVariableColor("secondary-foreground", isDark),
    secondaryLight: getCSSVariableColor("secondary", isDark),

    // Destructive (Red)
    destructive: getCSSVariableColor("destructive", isDark),
    destructiveForeground: getCSSVariableColor("destructive-foreground", isDark),
    destructiveLight: getCSSVariableColor("secondary", isDark),

    // Accent
    accent: getCSSVariableColor("accent", isDark),
    accentForeground: getCSSVariableColor("accent-foreground", isDark),
    accentLight: getCSSVariableColor("secondary", isDark),

    // Success (Green)
    success: getCSSVariableColor("success", isDark),
    successForeground: getCSSVariableColor("success-foreground", isDark),
    successLight: getCSSVariableColor("secondary", isDark),

    // Warning (Orange)
    warning: getCSSVariableColor("warning", isDark),
    warningForeground: getCSSVariableColor("warning-foreground", isDark),
    warningLight: getCSSVariableColor("secondary", isDark),

    // Border & input
    border: getCSSVariableColor("border", isDark),
    input: getCSSVariableColor("input", isDark),
    inputBorder: getCSSVariableColor("border", isDark),

    // Card & surfaces
    card: getCSSVariableColor("card", isDark),
    cardForeground: getCSSVariableColor("card-foreground", isDark),

    // Popover
    popover: getCSSVariableColor("popover", isDark),
    popoverForeground: getCSSVariableColor("popover-foreground", isDark),

    // Skeleton loading
    skeleton: getCSSVariableColor("skeleton", isDark),
  };
}

// Light theme - generated from CSS variables
export const lightTheme = generateTheme(false);

// Dark theme - generated from CSS variables
export const darkTheme = generateTheme(true);

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
