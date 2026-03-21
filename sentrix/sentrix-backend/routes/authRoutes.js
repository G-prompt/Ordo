import express from 'express';
import { signup, login, logout, getCurrentUser } from '../controllers/authController.js';
import { authenticateToken, logActivity } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', logActivity('SIGNUP'), signup);
router.post('/login', logActivity('LOGIN'), login);

// Protected routes
router.post('/logout', authenticateToken, logActivity('LOGOUT'), logout);
router.get('/me', authenticateToken, getCurrentUser);

export default router;
