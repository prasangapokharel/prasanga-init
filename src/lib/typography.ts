/**
 * Centralized Typography System
 * Premium, production-grade font sizing and line heights
 * Single source of truth for all component typography
 * Inspired by shadcn/ui design patterns
 */

export const typography = {
  // Hero & Display Text
  display: {
    lg: { fontSize: 32, fontWeight: "700", lineHeight: 40 },
    md: { fontSize: 28, fontWeight: "700", lineHeight: 36 },
    sm: { fontSize: 24, fontWeight: "700", lineHeight: 32 },
  },

  // Headings
  heading: {
    xs: { fontSize: 20, fontWeight: "700", lineHeight: 28 },
    sm: { fontSize: 18, fontWeight: "700", lineHeight: 26 },
    md: { fontSize: 16, fontWeight: "700", lineHeight: 24 },
    lg: { fontSize: 14, fontWeight: "600", lineHeight: 20 },
  },

  // Subheadings (used in cards, modals, alerts)
  subheading: {
    lg: { fontSize: 16, fontWeight: "600", lineHeight: 24 },
    md: { fontSize: 14, fontWeight: "600", lineHeight: 20 },
    sm: { fontSize: 13, fontWeight: "600", lineHeight: 18 },
  },

  // Body Text (default reading text)
  body: {
    lg: { fontSize: 15, fontWeight: "400", lineHeight: 24 },
    md: { fontSize: 14, fontWeight: "400", lineHeight: 22 },
    sm: { fontSize: 13, fontWeight: "400", lineHeight: 20 },
    xs: { fontSize: 12, fontWeight: "400", lineHeight: 18 },
  },

  // Button Text
  button: {
    lg: { fontSize: 14, fontWeight: "600", lineHeight: 20 },
    md: { fontSize: 13, fontWeight: "600", lineHeight: 18 },
    sm: { fontSize: 11, fontWeight: "600", lineHeight: 16 },
  },

  // Label Text (input labels, form labels)
  label: {
    md: { fontSize: 13, fontWeight: "600", lineHeight: 18 },
    sm: { fontSize: 12, fontWeight: "600", lineHeight: 16 },
  },

  // Caption & Helper Text
  caption: {
    md: { fontSize: 12, fontWeight: "500", lineHeight: 16 },
    sm: { fontSize: 11, fontWeight: "400", lineHeight: 14 },
  },

  // Small/Tiny text (badges, tags, chips)
  tiny: {
    md: { fontSize: 11, fontWeight: "500", lineHeight: 14 },
    sm: { fontSize: 10, fontWeight: "500", lineHeight: 12 },
  },

  // Alert/Notification Text
  alert: {
    title: { fontSize: 12, fontWeight: "600", lineHeight: 16 },
    message: { fontSize: 12, fontWeight: "400", lineHeight: 16 },
    close: { fontSize: 14, fontWeight: "600", lineHeight: 18 },
  },

  // Input Text Sizes
  input: {
    lg: { fontSize: 15, fontWeight: "400", lineHeight: 22 },
    md: { fontSize: 14, fontWeight: "400", lineHeight: 20 },
    sm: { fontSize: 12, fontWeight: "400", lineHeight: 18 },
  },

  // Placeholder text
  placeholder: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 20,
  },
} as const;

export type Typography = typeof typography;

/**
 * Get typography preset for quick access
 * @param category - Main typography category
 * @param size - Size variant within category
 * @example getTypography('body', 'md') => { fontSize: 14, fontWeight: "400", lineHeight: 22 }
 */
export function getTypography(
  category: keyof Omit<Typography, "placeholder">,
  size: string
): { fontSize: number; fontWeight: "400" | "500" | "600" | "700"; lineHeight: number } | null {
  const cat = typography[category] as any;
  if (!cat || !cat[size]) return null;
  return cat[size];
}

/**
 * Get combined text style with font weight and line height
 * @param fontSize - Font size in pixels
 * @param fontWeight - Font weight (400, 500, 600, 700)
 * @param lineHeightMultiplier - Multiplier for line height calculation (default: 1.4)
 */
export function createTextStyle(
  fontSize: number,
  fontWeight: "400" | "500" | "600" | "700" = "400",
  lineHeightMultiplier: number = 1.4
) {
  return {
    fontSize,
    fontWeight,
    lineHeight: Math.ceil(fontSize * lineHeightMultiplier),
  };
}
