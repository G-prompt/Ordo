/**
 * Mock Authentication System
 * Manages user registration and login with localStorage persistence
 */

const USERS_DB_KEY = "sentrix_users_db";
const DEFAULT_USERS = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@sentrix.com",
        password: "Admin@123",
    },
    {
        id: 2,
        name: "John Doe",
        email: "john@sentrix.com",
        password: "John@123",
    },
    {
        id: 3,
        name: "Jane Smith",
        email: "jane@sentrix.com",
        password: "Jane@123",
    },
];

/**
 * Initialize the mock user database with default users
 */
export const initializeMockDB = () => {
    const existingDB = localStorage.getItem(USERS_DB_KEY);
    if (!existingDB) {
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(DEFAULT_USERS));
    }
};

/**
 * Get all users from the mock database
 */
const getAllUsers = () => {
    const db = localStorage.getItem(USERS_DB_KEY);
    return db ? JSON.parse(db) : [];
};

/**
 * Save users to the mock database
 */
const saveUsers = (users) => {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
};

/**
 * Authenticate a user with email and password
 * Returns { success, user, message }
 */
export const authenticateUser = (email, password) => {
    const users = getAllUsers();
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return {
            success: true,
            user: userWithoutPassword,
            message: "Login successful",
        };
    }

    return {
        success: false,
        user: null,
        message: "Invalid email or password",
    };
};

/**
 * Register a new user
 * Returns { success, user, message }
 */
export const registerUser = (name, email, password, confirmPassword) => {
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        return {
            success: false,
            user: null,
            message: "All fields are required",
        };
    }

    if (password !== confirmPassword) {
        return {
            success: false,
            user: null,
            message: "Passwords do not match",
        };
    }

    if (password.length < 6) {
        return {
            success: false,
            user: null,
            message: "Password must be at least 6 characters",
        };
    }

    // Check if email already exists
    const users = getAllUsers();
    if (users.some((u) => u.email === email)) {
        return {
            success: false,
            user: null,
            message: "Email already registered",
        };
    }

    // Create new user
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        name,
        email,
        password,
    };

    users.push(newUser);
    saveUsers(users);

    const { password: _, ...userWithoutPassword } = newUser;
    return {
        success: true,
        user: userWithoutPassword,
        message: "Registration successful",
    };
};

/**
 * Get default test users for reference
 */
export const getDefaultUsers = () => {
    return DEFAULT_USERS.map(user => {
        const { password: _pwd, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            password: "***",
        };
    });
};
