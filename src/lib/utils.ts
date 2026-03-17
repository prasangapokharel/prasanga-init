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


