/**
 * ============================================================================
 * Prasanga UI - Theme Types
 * ============================================================================
 * Type definitions for theming system
 * ============================================================================
 */

/**
 * Color Scheme
 * Light or dark mode
 */
export type ColorScheme = "light" | "dark";

/**
 * Theme Mode
 * Allows auto-detection based on system preference
 */
export type ThemeMode = "light" | "dark" | "auto";

/**
 * Color Palette
 * Complete set of colors for a theme
 */
export type ColorPalette = {
  // Semantic colors
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;

  // Neutral colors
  background: string;
  surface: string;
  surfaceVariant: string;
  border: string;
  divider: string;

  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;

  // State colors
  disabled: string;
  placeholder: string;

  // Status colors
  ok: string;
  pending: string;
  failed: string;
};

/**
 * Shadow Definitions
 */
export type ShadowDefinition = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

/**
 * Shadow Palette
 * Pre-defined shadow depths
 */
export type ShadowPalette = {
  none: ShadowDefinition;
  xs: ShadowDefinition;
  sm: ShadowDefinition;
  md: ShadowDefinition;
  lg: ShadowDefinition;
  xl: ShadowDefinition;
};

/**
 * Typography Settings
 */
export type TypographySettings = {
  fontSize: number;
  fontWeight: "400" | "500" | "600" | "700";
  lineHeight: number;
  letterSpacing?: number;
};

/**
 * Theme Configuration
 * Complete theme definition
 */
export type ThemeConfig = {
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };
  shadows: ShadowPalette;
  spacing: Record<string, number>;
  borderRadius: Record<string, number>;
  zIndex: Record<string, number>;
  typography: Record<string, TypographySettings>;
};

/**
 * Resolved Theme
 * The actual theme being used (light or dark)
 */
export type ResolvedTheme = {
  scheme: ColorScheme;
  colors: ColorPalette;
  shadows: ShadowPalette;
  spacing: Record<string, number>;
  borderRadius: Record<string, number>;
  zIndex: Record<string, number>;
  typography: Record<string, TypographySettings>;
};

/**
 * Theme Context Value
 * Provided by ThemeProvider
 */
export type ThemeContextValue = {
  scheme: ColorScheme;
  mode: ThemeMode;
  theme: ResolvedTheme;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
};
