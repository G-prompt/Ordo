/**
 * Mock Authentication Service
 * Used for frontend testing while backend is being developed
 * 
 * To switch to real backend API:
 * 1. Change MOCK_AUTH to false
 * 2. Ensure backend server is running on port 3001
 * 3. Or set VITE_API_URL environment variable
 */

// Toggle between mock and real API
export const MOCK_AUTH = true;

// Mock user database
const mockUsers = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
    },
];

/**
 * Mock Login - validates against mock database
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, token?: string, user?: object, error?: string}>}
 */
export const mockLogin = async (email, password) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = mockUsers.find((u) => u.email === email && u.password === password);

            if (user) {
                const token = `mock_token_${user.id}_${Date.now()}`;
                resolve({
                    success: true,
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },
                });
            } else {
                resolve({
                    success: false,
                    error: "Invalid email or password. Try: john@example.com / password123",
                });
            }
        }, 800); // Simulate network delay
    });
};

/**
 * Mock Signup - adds new user to mock database
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, token?: string, user?: object, error?: string}>}
 */
export const mockSignup = async (name, email, password) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Check if email already exists
            if (mockUsers.some((u) => u.email === email)) {
                resolve({
                    success: false,
                    error: "Email already registered. Try: john@example.com",
                });
                return;
            }

            // Validate inputs
            if (!name || !email || !password) {
                resolve({
                    success: false,
                    error: "All fields are required",
                });
                return;
            }

            if (password.length < 6) {
                resolve({
                    success: false,
                    error: "Password must be at least 6 characters",
                });
                return;
            }

            // Create new user
            const newUser = {
                id: String(mockUsers.length + 1),
                name,
                email,
                password,
            };

            mockUsers.push(newUser);
            const token = `mock_token_${newUser.id}_${Date.now()}`;

            resolve({
                success: true,
                token,
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                },
            });
        }, 800); // Simulate network delay
    });
};

/**
 * Get mock users for reference during testing
 * @returns {Array} Array of mock users
 */
export const getMockUsers = () => {
    return mockUsers.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        password: u.password, // For testing only
    }));
};

/**
 * Switch authentication mode
 * Useful for toggling between mock and real API
 * @param {boolean} useMock
 */
export const setMockAuth = (useMock) => {
    window.MOCK_AUTH = useMock;
    console.log(`Switched to ${useMock ? "MOCK" : "REAL"} authentication`);
    localStorage.setItem("MOCK_AUTH", String(useMock));
};

/**
 * Get current auth mode
 * @returns {boolean}
 */
export const isMockAuthEnabled = () => {
    const stored = localStorage.getItem("MOCK_AUTH");
    return stored !== null ? stored === "true" : MOCK_AUTH;
};
