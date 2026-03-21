import { verifyToken } from '../utils/auth.js';
import { updateSessionActivity } from '../utils/storage.js';

/**
 * Authentication middleware to verify JWT token
 */
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }

    // Update session activity
    updateSessionActivity(decoded.tokenId);

    req.user = decoded;
    next();
};

/**
 * Activity logging middleware
 */
export const logActivity = (action) => {
    return (req, res, next) => {
        // Store activity info for later logging
        req.activityAction = action;
        req.activityDetails = {
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.headers['user-agent'],
            method: req.method,
            path: req.path,
            query: req.query
        };
        next();
    };
};

/**
 * Rate limiting middleware (simple version)
 */
const requestCounts = new Map();

export const rateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
    return (req, res, next) => {
        const key = req.ip || 'unknown';
        const now = Date.now();
        
        if (!requestCounts.has(key)) {
            requestCounts.set(key, []);
        }
        
        const requests = requestCounts.get(key);
        const recentRequests = requests.filter(time => now - time < windowMs);
        
        if (recentRequests.length >= maxRequests) {
            return res.status(429).json({ error: 'Too many requests, please try again later' });
        }
        
        recentRequests.push(now);
        requestCounts.set(key, recentRequests);
        next();
    };
};

/**
 * CORS middleware helper
 */
export const corsHeaders = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5174');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
};
