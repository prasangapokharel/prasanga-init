/**
 * ============================================================================
 * Prasanga UI - User Domain Types
 * ============================================================================
 * User-specific types and related types
 * ============================================================================
 */

import type { User, UserRole, UserStatus } from "./api";
import type { Timestamps } from "./common";

/**
 * User Profile with Extended Information
 */
export type UserProfileExtended = User & {
  avatar?: string;
  bio?: string;
  website?: string;
  location?: string;
};

/**
 * User Preferences
 * Stores user-specific settings
 */
export type UserPreferences = {
  userId: string;
  theme: "light" | "dark" | "auto";
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: "public" | "private" | "friends";
    showEmail: boolean;
    showPhone: boolean;
  };
} & Timestamps;

/**
 * User Permissions
 * Fine-grained permission system
 */
export type UserPermissions = {
  userId: string;
  permissions: string[];
  roles: UserRole[];
} & Timestamps;

/**
 * User Activity Log
 * Track user actions for audit trail
 */
export type UserActivityLog = {
  id: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
} & Timestamps;

/**
 * User Session
 * Track active user sessions
 */
export type UserSession = {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: string;
  deviceInfo?: {
    os: string;
    browser: string;
    ipAddress: string;
  };
  isActive: boolean;
} & Timestamps;

/**
 * User Creation/Update Form Data
 */
export type UserFormData = {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
};

/**
 * User Filter Options
 */
export type UserFilterOptions = {
  role?: UserRole;
  status?: UserStatus;
  search?: string;
  page?: number;
  limit?: number;
};

/**
 * User Sort Options
 */
export type UserSortOptions = {
  field: "email" | "firstName" | "lastName" | "createdAt" | "updatedAt";
  direction: "asc" | "desc";
};

/**
 * Bulk User Operation
 */
export type BulkUserOperation = {
  userIds: string[];
  action: "activate" | "deactivate" | "delete" | "changeRole";
  payload?: Record<string, unknown>;
};

/**
 * User Statistics
 */
export type UserStatistics = {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  usersByRole: Record<UserRole, number>;
  usersByStatus: Record<UserStatus, number>;
};
