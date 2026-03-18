/**
 * ============================================================================
 * useValidation - Custom Hook for Form Validation
 * ============================================================================
 * Form validation hook using rules from constants
 * Provides field-level validation and error management
 * ============================================================================
 */

import { useState, useCallback } from "react";
import { VALIDATION_RULES } from "../../constants";
import type { FormErrors, FieldError } from "../types";

/**
 * Validation Rule Type
 */
export type ValidationRule = {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: (value: any) => boolean | string;
  custom?: (value: any) => string | undefined;
};

/**
 * Form Values Type
 */
export type FormValues = Record<string, any>;

/**
 * useValidation Hook Options
 */
interface UseValidationOptions {
  /** Called when validation completes */
  onValidate?: (isValid: boolean, errors: FormErrors) => void;
}

/**
 * useValidation Hook Return Type
 */
interface UseValidationReturn {
  /** Current form errors */
  errors: FormErrors;
  /** Validate a single field */
  validateField: (name: string, value: any, rules: ValidationRule) => string[];
  /** Validate all fields */
  validateForm: (values: FormValues, rules: Record<string, ValidationRule>) => FormErrors;
  /** Clear errors for a field */
  clearFieldError: (name: string) => void;
  /** Clear all errors */
  clearErrors: () => void;
  /** Set custom error for a field */
  setFieldError: (name: string, message: string) => void;
  /** Check if a specific field has errors */
  hasError: (name: string) => boolean;
  /** Get error message for a field */
  getError: (name: string) => string | undefined;
}

/**
 * Validate email format
 */
function validateEmail(email: string): boolean {
  return VALIDATION_RULES.EMAIL.test(email);
}

/**
 * Validate password strength
 */
function validatePassword(password: string): boolean {
  return (
    password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH &&
    VALIDATION_RULES.PASSWORD_REGEX.test(password)
  );
}

/**
 * Validate phone number format
 */
function validatePhone(phone: string): boolean {
  return VALIDATION_RULES.PHONE_PATTERN.test(phone);
}

/**
 * Hook for form field validation
 * @param options - Hook configuration options
 * @returns Object containing validation state and methods
 */
export function useValidation(options: UseValidationOptions = {}): UseValidationReturn {
  const { onValidate } = options;
  const [errors, setErrors] = useState<FormErrors>({});

  /**
   * Validate a single field against a rule
   */
  const validateField = useCallback(
    (name: string, value: any, rule: ValidationRule): string[] => {
      const fieldErrors: string[] = [];

      // Check required
      if (rule.required) {
        const isEmpty = value === undefined || value === null || value === "";
        if (isEmpty) {
          const message = typeof rule.required === "string" ? rule.required : "This field is required";
          fieldErrors.push(message);
          return fieldErrors;
        }
      }

      // Skip further validation if value is empty and not required
      if (!rule.required && (value === undefined || value === null || value === "")) {
        return fieldErrors;
      }

      // Check minLength
      if (rule.minLength) {
        const minLengthConfig = rule.minLength as any;
        const config = typeof minLengthConfig === "object" ? minLengthConfig : { value: minLengthConfig };
        if (String(value).length < config.value) {
          const message = config.message || `Must be at least ${config.value} characters`;
          fieldErrors.push(message);
        }
      }

      // Check maxLength
      if (rule.maxLength) {
        const maxLengthConfig = rule.maxLength as any;
        const config = typeof maxLengthConfig === "object" ? maxLengthConfig : { value: maxLengthConfig };
        if (String(value).length > config.value) {
          const message = config.message || `Must be no more than ${config.value} characters`;
          fieldErrors.push(message);
        }
      }

      // Check pattern
      if (rule.pattern) {
        const patternConfig = rule.pattern as any;
        const pattern = typeof patternConfig === "object" && patternConfig.value ? patternConfig.value : patternConfig;
        const message = typeof patternConfig === "object" && patternConfig.message ? patternConfig.message : "Invalid format";

        if (!pattern.test(String(value))) {
          fieldErrors.push(message);
        }
      }

      // Check custom validation function
      if (rule.validate) {
        const result = rule.validate(value);
        if (result !== true) {
          fieldErrors.push(typeof result === "string" ? result : "Validation failed");
        }
      }

      // Check custom validator
      if (rule.custom) {
        const result = rule.custom(value);
        if (result) {
          fieldErrors.push(result);
        }
      }

      return fieldErrors;
    },
    []
  );

  /**
   * Validate entire form
   */
  const validateForm = useCallback(
    (values: FormValues, rules: Record<string, ValidationRule>): FormErrors => {
      const newErrors: FormErrors = {};

      Object.entries(rules).forEach(([fieldName, rule]) => {
        const fieldErrors = validateField(fieldName, values[fieldName], rule);
        if (fieldErrors.length > 0) {
          newErrors[fieldName] = fieldErrors;
        }
      });

      setErrors(newErrors);
      onValidate?.(Object.keys(newErrors).length === 0, newErrors);

      return newErrors;
    },
    [validateField, onValidate]
  );

  /**
   * Clear error for a specific field
   */
  const clearFieldError = useCallback((name: string) => {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  }, []);

  /**
   * Clear all errors
   */
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  /**
   * Set custom error for a field
   */
  const setFieldError = useCallback((name: string, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: [message],
    }));
  }, []);

  /**
   * Check if field has errors
   */
  const hasError = useCallback(
    (name: string): boolean => {
      return (errors[name]?.length ?? 0) > 0;
    },
    [errors]
  );

  /**
   * Get first error message for a field
   */
  const getError = useCallback(
    (name: string): string | undefined => {
      return errors[name]?.[0];
    },
    [errors]
  );

  return {
    errors,
    validateField,
    validateForm,
    clearFieldError,
    clearErrors,
    setFieldError,
    hasError,
    getError,
  };
}

/**
 * Preset validators for common fields
 */
export const validators = {
  email: (value: string): string | undefined => {
    if (!validateEmail(value)) {
      return "Please enter a valid email address";
    }
    return undefined;
  },

  password: (value: string): string | undefined => {
    if (!validatePassword(value)) {
      return `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters and contain uppercase, lowercase, number, and special character`;
    }
    return undefined;
  },

  phone: (value: string): string | undefined => {
    if (!validatePhone(value)) {
      return "Please enter a valid phone number";
    }
    return undefined;
  },

  url: (value: string): string | undefined => {
    try {
      new URL(value);
      return undefined;
    } catch {
      return "Please enter a valid URL";
    }
  },

  required: (value: any): string | undefined => {
    if (value === undefined || value === null || value === "") {
      return "This field is required";
    }
    return undefined;
  },
};

export default useValidation;
