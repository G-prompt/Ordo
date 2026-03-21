import express from 'express';
import {
    getAllActivityLogs,
    getUserActivityLogs,
    getAllActiveSessions,
    getUserSessions,
    getDashboardOverview,
    getSecurityStats
} from '../controllers/adminController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require authentication
// In production, you'd add additional authorization checks to verify admin role

// Activity logs
router.get('/logs', authenticateToken, getAllActivityLogs);
router.get('/logs/:userId', authenticateToken, getUserActivityLogs);

// Session management
router.get('/sessions', authenticateToken, getAllActiveSessions);
router.get('/sessions/:userId', authenticateToken, getUserSessions);

// Oversight dashboard
router.get('/dashboard', authenticateToken, getDashboardOverview);
router.get('/security-stats', authenticateToken, getSecurityStats);

export default router;
