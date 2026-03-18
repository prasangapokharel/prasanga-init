/**
 * ============================================================================
 * Prasanga UI - Types Barrel Export
 * ============================================================================
 * Centralized export point for all TypeScript types
 * Use: import type { User, ApiResponse } from "@/types"
 * ============================================================================
 */

// Common types
export type {
  ApiResponse,
  PaginationMeta,
  PaginatedResponse,
  PaginationParams,
  ApiError,
  LoadingState,
  AsyncState,
  FieldError,
  FormErrors,
  Nullable,
  Optional,
  SuccessResponse,
  ErrorResponse,
  Timestamps,
  Entity,
} from "./common";

// API types
export type {
  LoginRequest,
  RegisterRequest,
  UserRole,
  UserStatus,
  User,
  UserProfile,
  AuthResponse,
  LoginResponse,
  RegisterResponse,
  RefreshTokenResponse,
  UserListResponse,
  HealthCheckResponse,
  ComponentDemo,
  CreateUserRequest,
  UpdateUserRequest,
} from "./api";

// User domain types
export type {
  UserProfileExtended,
  UserPreferences,
  UserPermissions,
  UserActivityLog,
  UserSession,
  UserFormData,
  UserFilterOptions,
  UserSortOptions,
  BulkUserOperation,
  UserStatistics,
} from "./user";

// Theme types
export type {
  ColorScheme,
  ThemeMode,
  ColorPalette,
  ShadowDefinition,
  ShadowPalette,
  TypographySettings,
  ThemeConfig,
  ResolvedTheme,
  ThemeContextValue,
} from "./theme";

// Component types
export type {
  CommonComponentProps,
  ClickableComponentProps,
  FormFieldProps,
  InputProps,
  SelectProps,
  SelectOption,
  CheckboxProps,
  RadioProps,
  ButtonProps,
  BadgeProps,
  CardProps,
  ModalProps,
  ModalAction,
  ToastMessage,
  AlertProps,
  SeparatorProps,
  ListProps,
  ListItemProps,
  SpinnerProps,
  ProgressProps,
  TooltipProps,
  PopoverProps,
} from "./component";
