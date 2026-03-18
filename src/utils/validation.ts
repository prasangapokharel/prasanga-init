/**
 * ============================================================================
 * Validation Utilities - Form Validation Helper Functions
 * ============================================================================
 * Pure utility functions for common validation tasks
 * Uses validation rules from constants
 * ============================================================================
 */

import { VALIDATION_RULES } from "../../constants";

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION_RULES.EMAIL.test(email);
}

/**
 * Validate password strength
 * Checks: minimum length, uppercase, lowercase, number, special character
 */
export function isValidPassword(password: string): boolean {
  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    return false;
  }
  return VALIDATION_RULES.PASSWORD_REGEX.test(password);
}

/**
 * Get password strength score (0-4)
 */
export function getPasswordStrength(password: string): 0 | 1 | 2 | 3 | 4 {
  if (!password) return 0;

  let strength = 0;

  // Length check
  if (password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH) strength++;

  // Uppercase check
  if (/[A-Z]/.test(password)) strength++;

  // Lowercase check
  if (/[a-z]/.test(password)) strength++;

  // Number check
  if (/[0-9]/.test(password)) strength++;

  // Special character check
  if (/[@$!%*?&]/.test(password)) strength++;

  // Return 0-4 scale
  return Math.min(4, Math.ceil((strength / 5) * 4)) as 0 | 1 | 2 | 3 | 4;
}

/**
 * Get password strength label
 */
export function getPasswordStrengthLabel(password: string): string {
  const strength = getPasswordStrength(password);
  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  return labels[strength];
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  return VALIDATION_RULES.PHONE_PATTERN.test(phone);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if string is empty (after trimming)
 */
export function isEmpty(value: string | null | undefined): boolean {
  return !value || value.trim().length === 0;
}

/**
 * Check if value is a valid number
 */
export function isValidNumber(value: any): boolean {
  return !isNaN(value) && isFinite(value);
}

/**
 * Check if value is a valid integer
 */
export function isValidInteger(value: any): boolean {
  return Number.isInteger(value);
}

/**
 * Validate credit card number (Luhn algorithm)
 */
export function isValidCreditCard(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let digit = parseInt(digits[i]);
    if ((digits.length - i - 1) % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  return sum % 10 === 0;
}

/**
 * Validate date string (ISO 8601 format)
 */
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Validate age (minimum years old)
 */
export function isValidAge(birthDate: string | Date, minAge: number): boolean {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age >= minAge;
}

/**
 * Validate username (alphanumeric + underscore, 3-20 chars)
 */
export function isValidUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

/**
 * Validate hex color
 */
export function isValidColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Sanitize email (trim and lowercase)
 */
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Sanitize input (trim, remove extra spaces)
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}

/**
 * Check if all fields in object have values
 */
export function areAllFieldsFilled(obj: Record<string, any>): boolean {
  return Object.values(obj).every((value) => value !== null && value !== undefined && value !== "");
}

/**
 * Get validation error message for a field
 */
export function getValidationErrorMessage(fieldName: string, value: any, fieldType: string): string | null {
  switch (fieldType) {
    case "email":
      return isValidEmail(value) ? null : "Please enter a valid email address";
    case "password":
      return isValidPassword(value) ? null : "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
    case "phone":
      return isValidPhone(value) ? null : "Please enter a valid phone number";
    case "url":
      return isValidUrl(value) ? null : "Please enter a valid URL";
    case "username":
      return isValidUsername(value) ? null : "Username must be 3-20 characters, alphanumeric and underscore only";
    case "color":
      return isValidColor(value) ? null : "Please enter a valid hex color";
    default:
      return null;
  }
}
