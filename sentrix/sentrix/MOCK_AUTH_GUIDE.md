# Mock Authentication Guide

## Overview
Mock authentication allows you to test the frontend login/signup flows **without needing the backend server running**. This is perfect for frontend development while the backend developer is building their API.

## Test Credentials

Use these credentials to log in:

| Email | Password | Name |
|-------|----------|------|
| john@example.com | password123 | John Doe |
| jane@example.com | password123 | Jane Smith |

Or create a new account on the Signup page!

## How to Use

### 1. Mock Auth is Enabled by Default
Mock authentication is **enabled by default** in `src/utils/mockAuthUtils.js`:

```javascript
export const MOCK_AUTH = true;  // ← Set to false to use real backend
```

### 2. Test Login
1. Go to http://localhost:5174/login
2. Enter: `john@example.com` / `password123`
3. Click "Login" - you'll be authenticated with mock data
4. You're now in the dashboard! 🎉

### 3. Test Signup
1. Go to http://localhost:5174/signup
2. Fill in the form with any name and new email
3. Enter any password (must be 6+ characters)
4. Accept terms and click "Sign Up"
5. New account created with mock data

## Switching to Real Backend

When your backend developer is ready:

### Option 1: Toggle in Code
Edit `src/utils/mockAuthUtils.js`:

```javascript
export const MOCK_AUTH = false;  // Disable mock auth
```

### Option 2: Environment Variable
Create `.env.local` in project root:

```
VITE_API_URL=http://localhost:3001
```

Then in browser console, run:
```javascript
localStorage.setItem("MOCK_AUTH", "false");
```

### Option 3: Runtime Toggle
In browser console:
```javascript
// Switch to mock auth
localStorage.setItem("MOCK_AUTH", "true");

// Switch to real API
localStorage.setItem("MOCK_AUTH", "false");

// Reload page
window.location.reload();
```

## What Mock Auth Does

✅ **Authenticates users** - validates credentials against mock database
✅ **Creates tokens** - generates mock JWT tokens for session management
✅ **Allows signup** - lets you create new test accounts
✅ **Simulates network delay** - 800ms delay to simulate real API response time
✅ **Stores auth data** - saves to localStorage just like real auth
✅ **Works offline** - no internet/server connection needed

## Backend Integration

### When Real API is Ready
Your backend should provide:

**Login Endpoint**
```
POST /api/auth/login
Request: { email: string, password: string }
Response: { success: true, token: string, user: { id, name, email } }
```

**Signup Endpoint**
```
POST /api/auth/signup
Request: { name: string, email: string, password: string, confirmPassword: string }
Response: { success: true, token: string, user: { id, name, email } }
```

### How to Switch
The Login and Signup components automatically detect mock auth:

```javascript
const useMock = isMockAuthEnabled();

if (useMock) {
    data = await mockLogin(email, password);
} else {
    // Call real backend API
    const response = await fetch(`${API_URL}/api/auth/login`, ...);
}
```

No code changes needed - just set `MOCK_AUTH = false` or `VITE_API_URL`!

## Testing Scenarios

### Test: Valid Login
- Email: `john@example.com`
- Password: `password123`
- Expected: ✅ Logged in successfully

### Test: Invalid Password
- Email: `john@example.com`
- Password: `wrong123`
- Expected: ❌ Shows error message

### Test: Create New Account
- Any new email
- Password: `hello123` (or any 6+ chars)
- Expected: ✅ Account created, logged in

### Test: Duplicate Email
- Email: `john@example.com` (already exists)
- Expected: ❌ Shows "Email already registered"

## Files Modified

- `src/utils/mockAuthUtils.js` - New mock authentication service
- `src/components/pages/auth/Login.jsx` - Updated to use mock auth
- `src/components/pages/auth/Signup.jsx` - Updated to use mock auth

## Debugging

Check browser console to see auth mode:
```javascript
// See if mock auth is enabled
console.log(localStorage.getItem("authMode")); // "mock" or "real"

// See auth token
console.log(localStorage.getItem("authToken"));

// See user data
console.log(localStorage.getItem("userName"));
console.log(localStorage.getItem("userEmail"));
```

## Next Steps

1. ✅ Frontend development continues with mock auth
2. ⏳ Backend developer builds `/api/auth/login` and `/api/auth/signup`
3. 🔀 Switch `MOCK_AUTH = false` in `mockAuthUtils.js`
4. 🚀 Frontend automatically uses real backend API
5. ✅ Ship to production!
