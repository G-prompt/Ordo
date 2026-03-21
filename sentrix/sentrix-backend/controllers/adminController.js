import {
    readUsers,
    readActivityLogs,
    readSessions,
    getUserActiveSessions
} from '../utils/storage.js';

/**
 * Get all activity logs (admin only)
 */
export const getAllActivityLogs = (req, res) => {
    try {
        const logs = readActivityLogs();
        const users = readUsers();

        // Enrich logs with user info
        const enrichedLogs = logs.map(log => {
            const user = users.find(u => u.id === log.userId);
            return {
                ...log,
                userName: user ? user.name : 'Unknown',
                userEmail: user ? user.email : 'unknown@example.com'
            };
        });

        // Sort by timestamp descending (newest first)
        enrichedLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        res.json({
            success: true,
            total: enrichedLogs.length,
            logs: enrichedLogs
        });
    } catch (error) {
        console.error('Get logs error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get activity logs for specific user
 */
export const getUserActivityLogs = (req, res) => {
    try {
        const { userId } = req.params;
        const logs = readActivityLogs();

        const userLogs = logs.filter(log => log.userId === userId);
        userLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        res.json({
            success: true,
            userId,
            total: userLogs.length,
            logs: userLogs
        });
    } catch (error) {
        console.error('Get user logs error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get all active sessions (admin oversight)
 */
export const getAllActiveSessions = (req, res) => {
    try {
        const sessions = readSessions();
        const users = readUsers();

        // Get active sessions
        const activeSessions = sessions
            .filter(s => s.isActive)
            .map(session => {
                const user = users.find(u => u.id === session.userId);
                return {
                    ...session,
                    userName: user ? user.name : 'Unknown',
                    userEmail: user ? user.email : 'unknown@example.com'
                };
            });

        // Sort by last activity
        activeSessions.sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));

        res.json({
            success: true,
            activeCount: activeSessions.length,
            sessions: activeSessions
        });
    } catch (error) {
        console.error('Get sessions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get user sessions
 */
export const getUserSessions = (req, res) => {
    try {
        const { userId } = req.params;
        const sessions = getUserActiveSessions(userId);

        res.json({
            success: true,
            userId,
            activeSessionCount: sessions.length,
            sessions
        });
    } catch (error) {
        console.error('Get user sessions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get oversight dashboard data
 */
export const getDashboardOverview = (req, res) => {
    try {
        const users = readUsers();
        const logs = readActivityLogs();
        const sessions = readSessions();

        const activeSessions = sessions.filter(s => s.isActive);
        const loginLogs = logs.filter(l => l.action === 'LOGIN_SUCCESS');
        const failedLogins = logs.filter(l => l.action === 'LOGIN_FAILED');

        // Get last 24 hours logs
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const logsLast24h = logs.filter(l => new Date(l.timestamp) > oneDayAgo);

        res.json({
            success: true,
            overview: {
                totalUsers: users.length,
                activeUsers: users.filter(u => u.isActive).length,
                activeSessions: activeSessions.length,
                totalLogins: loginLogs.length,
                failedLoginAttempts: failedLogins.length,
                total24hActivity: logsLast24h.length
            },
            recentActivity: logs.slice(-10).reverse()
        });
    } catch (error) {
        console.error('Get overview error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get security stats
 */
export const getSecurityStats = (req, res) => {
    try {
        const logs = readActivityLogs();

        const failedLogins = logs.filter(l => l.action === 'LOGIN_FAILED');
        const successfulLogins = logs.filter(l => l.action === 'LOGIN_SUCCESS');
        const signups = logs.filter(l => l.action === 'SIGNUP');

        // Group failed logins by IP
        const failuresByIp = {};
        failedLogins.forEach(log => {
            const ip = log.ipAddress || 'unknown';
            failuresByIp[ip] = (failuresByIp[ip] || 0) + 1;
        });

        // Get suspicious IPs (more than 5 failed attempts)
        const suspiciousIps = Object.entries(failuresByIp)
            .filter(([_, count]) => count > 5)
            .map(([ip, count]) => ({ ip, failureCount: count }));

        res.json({
            success: true,
            stats: {
                totalLoginAttempts: successfulLogins.length + failedLogins.length,
                successfulLogins: successfulLogins.length,
                failedLogins: failedLogins.length,
                signups,
                failureRate: (failedLogins.length / (successfulLogins.length + failedLogins.length) * 100).toFixed(2) + '%',
                suspiciousIps
            }
        });
    } catch (error) {
        console.error('Get security stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
