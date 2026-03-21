import { useState, useEffect } from "react";
import Login from "./components/pages/auth/Login";
import Signup from "./components/pages/auth/Signup";
import Dashboard from "./components/pages/mainscreens/Dashboard";
import AdminOversight from "./components/pages/mainscreens/AdminOversight";
import TransactionDetail from "./components/pages/mainscreens/Screen1/TransactionDetail";
import Alerts from "./components/pages/mainscreens/Screen2/Alerts";
import MerchantOverview from "./components/pages/mainscreens/Screen3/MerchantOverview";
import SummaryInsights from "./components/pages/mainscreens/Screen4/SummaryInsights";
import Sidebar from "./components/Reusable UI components/layout/Sidebar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "transaction", label: "Transaction Detail" },
    { key: "alerts", label: "Alerts" },
    { key: "merchant", label: "Merchant Overview" },
    { key: "summary", label: "Summary Insights" },
    { key: "admin", label: "🔒 Admin Oversight" },
];

function DashboardLayout({ onLogout, initialTab = "dashboard" }) {
    const [active, setActive] = useState(initialTab);

    const renderActive = () => {
        switch (active) {
            case "transaction":
                return <TransactionDetail />;
            case "alerts":
                return <Alerts />;
            case "merchant":
                return <MerchantOverview />;
            case "summary":
                return <SummaryInsights />;
            case "admin":
                return <AdminOversight />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-bg text-textPrimary">
            <Sidebar tabs={tabs} active={active} onTab={setActive} onLogout={onLogout} />
            <div className="flex-1">{renderActive()}</div>
        </div>
    );
}

function App() {
    const [page, setPage] = useState("login");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is logged in on mount
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true);
            setPage("dashboard");
        } else {
            setIsAuthenticated(false);
            setPage("login");
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        setPage("dashboard");
    };

    const handleSignupSuccess = () => {
        setIsAuthenticated(true);
        setPage("dashboard");
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("authToken");
            // Call backend logout endpoint
            await fetch(`${API_URL}/api/auth/logout`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // Clear local storage regardless
            localStorage.removeItem("authToken");
            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userId");
            setIsAuthenticated(false);
            setPage("login");
        }
    };

    return (
        <div>
            {page === "login" && (
                <Login 
                    onLogin={handleLogin} 
                    onSignupClick={() => setPage("signup")} 
                />
            )}
            {page === "signup" && (
                <Signup 
                    onSignupSuccess={handleSignupSuccess} 
                    onLoginClick={() => setPage("login")} 
                />
            )}
            {page === "dashboard" && isAuthenticated && (
                <DashboardLayout onLogout={handleLogout} initialTab="dashboard" />
            )}
        </div>
    );
}

export default App;