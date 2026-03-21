import {
    hashPassword,
    comparePassword,
    generateToken,
    isValidEmail,
    validatePassword
} from '../utils/auth.js';
import {
    readUsers,
    writeUsers,
    addActivityLog,
    createSession,
    endSession
} from '../utils/storage.js';

/**
 * User Signup/Registration
 */
export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            return res.status(400).json({ error: passwordValidation.message });
        }

        // Check if user already exists
        const users = readUsers();
        if (users.some(u => u.email === email)) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(password);
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            lastLogin: null,
            loginCount: 0,
            isActive: true
        };

        users.push(newUser);
        writeUsers(users);

        // Log signup activity
        addActivityLog(newUser.id, 'SIGNUP', {
            email,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent']
        });

        // Generate token
        const { token, tokenId } = generateToken(newUser.id, email);
        createSession(newUser.id, tokenId);

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * User Login
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user
        const users = readUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            // Log failed attempt
            addActivityLog('unknown', 'LOGIN_FAILED', {
                email,
                reason: 'User not found',
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            });
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Verify password
        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            // Log failed attempt
            addActivityLog(user.id, 'LOGIN_FAILED', {
                email,
                reason: 'Invalid password',
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            });
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Update user login info
        user.lastLogin = new Date().toISOString();
        user.loginCount += 1;
        const updatedUsers = users.map(u => u.id === user.id ? user : u);
        writeUsers(updatedUsers);

        // Generate token
        const { token, tokenId } = generateToken(user.id, email);
        createSession(user.id, tokenId);

        // Log successful login
        addActivityLog(user.id, 'LOGIN_SUCCESS', {
            email,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent']
        });

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * User Logout
 */
export const logout = (req, res) => {
    try {
        const { tokenId } = req.user;

        // End session
        endSession(tokenId);

        // Log logout
        addActivityLog(req.user.userId, 'LOGOUT', {
            ipAddress: req.ip,
            userAgent: req.headers['user-agent']
        });

        res.json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get current user info
 */
export const getCurrentUser = (req, res) => {
    try {
        const users = readUsers();
        const user = users.find(u => u.id === req.user.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin,
                loginCount: user.loginCount
            }
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
