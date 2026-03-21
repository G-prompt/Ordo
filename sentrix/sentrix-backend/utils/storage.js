import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const usersFile = path.join(dataDir, 'users.json');
const logsFile = path.join(dataDir, 'activity-logs.json');
const sessionsFile = path.join(dataDir, 'sessions.json');

/**
 * Initialize data files with default structure
 */
const initializeDataFiles = () => {
    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
    }
    if (!fs.existsSync(logsFile)) {
        fs.writeFileSync(logsFile, JSON.stringify([], null, 2));
    }
    if (!fs.existsSync(sessionsFile)) {
        fs.writeFileSync(sessionsFile, JSON.stringify([], null, 2));
    }
};

/**
 * Read users from JSON file
 */
export const readUsers = () => {
    try {
        const data = fs.readFileSync(usersFile, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

/**
 * Write users to JSON file
 */
export const writeUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

/**
 * Read activity logs from JSON file
 */
export const readActivityLogs = () => {
    try {
        const data = fs.readFileSync(logsFile, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

/**
 * Write activity logs to JSON file
 */
export const writeActivityLogs = (logs) => {
    fs.writeFileSync(logsFile, JSON.stringify(logs, null, 2));
};

/**
 * Read sessions from JSON file
 */
export const readSessions = () => {
    try {
        const data = fs.readFileSync(sessionsFile, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

/**
 * Write sessions to JSON file
 */
export const writeSessions = (sessions) => {
    fs.writeFileSync(sessionsFile, JSON.stringify(sessions, null, 2));
};

/**
 * Add activity log entry
 */
export const addActivityLog = (userId, action, details = {}) => {
    const logs = readActivityLogs();
    logs.push({
        id: Date.now().toString(),
        userId,
        action,
        details,
        timestamp: new Date().toISOString(),
        ipAddress: details.ipAddress || 'unknown',
        userAgent: details.userAgent || 'unknown'
    });
    writeActivityLogs(logs);
};

/**
 * Add session record
 */
export const createSession = (userId, tokenId) => {
    const sessions = readSessions();
    sessions.push({
        id: tokenId,
        userId,
        createdAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        isActive: true
    });
    writeSessions(sessions);
};

/**
 * Update session last activity
 */
export const updateSessionActivity = (tokenId) => {
    const sessions = readSessions();
    const session = sessions.find(s => s.id === tokenId);
    if (session) {
        session.lastActivity = new Date().toISOString();
        writeSessions(sessions);
    }
};

/**
 * Terminate session
 */
export const endSession = (tokenId) => {
    const sessions = readSessions();
    const session = sessions.find(s => s.id === tokenId);
    if (session) {
        session.isActive = false;
        session.endedAt = new Date().toISOString();
        writeSessions(sessions);
    }
};

/**
 * Get active sessions for a user
 */
export const getUserActiveSessions = (userId) => {
    const sessions = readSessions();
    return sessions.filter(s => s.userId === userId && s.isActive);
};

// Initialize on import
initializeDataFiles();
