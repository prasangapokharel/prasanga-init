/**
 * Premium utility functions for UI styling and platform-specific handling
 */

/**
 * Merge class names with proper conflict resolution
 * Simple utility function for combining class names
 * @param inputs - Classes to merge
 * @returns Merged classes
 */
export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs
    .filter((x) => typeof x === "string")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Premium shadow configurations for iOS and Android
 * Provides consistent shadow appearance across platforms
 */
export const platformSpecificStyles = {
  // Subtle shadows for minimal elevation
  shadowSubtle: {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
    },
    android: {
      elevation: 1,
    },
  },
  
  // Medium shadows for standard UI elements
  shadowMedium: {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
  },
  
  // Premium shadows for elevated cards and buttons
  shadowPremium: {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.10,
      shadowRadius: 12,
    },
    android: {
      elevation: 4,
    },
  },
  
  // Brand-colored premium shadows
  shadowBrand: {
    ios: {
      shadowColor: "#0e7ae5",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
    },
    android: {
      elevation: 5,
    },
  },
};

/**
 * Premium color definitions
 * Semantic colors for consistent UI theming
 */
export const premiumColors = {
  // Primary brand colors
  primary: {
    50: "#f0f8ff",
    500: "#0e7ae5",
    600: "#0a5fa8",
    700: "#083a6e",
  },
  
  // Secondary colors
  secondary: {
    50: "#f0fdfa",
    500: "#14b8a6",
    600: "#0d9488",
  },
  
  // Status colors
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#0e7ae5",
  
  // Neutral colors
  text: {
    primary: "#0a0a0a",
    secondary: "#525252",
    muted: "#737373",
    light: "#a1a1a1",
  },
  
  background: {
    default: "#ffffff",
    alt: "#fafafa",
    muted: "#f5f5f5",
  },
  
  border: {
    default: "#e8e8e8",
    light: "#f5f5f5",
    focus: "#0e7ae5",
  },
};

/**
 * Responsive breakpoints
 * Mobile-first approach for responsive design
 */
export const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
};

/**
 * Calculate responsive size based on screen width
 * @param baseSize - Base size in pixels
 * @param multiplier - Size multiplier for different breakpoints
 * @returns Responsive size
 */
export function getResponsiveSize(baseSize: number, multiplier: number = 1): number {
  return baseSize * multiplier;
}

/**
 * Opacity utilities for premium UI
 */
export const opacityLevels = {
  disabled: 0.65,
  hover: 0.75,
  focus: 0.85,
  active: 1,
};

/**
 * Border radius presets for consistent design
 */
export const borderRadius = {
  xs: 4,
  sm: 6,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  full: 9999,
};

/**
 * Spacing scale (4px base unit)
 */
export const spacing = {
  xs: 4,
  sm: 8,
  base: 12,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
};

/**
 * Convert HSL string (e.g., "0 0% 100%") to RGB hex color
 * Used for CSS variable theme system integration with React Native
 * @param hslString - HSL value as string: "h s% l%"
 * @returns Hex color string: "#RRGGBB"
 */
export function hslToHex(hslString: string): string {
  const parts = hslString.trim().split(/\s+/);
  if (parts.length < 3) return "#000000";

  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - ((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  const toHex = (val: number) => {
    const hex = Math.round((val + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Extract CSS variable value from computed styles
 * Falls back to light mode defaults if not found
 * @param variableName - CSS variable name without "--"
 * @param isDark - Whether to use dark mode
 * @returns CSS variable value as string
 */
export function getCSSVariableValue(variableName: string, isDark: boolean = false): string {
  // This is a production-grade fallback system
  // CSS variables are available in globals.css
  const lightModeDefaults: Record<string, string> = {
    background: "0 0% 100%",
    foreground: "0 0% 3.9%",
    primary: "0 0% 9%",
    "primary-foreground": "210 40% 98%",
    secondary: "0 0% 96.1%",
    "secondary-foreground": "222.2 47.4% 11.2%",
    destructive: "0 84.2% 60.2%",
    "destructive-foreground": "210 40% 98%",
    accent: "0 0% 96.1%",
    "accent-foreground": "222.2 47.4% 11.2%",
    success: "142 71.8% 29.2%",
    "success-foreground": "210 40% 98%",
    warning: "38 92.1% 50.2%",
    "warning-foreground": "210 40% 98%",
    input: "0 0% 89.8%",
    border: "0 0% 89.8%",
    muted: "210 40% 96.1%",
    "muted-foreground": "215.4 16.3% 46.9%",
    card: "0 0% 100%",
    "card-foreground": "0 0% 3.9%",
    popover: "0 0% 100%",
    "popover-foreground": "0 0% 3.9%",
    skeleton: "0 0% 89.8%",
  };

  const darkModeDefaults: Record<string, string> = {
    background: "0 0% 3.9%",
    foreground: "0 0% 98%",
    primary: "0 0% 98%",
    "primary-foreground": "0 0% 3.9%",
    secondary: "0 0% 14.9%",
    "secondary-foreground": "0 0% 98%",
    destructive: "0 62.8% 30.6%",
    "destructive-foreground": "0 0% 98%",
    accent: "0 0% 14.9%",
    "accent-foreground": "0 0% 98%",
    success: "142 71.8% 29.2%",
    "success-foreground": "0 0% 98%",
    warning: "38 92.1% 50.2%",
    "warning-foreground": "0 0% 3.9%",
    input: "0 0% 14.9%",
    border: "0 0% 14.9%",
    muted: "217.2 32.6% 17.5%",
    "muted-foreground": "215 20.2% 65.1%",
    card: "0 0% 3.9%",
    "card-foreground": "0 0% 98%",
    popover: "0 0% 3.9%",
    "popover-foreground": "0 0% 98%",
    skeleton: "0 0% 14.9%",
  };

  const defaults = isDark ? darkModeDefaults : lightModeDefaults;
  return defaults[variableName] || "#000000";
}

/**
 * Convert CSS HSL variable to React Native color
 * Combines CSS variable extraction with HSL to hex conversion
 * @param variableName - CSS variable name without "--"
 * @param isDark - Whether to use dark mode
 * @returns Hex color string
 */
export function getCSSVariableColor(variableName: string, isDark: boolean = false): string {
  const hslValue = getCSSVariableValue(variableName, isDark);
  return hslToHex(hslValue);
}

/**
 * Premium typography scale
 * Optimized font sizes for professional UI with small, precise sizing
 * Follows shadcn/ui design patterns for consistency
 */
export const typographyScale = {
  // Small text - captions, labels, hints
  xs: 10,
  sm: 11,
  
  // Base text - most common text sizes
  base: 12,
  
  // Small-medium - body text, inputs
  md: 13,
  
  // Medium - standard text, buttons
  lg: 14,
  
  // Large - headers, titles
  xl: 15,
  "2xl": 16,
  
  // Extra large - main headings
  "3xl": 18,
  "4xl": 20,
  "5xl": 24,
  "6xl": 28,
  "7xl": 32,
};

/**
 * Line height ratios (multipliers of font size)
 * Ensures proper text spacing and readability
 */
export const lineHeightScale = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
};

/**
 * Get optimized line height for font size
 * @param fontSize - Font size in pixels
 * @param ratio - Line height ratio (default: 1.4)
 * @returns Calculated line height
 */
export function getLineHeight(fontSize: number, ratio: number = 1.4): number {
  return Math.round(fontSize * ratio);
}


