# Prasanga UI - Complete API Reference

## Overview

This document provides a comprehensive reference for all API endpoints, request/response formats, error handling, and usage examples.

## Table of Contents

1. [Base Configuration](#base-configuration)
2. [Authentication Endpoints](#authentication-endpoints)
3. [User Endpoints](#user-endpoints)
4. [Health Check](#health-check)
5. [Error Handling](#error-handling)
6. [Request/Response Examples](#requestresponse-examples)

---

## Base Configuration

### API Base URL

```
Development: http://localhost:3000/api
Production: https://api.production.com (configured in .env)
```

### Common Headers

```
Content-Type: application/json
User-Agent: Prasanga-UI/1.3.1
Authorization: Bearer <token> (when authenticated)
```

### Timeouts & Retry Logic

- **Request Timeout**: 30 seconds (configurable via `.env`)
- **Retry Attempts**: 3 (on network errors)
- **Backoff Strategy**: Exponential backoff (1s, 2s, 4s)

---

## Authentication Endpoints

### Login

**Endpoint**: `POST /auth/login`

**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": null,
      "role": "user",
      "status": "active",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-03-19T14:45:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": ["Invalid email format"],
      "password": ["Password must be at least 8 characters"]
    }
  }
}
```

**TypeScript Usage**:
```tsx
import { apiService } from "@/services";
import type { LoginRequest, AuthResponse } from "@/types";

const login = async (email: string, password: string) => {
  try {
    const response = await apiService.post<AuthResponse>("/auth/login", {
      email,
      password,
    } as LoginRequest);

    if (response.success) {
      apiService.setTokens(response.data.token, response.data.refreshToken);
      return response.data;
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};
```

---

### Register

**Endpoint**: `POST /auth/register`

**Request**:
```json
{
  "email": "newuser@example.com",
  "password": "SecurePassword123!",
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+1 (555) 123-4567"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "650e8400-e29b-41d4-a716-446655440001",
      "email": "newuser@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "phone": "+1 (555) 123-4567",
      "role": "user",
      "status": "active",
      "createdAt": "2024-03-19T14:45:00Z",
      "updatedAt": "2024-03-19T14:45:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

**Validation Rules**:
- Email: Valid email format
- Password: Min 8 chars, uppercase, lowercase, number, special char
- First Name: Min 2 characters
- Last Name: Min 2 characters
- Phone: Optional, E.164 format

---

### Refresh Token

**Endpoint**: `POST /auth/refresh`

**Request**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

---

### Logout

**Endpoint**: `POST /auth/logout`

**Request**: Empty body

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## User Endpoints

### Get All Users

**Endpoint**: `GET /users?page=1&limit=20&search=&sort=email`

**Query Parameters**:
- `page` - Page number (default: 1, min: 1)
- `limit` - Items per page (default: 20, max: 100)
- `search` - Search term (optional, searches name/email)
- `sort` - Sort field (optional, prefix with `-` for descending)

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "phone": null,
        "role": "user",
        "status": "active",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-03-19T14:45:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

**TypeScript Usage**:
```tsx
import { useApi } from "@/hooks";
import type { UserListResponse } from "@/types";

export function UsersList() {
  const { data, isLoading } = useApi(() =>
    apiService.get<UserListResponse>("/users", {
      page: 1,
      limit: 20,
    })
  );

  return (
    <List
      items={data?.users || []}
      totalPages={data?.pagination.totalPages}
    />
  );
}
```

---

### Get User by ID

**Endpoint**: `GET /users/{id}`

**URL Parameters**:
- `id` - User ID (UUID)

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": null,
    "role": "user",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-03-19T14:45:00Z"
  }
}
```

**TypeScript Usage**:
```tsx
import { useApi } from "@/hooks";
import type { User } from "@/types";

export function UserProfile({ userId }: { userId: string }) {
  const { data: user } = useApi(
    () => apiService.get<User>(`/users/${userId}`)
  );

  return <Text>{user?.firstName} {user?.lastName}</Text>;
}
```

---

### Create User

**Endpoint**: `POST /users`

**Request**:
```json
{
  "email": "newuser@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+1 (555) 123-4567",
  "password": "SecurePassword123!",
  "role": "user",
  "status": "active"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "650e8400-e29b-41d4-a716-446655440001",
    "email": "newuser@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "+1 (555) 123-4567",
    "role": "user",
    "status": "active",
    "createdAt": "2024-03-19T14:45:00Z",
    "updatedAt": "2024-03-19T14:45:00Z"
  }
}
```

---

### Update User

**Endpoint**: `PUT /users/{id}`

**Request**:
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+1 (555) 987-6543",
  "status": "active"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Smith",
    "phone": "+1 (555) 987-6543",
    "role": "user",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-03-19T15:00:00Z"
  }
}
```

---

### Delete User

**Endpoint**: `DELETE /users/{id}`

**Response** (200 OK):
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Health Check

**Endpoint**: `GET /health`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "uptime": 86400,
    "timestamp": "2024-03-19T15:45:00Z",
    "version": "1.3.1"
  }
}
```

---

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {
      "fieldName": ["Error message for field"]
    }
  }
}
```

### Common Error Codes

| Code | Status | Description | Action |
|------|--------|-------------|--------|
| `VALIDATION_ERROR` | 400 | Invalid request data | Check `details` for field errors |
| `UNAUTHORIZED` | 401 | Missing/invalid token | Re-authenticate (call login) |
| `FORBIDDEN` | 403 | Insufficient permissions | Check user role/permissions |
| `NOT_FOUND` | 404 | Resource doesn't exist | Verify ID is correct |
| `CONFLICT` | 409 | Resource already exists | Use different data (e.g., email) |
| `INTERNAL_SERVER_ERROR` | 500 | Server error | Retry or contact support |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily down | Retry with backoff |

### Error Handling in Code

```tsx
import { isAuthError, isForbiddenError, formatApiErrorForDisplay } from "@/utils";

try {
  const response = await apiService.get("/users/123");
} catch (error) {
  if (isAuthError(error)) {
    // Redirect to login
    navigation.navigate("Login");
  } else if (isForbiddenError(error)) {
    // Show permission denied message
    showAlert("You don't have permission to access this resource");
  } else {
    // Show generic error
    showAlert(formatApiErrorForDisplay(error));
  }
}
```

---

## Request/Response Examples

### Complete Login Flow

```tsx
import { apiService } from "@/services";
import { useApi } from "@/hooks";
import type { AuthResponse } from "@/types";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, error, refetch } = useApi(
    async () => {
      return apiService.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
    },
    { autoFetch: false }
  );

  const handleLogin = async () => {
    const response = await refetch();
    if (response.success) {
      // Store tokens
      apiService.setTokens(response.data.token, response.data.refreshToken);
      // Navigate to home
      navigation.navigate("Home");
    }
  };

  return (
    <View>
      <Input value={email} onChangeText={setEmail} placeholder="Email" />
      <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <Button
        label={state === "loading" ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={state === "loading"}
      />
      {error && <Alert message={error.message} type="error" />}
    </View>
  );
}
```

### Paginated List with Retry

```tsx
import { useApi, usePagination } from "@/hooks";
import { isRetriableError, retryApiCall } from "@/utils";
import type { UserListResponse } from "@/types";

export function UsersList() {
  const { page, nextPage, prevPage } = usePagination({
    initialPage: 1,
    initialLimit: 20,
  });

  const { data, isLoading, error, refetch } = useApi(async () => {
    return retryApiCall(
      () =>
        apiService.get<UserListResponse>("/users", {
          page,
          limit: 20,
        }),
      3 // Max retry attempts
    );
  });

  return (
    <View>
      <FlatList
        data={data?.users || []}
        renderItem={({ item }) => <UserCard user={item} />}
        refreshing={isLoading}
        onRefresh={refetch}
      />
      <View style={styles.pagination}>
        <Button label="Previous" onPress={prevPage} disabled={!data?.pagination.hasPrevPage} />
        <Text>Page {page}</Text>
        <Button label="Next" onPress={nextPage} disabled={!data?.pagination.hasNextPage} />
      </View>
    </View>
  );
}
```

---

## Best Practices

1. **Always use `apiService`** - Never use `fetch` directly
2. **Handle errors properly** - Use error utility functions
3. **Use TypeScript types** - Import types from `@/types`
4. **Implement retry logic** - Use `retryApiCall` or `useApi` hook
5. **Store tokens securely** - Use `apiService.setTokens()`
6. **Check authentication** - Redirect to login on 401
7. **Validate input** - Check constraints before sending
8. **Show loading states** - Use component loading indicators
9. **Cache responses** - Use `createApiCache()` for expensive calls
10. **Log API errors** - Use dev tools for debugging

---

## See Also

- [Project Structure Guide](./STRUCTURE.md) - Folder organization
- [Setup Guide](./SETUP.md) - Getting started
- [Component Library](./COMPONENTS.md) - All 33 components
- [Contributing Guide](./CONTRIBUTING.md) - Development workflow
