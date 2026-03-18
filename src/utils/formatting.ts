/**
 * ============================================================================
 * Formatting Utilities - Data Formatting Helper Functions
 * ============================================================================
 * Pure utility functions for formatting and transforming data
 * ============================================================================
 */

/**
 * Format number as currency
 */
export function formatCurrency(value: number, currency: string = "USD", locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

/**
 * Format number with commas
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format number as percentage
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format bytes to human-readable size
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Format date to locale string
 */
export function formatDate(date: string | Date, locale: string = "en-US"): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale);
}

/**
 * Format date time to locale string
 */
export function formatDateTime(date: string | Date, locale: string = "en-US"): string {
  const d = new Date(date);
  return d.toLocaleString(locale);
}

/**
 * Format time to HH:MM:SS
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

/**
 * Format duration in seconds to readable string
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.floor(seconds % 60)}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date, baseDate: Date = new Date()): string {
  const d = new Date(date);
  const diffMs = baseDate.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);

  if (diffSecs < 60) return "just now";
  if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
  if (diffSecs < 86400) return `${Math.floor(diffSecs / 3600)}h ago`;
  if (diffSecs < 604800) return `${Math.floor(diffSecs / 86400)}d ago`;

  return formatDate(d);
}

/**
 * Format phone number to readable format
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (digits.length === 11 && digits[0] === "1") {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  return phone;
}

/**
 * Format credit card number (mask all but last 4 digits)
 */
export function formatCreditCard(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, "");
  const lastFour = digits.slice(-4);
  return `**** **** **** ${lastFour}`;
}

/**
 * Format email (mask local part except first letter)
 */
export function formatEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  return `${local[0]}${"*".repeat(local.length - 2)}@${domain}`;
}

/**
 * Truncate string with ellipsis
 */
export function truncate(text: string, length: number, ellipsis: string = "..."): string {
  if (text.length <= length) return text;
  return text.slice(0, length - ellipsis.length) + ellipsis;
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Capitalize each word
 */
export function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

/**
 * Convert camelCase to space-separated
 */
export function camelToSpace(text: string): string {
  return text.replace(/([A-Z])/g, " $1").trim();
}

/**
 * Convert snake_case to space-separated
 */
export function snakeToSpace(text: string): string {
  return text.replace(/_/g, " ").trim();
}

/**
 * Slugify string (for URLs)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Format JSON with pretty printing
 */
export function formatJSON(obj: any, indent: number = 2): string {
  return JSON.stringify(obj, null, indent);
}

/**
 * Format boolean as Yes/No
 */
export function formatBoolean(value: boolean): string {
  return value ? "Yes" : "No";
}

/**
 * Format array as comma-separated list with "and"
 */
export function formatList(items: string[], conjunction: string = "and"): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;

  const lastItem = items[items.length - 1];
  const restItems = items.slice(0, -1).join(", ");
  return `${restItems}, ${conjunction} ${lastItem}`;
}

/**
 * Format object to readable string representation
 */
export function formatObject(obj: Record<string, any>): string {
  return Object.entries(obj)
    .map(([key, value]) => `${key}: ${typeof value === "object" ? JSON.stringify(value) : value}`)
    .join(", ");
}
