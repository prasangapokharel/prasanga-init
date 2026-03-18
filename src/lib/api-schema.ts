/**
 * ============================================================================
 * Prasanga UI - API Schema & Configuration
 * ============================================================================
 * Central repository for all API endpoints, request schemas, and responses
 * Used by: API services, TypeScript types, validation, documentation
 * ============================================================================
 */

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    VERIFY: "/auth/verify",
  },

  // Users
  USERS: {
    GET_ALL: "/users",
    GET_BY_ID: (id: string) => `/users/${id}`,
    CREATE: "/users",
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    GET_PROFILE: "/users/profile",
  },

  // Components Demo Data (for showcase)
  COMPONENTS: {
    GET_ALL: "/components",
    GET_BY_ID: (id: string) => `/components/${id}`,
  },

  // Health Check
  HEALTH: "/health",
} as const;

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

export const REQUEST_SCHEMAS = {
  // Login Request
  LOGIN: {
    email: "string (email format)",
    password: "string (min 6 chars)",
  } as const,

  // Register Request
  REGISTER: {
    email: "string (email format)",
    password: "string (min 8 chars, uppercase, number, special char)",
    firstName: "string (min 2 chars)",
    lastName: "string (min 2 chars)",
    phone: "string (optional, E.164 format)",
  } as const,

  // User Create/Update Request
  USER: {
    firstName: "string (required on create)",
    lastName: "string (required on create)",
    email: "string (unique, required on create)",
    phone: "string (optional)",
    role: "enum: 'user' | 'admin' | 'moderator'",
    status: "enum: 'active' | 'inactive' | 'suspended'",
  } as const,

  // Pagination Query
  PAGINATION: {
    page: "number (default: 1, min: 1)",
    limit: "number (default: 20, min: 1, max: 100)",
    sort: "string (field name, prefix with - for desc)",
    search: "string (optional, searches common fields)",
  } as const,
} as const;

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

export const RESPONSE_SCHEMAS = {
  // Success Response (Generic)
  SUCCESS: `{
    success: true,
    message: string,
    data: T (generic data)
  }`,

  // Error Response (Generic)
  ERROR: `{
    success: false,
    error: {
      code: string (e.g., "VALIDATION_ERROR", "NOT_FOUND", "UNAUTHORIZED"),
      message: string,
      details?: { [key: string]: string[] } (field-level errors)
    }
  }`,

  // Auth Response
  AUTH: `{
    success: true,
    data: {
      user: {
        id: string (UUID),
        email: string,
        firstName: string,
        lastName: string,
        role: "user" | "admin" | "moderator",
        status: "active" | "inactive" | "suspended",
        createdAt: ISO8601 timestamp,
        updatedAt: ISO8601 timestamp
      },
      token: string (JWT),
      refreshToken: string,
      expiresIn: number (seconds)
    }
  }`,

  // User List Response
  USER_LIST: `{
    success: true,
    data: {
      users: User[],
      pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number,
        hasNextPage: boolean,
        hasPrevPage: boolean
      }
    }
  }`,

  // User Single Response
  USER: `{
    success: true,
    data: {
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phone: string | null,
      role: string,
      status: string,
      createdAt: ISO8601,
      updatedAt: ISO8601
    }
  }`,

  // Health Check Response
  HEALTH: `{
    success: true,
    data: {
      status: "healthy" | "degraded" | "unhealthy",
      uptime: number (seconds),
      timestamp: ISO8601,
      version: string
    }
  }`,
} as const;

// ============================================================================
// HTTP STATUS CODES & ERROR CODES
// ============================================================================

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const ERROR_CODES = {
  // Validation Errors
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_EMAIL: "INVALID_EMAIL",
  INVALID_PASSWORD: "INVALID_PASSWORD",
  PASSWORD_TOO_SHORT: "PASSWORD_TOO_SHORT",

  // Authentication Errors
  UNAUTHORIZED: "UNAUTHORIZED",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  TOKEN_INVALID: "TOKEN_INVALID",

  // Resource Errors
  NOT_FOUND: "NOT_FOUND",
  ALREADY_EXISTS: "ALREADY_EXISTS",
  FORBIDDEN: "FORBIDDEN",

  // Server Errors
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",

  // Client Errors
  NETWORK_ERROR: "NETWORK_ERROR",
  TIMEOUT: "TIMEOUT",
} as const;

// ============================================================================
// REQUEST/RESPONSE EXAMPLES
// ============================================================================

export const EXAMPLES = {
  // Login Request
  LOGIN_REQUEST: {
    email: "user@example.com",
    password: "SecurePassword123!",
  },

  // Login Response
  LOGIN_RESPONSE: {
    success: true,
    message: "Login successful",
    data: {
      user: {
        id: "550e8400-e29b-41d4-a716-446655440000",
        email: "user@example.com",
        firstName: "John",
        lastName: "Doe",
        role: "user",
        status: "active",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-03-19T14:45:00Z",
      },
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      expiresIn: 3600,
    },
  },

  // Error Response
  ERROR_RESPONSE: {
    success: false,
    error: {
      code: "VALIDATION_ERROR",
      message: "Validation failed",
      details: {
        email: ["Invalid email format"],
        password: ["Password must be at least 8 characters"],
      },
    },
  },

  // User List Response
  USER_LIST_RESPONSE: {
    success: true,
    data: {
      users: [
        {
          id: "550e8400-e29b-41d4-a716-446655440000",
          email: "john@example.com",
          firstName: "John",
          lastName: "Doe",
          role: "user",
          status: "active",
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-03-19T14:45:00Z",
        },
      ],
      pagination: {
        page: 1,
        limit: 20,
        total: 100,
        totalPages: 5,
        hasNextPage: true,
        hasPrevPage: false,
      },
    },
  },
} as const;

// ============================================================================
// TYPESCRIPT TYPES (Generated from schemas above)
// ============================================================================

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: "user" | "admin" | "moderator";
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
};

export type PaginationParams = {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

// ============================================================================
// API CLIENT CONFIGURATION
// ============================================================================

export const API_CONFIG = {
  // Timeouts (milliseconds)
  REQUEST_TIMEOUT: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || "30000"),
  RETRY_ATTEMPTS: parseInt(process.env.EXPO_PUBLIC_API_RETRY_ATTEMPTS || "3"),

  // Base URL
  BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3000/api",

  // Headers
  COMMON_HEADERS: {
    "Content-Type": "application/json",
    "User-Agent": `Prasanga UI v${process.env.EXPO_PUBLIC_APP_VERSION}`,
  },

  // Retry Strategy
  RETRY_CONFIG: {
    maxAttempts: 3,
    backoffMultiplier: 2,
    initialDelayMs: 1000,
  },
} as const;

// ============================================================================
// EXPORT FOR EASY ACCESS
// ============================================================================

export default {
  ENDPOINTS: API_ENDPOINTS,
  REQUEST_SCHEMAS,
  RESPONSE_SCHEMAS,
  HTTP_STATUS_CODES,
  ERROR_CODES,
  EXAMPLES,
  API_CONFIG,
};
