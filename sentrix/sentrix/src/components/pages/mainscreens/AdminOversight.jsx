import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const StatCard = ({ label, value, color = "blue" }) => (
    <div className={`bg-${color}-500/10 border border-${color}-500/20 rounded-xl p-6`}>
        <p className={`text-${color}-300 text-sm font-semibold mb-2`}>{label}</p>
        <p className={`text-${color}-100 text-3xl font-bold`}>{value}</p>
    </div>
);

function AdminOversight() {
    const [activeTab, setActiveTab] = useState("overview");
    const [overview, setOverview] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [logs, setLogs] = useState([]);
    const [securityStats, setSecurityStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) return;

                if (activeTab === "overview") {
                    const res = await fetch(`${API_URL}/api/admin/dashboard`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    });
                    const data = await res.json();
                    if (data.success) setOverview(data);
                } else if (activeTab === "sessions") {
                    const res = await fetch(`${API_URL}/api/admin/sessions`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    });
                    const data = await res.json();
                    if (data.success) setSessions(data.sessions);
                } else if (activeTab === "logs") {
                    const res = await fetch(`${API_URL}/api/admin/logs`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    });
                    const data = await res.json();
                    if (data.success) setLogs(data.logs);
                } else if (activeTab === "security") {
                    const res = await fetch(`${API_URL}/api/admin/security-stats`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    });
                    const data = await res.json();
                    if (data.success) setSecurityStats(data.stats);
                }
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to load data");
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 text-gradient bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                        Admin Oversight Dashboard
                    </h1>
                    <p className="text-gray-400">Real-time account activity and security monitoring</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
                    {["overview", "sessions", "logs", "security"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setLoading(true); }}
                            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                                activeTab === tab
                                    ? "bg-blue-600 text-white"
                                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8 text-red-200">
                        {error}
                    </div>
                )}

                {/* Overview Tab */}
                {activeTab === "overview" && overview && (
                    <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            <StatCard label="Total Users" value={overview.overview.totalUsers} color="blue" />
                            <StatCard label="Active Users" value={overview.overview.activeUsers} color="green" />
                            <StatCard label="Active Sessions" value={overview.overview.activeSessions} color="cyan" />
                            <StatCard label="Total Logins" value={overview.overview.totalLogins} color="purple" />
                            <StatCard label="Failed Logins" value={overview.overview.failedLoginAttempts} color="red" />
                            <StatCard label="24h Activity" value={overview.overview.total24hActivity} color="yellow" />
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {overview.recentActivity.map(activity => (
                                    <div key={activity.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                                        <div>
                                            <p className="font-semibold">{activity.userEmail || "Unknown"}</p>
                                            <p className="text-sm text-gray-400">{activity.action}</p>
                                        </div>
                                        <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleTimeString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Sessions Tab */}
                {activeTab === "sessions" && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 overflow-x-auto">
                        <h2 className="text-xl font-bold mb-4">Active Sessions</h2>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-2 px-4">User</th>
                                    <th className="text-left py-2 px-4">Session ID</th>
                                    <th className="text-left py-2 px-4">Created</th>
                                    <th className="text-left py-2 px-4">Last Activity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessions.map(session => (
                                    <tr key={session.id} className="border-b border-white/10 hover:bg-white/5">
                                        <td className="py-3 px-4">{session.userName}</td>
                                        <td className="py-3 px-4 text-xs font-mono text-cyan-300">{session.id.slice(0, 8)}...</td>
                                        <td className="py-3 px-4 text-xs text-gray-400">{new Date(session.createdAt).toLocaleString()}</td>
                                        <td className="py-3 px-4 text-xs text-gray-400">{new Date(session.lastActivity).toLocaleTimeString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {sessions.length === 0 && <p className="text-gray-400 mt-4">No active sessions</p>}
                    </div>
                )}

                {/* Logs Tab */}
                {activeTab === "logs" && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 overflow-x-auto">
                        <h2 className="text-xl font-bold mb-4">Activity Logs</h2>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-2 px-4">User</th>
                                    <th className="text-left py-2 px-4">Action</th>
                                    <th className="text-left py-2 px-4">IP Address</th>
                                    <th className="text-left py-2 px-4">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.slice(0, 50).map(log => (
                                    <tr key={log.id} className="border-b border-white/10 hover:bg-white/5">
                                        <td className="py-3 px-4">{log.userEmail}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                log.action === 'LOGIN_SUCCESS' ? 'bg-green-500/20 text-green-300' :
                                                log.action === 'LOGIN_FAILED' ? 'bg-red-500/20 text-red-300' :
                                                log.action === 'LOGOUT' ? 'bg-yellow-500/20 text-yellow-300' :
                                                'bg-blue-500/20 text-blue-300'
                                            }`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-xs text-gray-400">{log.ipAddress}</td>
                                        <td className="py-3 px-4 text-xs text-gray-400">{new Date(log.timestamp).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Security Tab */}
                {activeTab === "security" && securityStats && (
                    <div className="space-y-6">
                        {/* Security Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard label="Total Attempts" value={securityStats.totalLoginAttempts} />
                            <StatCard label="Successful" value={securityStats.successfulLogins} color="green" />
                            <StatCard label="Failed" value={securityStats.failedLogins} color="red" />
                            <StatCard label="Failure Rate" value={securityStats.failureRate} color="yellow" />
                        </div>

                        {/* Suspicious IPs */}
                        {securityStats.suspiciousIps.length > 0 && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                                <h2 className="text-xl font-bold mb-4 text-red-300">⚠️ Suspicious IPs Detected</h2>
                                <div className="space-y-3">
                                    {securityStats.suspiciousIps.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-red-500/5 rounded-lg">
                                            <p className="font-mono text-sm">{item.ip}</p>
                                            <p className="text-red-300 font-bold">{item.failureCount} failed attempts</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminOversight;
