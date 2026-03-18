/**
 * ============================================================================
 * Prasanga UI - API Types
 * ============================================================================
 * Types derived from API schema (api-schema.ts)
 * ============================================================================
 */

import type { Timestamps, Entity, Nullable } from "./common";

/**
 * Authentication Request Types
 */
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

/**
 * User Types
 */
export type UserRole = "user" | "admin" | "moderator";

export type UserStatus = "active" | "inactive" | "suspended";

export type User = Entity<{
  email: string;
  firstName: string;
  lastName: string;
  phone: Nullable<string>;
  role: UserRole;
  status: UserStatus;
}>;

export type UserProfile = User & {
  avatar?: string;
  bio?: string;
  permissions: string[];
};

/**
 * Authentication Response Types
 */
export type AuthResponse = {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
};

export type LoginResponse = {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
};

export type RegisterResponse = {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
};

export type RefreshTokenResponse = {
  token: string;
  refreshToken: string;
  expiresIn: number;
};

/**
 * User List Response
 */
export type UserListResponse = {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

/**
 * Health Check Response
 */
export type HealthCheckResponse = {
  status: "healthy" | "degraded" | "unhealthy";
  uptime: number;
  timestamp: string;
  version: string;
};

/**
 * Component Demo Data Types
 */
export type ComponentDemo = Entity<{
  name: string;
  description: string;
  category: string;
  code: string;
  props?: Record<string, string>;
}>;

/**
 * Request Payload Types (for API calls)
 */
export type CreateUserRequest = {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  password: string;
  role?: UserRole;
  status?: UserStatus;
};

export type UpdateUserRequest = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: Nullable<string>;
  role?: UserRole;
  status?: UserStatus;
};
