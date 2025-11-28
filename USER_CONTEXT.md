# UserContext Documentation

## Overview
The `UserContext` manages user authentication, profile data, and role-based access across the entire app. It provides persistent storage of user data and automatic restoration on app restart.

---

## User Object Structure

```javascript
{
  id: string,           // Unique user identifier (auto-generated if not provided)
  name: string,         // User's full name (required)
  isAdmin: boolean,     // Role flag: true for admin, false for student
  
  // Student-specific fields (optional)
  rollNumber?: string,  // Student roll number (e.g., "2021CS001")
  branch?: string,      // Academic branch (e.g., "Computer Science")
  year?: number,        // Academic year (1-4)
}
```

---

## Context State

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `user` | object \| null | Current user object or null if not authenticated |
| `isAuthenticated` | boolean | True if user is signed in |
| `isLoading` | boolean | True while loading persisted user on mount |

### Actions

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `signIn(userObj)` | User object | `{ success, errors? }` | Sign in user and persist to storage |
| `signOut()` | None | `Promise<boolean>` | Sign out user and clear storage |
| `updateProfile(fields)` | Object with fields to update | `{ success, errors? }` | Update user profile and persist |

### Helper Functions

| Method | Returns | Description |
|--------|---------|-------------|
| `isAdmin()` | boolean | Check if current user is admin |
| `isStudent()` | boolean | Check if current user is student |
| `getDisplayName()` | string | Get user's name or 'Guest' |
| `getRoleLabel()` | string | Get 'Admin' or 'Student' |

---

## Usage Examples

### 1. Basic Setup (Already Done in App.js)

```javascript
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
}
```

### 2. Using the Context in Components

```javascript
import { useUser } from '../context/UserContext';

const MyComponent = () => {
  const { user, isAuthenticated, signIn, signOut } = useUser();
  
  // Access user data
  console.log(user?.name);
  console.log(isAuthenticated);
};
```

### 3. Sign In as Student

```javascript
import { useUser } from '../context/UserContext';

const LoginScreen = () => {
  const { signIn } = useUser();
  
  const handleStudentLogin = async () => {
    const result = await signIn({
      name: 'John Doe',
      rollNumber: '2021CS001',
      branch: 'Computer Science',
      year: 3,
      isAdmin: false,
    });
    
    if (result.success) {
      console.log('Signed in successfully!');
      // Navigation will automatically update to show student flow
    } else {
      console.log('Errors:', result.errors);
      // Show error messages to user
    }
  };
};
```

### 4. Sign In as Admin

```javascript
const handleAdminLogin = async () => {
  const result = await signIn({
    name: 'Admin User',
    isAdmin: true,
  });
  
  if (result.success) {
    console.log('Admin signed in!');
    // Navigation will automatically update to show admin flow
  }
};
```

### 5. Sign Out

```javascript
const handleSignOut = async () => {
  const success = await signOut();
  
  if (success) {
    console.log('Signed out successfully!');
    // Navigation will automatically show auth screen
  }
};
```

### 6. Update User Profile

```javascript
const handleUpdateProfile = async () => {
  const result = await updateProfile({
    branch: 'Electrical Engineering',
    year: 4,
  });
  
  if (result.success) {
    console.log('Profile updated!');
  } else {
    console.log('Errors:', result.errors);
  }
};
```

### 7. Check User Role

```javascript
const MyScreen = () => {
  const { isAdmin, isStudent, user } = useUser();
  
  return (
    <View>
      {isAdmin() && <Text>Admin Controls</Text>}
      {isStudent() && <Text>Student View</Text>}
      <Text>Welcome, {user?.name}!</Text>
    </View>
  );
};
```

### 8. Display User Info

```javascript
const ProfileScreen = () => {
  const { user, getDisplayName, getRoleLabel } = useUser();
  
  return (
    <View>
      <Text>Name: {getDisplayName()}</Text>
      <Text>Role: {getRoleLabel()}</Text>
      
      {user?.rollNumber && (
        <Text>Roll Number: {user.rollNumber}</Text>
      )}
      
      {user?.branch && (
        <Text>Branch: {user.branch}</Text>
      )}
      
      {user?.year && (
        <Text>Year: {user.year}</Text>
      )}
    </View>
  );
};
```

### 9. Conditional Rendering Based on Auth

```javascript
const HomeScreen = () => {
  const { isAuthenticated, isLoading } = useUser();
  
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  
  if (!isAuthenticated) {
    return <Text>Please sign in</Text>;
  }
  
  return <Text>Welcome to the app!</Text>;
};
```

---

## Validation

The context automatically validates user data using the validation utilities:

### Student Validation Rules
- **name**: Required, minimum 2 characters
- **rollNumber**: Optional, must be string
- **branch**: Optional, must be string
- **year**: Optional, must be number between 1-4

### Admin Validation Rules
- **name**: Required, minimum 2 characters
- **id**: Required (auto-generated if not provided)
- **isAdmin**: Must be true

### Validation Response Format

```javascript
{
  success: false,
  errors: {
    name: 'Name is required',
    year: 'Year must be between 1 and 4'
  }
}
```

---

## Persistence

### Storage Key
User data is persisted using the key: `CAMPUSHUB_CURRENT_USER`

### Automatic Behaviors
1. **On App Mount**: Automatically loads persisted user from AsyncStorage
2. **On Sign In**: Saves user to AsyncStorage
3. **On Sign Out**: Removes user from AsyncStorage
4. **On Profile Update**: Updates user in AsyncStorage

### Manual Storage Access (Advanced)

```javascript
import * as storageService from '../services/storageService';

// Get current user directly from storage
const user = await storageService.get(storageService.STORAGE_KEYS.CURRENT_USER);

// Clear user from storage
await storageService.remove(storageService.STORAGE_KEYS.CURRENT_USER);
```

---

## Integration with Navigation

The `AppNavigator` automatically responds to user context changes:

```javascript
const RootNavigator = () => {
  const { user } = useUser();
  
  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : user.isAdmin ? (
        <Stack.Screen name="AdminApp" component={AdminFlow} />
      ) : (
        <Stack.Screen name="StudentApp" component={StudentFlow} />
      )}
    </Stack.Navigator>
  );
};
```

**What this means:**
- User signs in → Navigation automatically switches to appropriate flow
- User signs out → Navigation automatically shows auth screen
- No manual navigation needed!

---

## Common Patterns

### 1. Protected Screen

```javascript
const ProtectedScreen = () => {
  const { isAuthenticated, isLoading } = useUser();
  
  if (isLoading) {
    return <ActivityIndicator />;
  }
  
  if (!isAuthenticated) {
    return <Text>Access Denied</Text>;
  }
  
  return <YourContent />;
};
```

### 2. Admin-Only Feature

```javascript
const EventManagement = () => {
  const { isAdmin } = useUser();
  
  if (!isAdmin()) {
    return <Text>Admin access required</Text>;
  }
  
  return <AdminControls />;
};
```

### 3. User Greeting

```javascript
const Header = () => {
  const { getDisplayName, getRoleLabel } = useUser();
  
  return (
    <View>
      <Text>Hello, {getDisplayName()}!</Text>
      <Text>Role: {getRoleLabel()}</Text>
    </View>
  );
};
```

---

## Error Handling

All async methods return a result object:

```javascript
const result = await signIn(userData);

if (result.success) {
  // Success!
} else {
  // Handle errors
  Object.entries(result.errors).forEach(([field, message]) => {
    console.log(`${field}: ${message}`);
  });
}
```

---

## Testing Different Roles

### Quick Test: Student Login

```javascript
signIn({
  name: 'Test Student',
  rollNumber: '2021CS001',
  branch: 'Computer Science',
  year: 2,
  isAdmin: false,
});
```

### Quick Test: Admin Login

```javascript
signIn({
  name: 'Test Admin',
  isAdmin: true,
});
```

---

## Best Practices

1. **Always check `isLoading`** before rendering based on `user` state
2. **Use helper functions** (`isAdmin()`, `isStudent()`) instead of checking `user.isAdmin` directly
3. **Handle validation errors** from `signIn` and `updateProfile`
4. **Don't store sensitive data** - This is local storage only, no encryption
5. **Use `getDisplayName()`** for safe name display (handles null user)

---

## Summary

The UserContext provides:
- ✅ Complete authentication flow
- ✅ Automatic persistence and restoration
- ✅ Role-based access control
- ✅ Profile management
- ✅ Validation
- ✅ Integration with navigation
- ✅ Simple, clean API

No backend required - everything works locally! 🎉
