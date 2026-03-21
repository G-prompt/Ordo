import express from 'express';
import corsPackage from 'cors';
import { authenticateToken, corsHeaders, rateLimit } from './middleware/auth.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(corsHeaders);
app.use(corsPackage({
    origin: process.env.FRONTEND_URL || 'http://localhost:5174',
    credentials: true
}));
app.use(express.json());
app.use(rateLimit(100, 15 * 60 * 1000)); // 100 requests per 15 minutes

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`╔════════════════════════════════════════╗`);
    console.log(`║  Sentrix Authentication Server Ready!  ║`);
    console.log(`║  Port: ${PORT}                        ║`);
    console.log(`║  Auth: http://localhost:${PORT}/api/auth       ║`);
    console.log(`║  Admin: http://localhost:${PORT}/api/admin      ║`);
    console.log(`╚════════════════════════════════════════╝`);
});

export default app;
