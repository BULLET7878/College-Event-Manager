# UserContext Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Import the Hook
```javascript
import { useUser } from '../context/UserContext';
```

### Step 2: Use in Your Component
```javascript
const MyComponent = () => {
  const { user, signIn, signOut, isAdmin } = useUser();
  
  // Now you can use these!
};
```

### Step 3: Call the Methods
```javascript
// Sign in as student
await signIn({
  name: 'John Doe',
  rollNumber: '2021CS001',
  isAdmin: false,
});

// Sign in as admin
await signIn({
  name: 'Admin',
  isAdmin: true,
});

// Sign out
await signOut();
```

---

## 📋 Common Use Cases

### 1. Show User Name
```javascript
const { user } = useUser();
return <Text>Welcome, {user?.name}!</Text>;
```

### 2. Conditional Rendering by Role
```javascript
const { isAdmin } = useUser();

return (
  <View>
    {isAdmin() ? (
      <AdminPanel />
    ) : (
      <StudentView />
    )}
  </View>
);
```

### 3. Sign Out Button
```javascript
const { signOut } = useUser();

return (
  <Button 
    title="Sign Out" 
    onPress={signOut} 
  />
);
```

### 4. Check if Authenticated
```javascript
const { isAuthenticated, isLoading } = useUser();

if (isLoading) return <Text>Loading...</Text>;
if (!isAuthenticated) return <Text>Please sign in</Text>;

return <YourContent />;
```

### 5. Update Profile
```javascript
const { updateProfile } = useUser();

const handleUpdate = async () => {
  const result = await updateProfile({
    branch: 'Electrical Engineering',
    year: 4,
  });
  
  if (result.success) {
    alert('Profile updated!');
  }
};
```

---

## 🎯 Available Properties

| Property | Type | Description |
|----------|------|-------------|
| `user` | object \| null | Current user data |
| `isAuthenticated` | boolean | Is user signed in? |
| `isLoading` | boolean | Is data loading? |

---

## 🎯 Available Methods

| Method | Usage | Returns |
|--------|-------|---------|
| `signIn(userObj)` | Sign in user | `{ success, errors? }` |
| `signOut()` | Sign out user | `Promise<boolean>` |
| `updateProfile(fields)` | Update profile | `{ success, errors? }` |
| `isAdmin()` | Check if admin | `boolean` |
| `isStudent()` | Check if student | `boolean` |
| `getDisplayName()` | Get user name | `string` |
| `getRoleLabel()` | Get role label | `'Admin' \| 'Student'` |

---

## ⚡ Quick Examples

### Example 1: Simple Login Form
```javascript
import { useUser } from '../context/UserContext';

const LoginForm = () => {
  const { signIn } = useUser();
  const [name, setName] = useState('');
  
  const handleLogin = async () => {
    const result = await signIn({
      name,
      isAdmin: false,
    });
    
    if (!result.success) {
      alert('Login failed!');
    }
  };
  
  return (
    <View>
      <TextInput 
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};
```

### Example 2: User Profile Display
```javascript
const ProfileCard = () => {
  const { user, getDisplayName, getRoleLabel } = useUser();
  
  return (
    <View>
      <Text>Name: {getDisplayName()}</Text>
      <Text>Role: {getRoleLabel()}</Text>
      {user?.rollNumber && (
        <Text>Roll: {user.rollNumber}</Text>
      )}
    </View>
  );
};
```

### Example 3: Protected Component
```javascript
const AdminOnly = ({ children }) => {
  const { isAdmin } = useUser();
  
  if (!isAdmin()) {
    return <Text>Access Denied</Text>;
  }
  
  return children;
};

// Usage
<AdminOnly>
  <AdminControls />
</AdminOnly>
```

### Example 4: Loading State
```javascript
const MyScreen = () => {
  const { isLoading, isAuthenticated } = useUser();
  
  if (isLoading) {
    return <ActivityIndicator />;
  }
  
  if (!isAuthenticated) {
    return <Text>Please sign in</Text>;
  }
  
  return <MainContent />;
};
```

---

## 🎨 User Object Structure

```javascript
// Student
{
  id: "user_1234567890_abc",
  name: "John Doe",
  rollNumber: "2021CS001",
  branch: "Computer Science",
  year: 3,
  isAdmin: false
}

// Admin
{
  id: "user_9876543210_xyz",
  name: "Admin User",
  isAdmin: true
}
```

---

## ✅ Validation Rules

### Student
- ✅ Name: Required, min 2 chars
- ✅ Roll Number: Optional, string
- ✅ Branch: Optional, string
- ✅ Year: Optional, 1-4

### Admin
- ✅ Name: Required, min 2 chars
- ✅ isAdmin: Must be true

---

## 💡 Pro Tips

1. **Always check `isLoading`** before using `user`
2. **Use helper functions** like `isAdmin()` instead of `user?.isAdmin`
3. **Handle errors** from `signIn` and `updateProfile`
4. **User data persists** - survives app restarts!
5. **Navigation is automatic** - no need to manually navigate after sign in

---

## 🐛 Common Mistakes

### ❌ Don't Do This
```javascript
// Checking user directly
if (user.isAdmin) { ... }  // Can crash if user is null!

// Not checking loading
if (user) { ... }  // Might be null while loading
```

### ✅ Do This Instead
```javascript
// Use helper function
if (isAdmin()) { ... }  // Safe, handles null

// Check loading first
if (isLoading) return <Loading />;
if (user) { ... }  // Now safe
```

---

## 📚 Need More Help?

- **Detailed Guide**: See `USER_CONTEXT.md`
- **Flow Diagrams**: See `USER_CONTEXT_FLOW.md`
- **Example Component**: See `src/components/UserProfileExample.js`
- **Implementation Details**: See `USER_CONTEXT_SUMMARY.md`

---

## 🎉 You're Ready!

That's all you need to know to get started with UserContext!

**Remember:**
- Import `useUser` hook
- Destructure what you need
- Call methods and use data
- Handle loading and errors

Happy coding! 🚀
