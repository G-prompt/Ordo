import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../components/pages/mainscreens/Dashboard";
import TransactionDetail from "../components/pages/mainscreens/Screen1/TransactionDetail";
import Alerts from "../components/pages/mainscreens/Screen2/Alerts";
import MerchantOverview from "../components/pages/mainscreens/Screen3/MerchantOverview";
import SummaryInsights from "../components/pages/mainscreens/Screen4/SummaryInsights";
import Sidebar from "../components/Reusable UI components/layout/Sidebar";
import Login from "../components/pages/auth/Login";
import Signup from "../components/pages/auth/Signup";
import ProtectedRoute from "../components/ProtectedRoute";

const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "transaction", label: "Transaction Detail" },
    { key: "alerts", label: "Alerts" },
    { key: "merchant", label: "Merchant Overview" },
    { key: "summary", label: "Summary Insights" },
];

function DashboardLayout() {
    const [active, setActive] = useState("dashboard");

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
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-bg text-textPrimary">
            <Sidebar tabs={tabs} active={active} onTab={setActive} />
            <div className="flex-1">{renderActive()}</div>
        </div>
    );
}

function AppRoutes() {
    const isAuthenticated = !!localStorage.getItem("authToken");

    return (
        <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Dashboard Route */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            />

            {/* Root redirect */}
            <Route
                path="/"
                element={
                    isAuthenticated ? (
                        <Navigate to="/dashboard" replace />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />

            {/* Catch all - redirect to dashboard or login */}
            <Route
                path="*"
                element={
                    isAuthenticated ? (
                        <Navigate to="/dashboard" replace />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
        </Routes>
    );
}

export default AppRoutes;
