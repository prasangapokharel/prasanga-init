/**
 * Merge Tailwind CSS classes with proper conflict resolution
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
 * Create platform-specific styles
 * Useful for handling iOS/Android differences
 */
export const platformSpecificStyles = {
  ios: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  android: {
    elevation: 5,
  },
};

