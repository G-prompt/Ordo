import { useState } from "react";
import AnimatedBackground from "./AnimatedBackground";
import { mockLogin, isMockAuthEnabled } from "../../../utils/mockAuthUtils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function Login({ onLogin, onSignupClick }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [useMock] = useState(isMockAuthEnabled());

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (!email || !password) {
                setError("Please fill in all fields");
                setLoading(false);
                return;
            }

            let data;

            // Use mock auth or real backend
            if (useMock) {
                data = await mockLogin(email, password);
            } else {
                const response = await fetch(`${API_URL}/api/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Login failed");
                }
            }

            if (data.success) {
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userEmail", data.user.email);
                localStorage.setItem("userName", data.user.name);
                localStorage.setItem("userId", data.user.id);
                localStorage.setItem("authMode", useMock ? "mock" : "real");
                onLogin();
            } else {
                setError(data.error || "Login failed. Please try again.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || "Login failed. Please check if the server is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <AnimatedBackground />

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10 sm:px-6 lg:px-8">
                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
                    {/* Main Card */}
                    <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
                        {/* Logo & Branding */}
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl mb-4 shadow-lg">
                                <span className="text-white font-bold text-2xl">S</span>
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent mb-2">
                                Sentrix
                            </h1>
                            <p className="text-gray-400 text-sm font-medium">Welcome back to your dashboard</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm font-medium backdrop-blur-sm">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-300 mb-3 ml-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm group-hover:bg-white/8"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-300 mb-3 ml-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm group-hover:bg-white/8"
                                    required
                                />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center text-gray-400 hover:text-gray-300 cursor-pointer transition-colors group">
                                    <input
                                        type="checkbox"
                                        className="mr-3 w-5 h-5 bg-white/10 border border-white/20 rounded-lg accent-blue-500 cursor-pointer"
                                    />
                                    <span className="font-medium">Remember me</span>
                                </label>
                                <button type="button" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                    Forgot password?
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 mt-8 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50 hover:shadow-2xl transform hover:scale-105 active:scale-95"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center">
                            <div className="flex-1 border-t border-white/10"></div>
                            <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
                            <div className="flex-1 border-t border-white/10"></div>
                        </div>

                        {/* Social Login */}
                        <div className="flex gap-4">
                            <button type="button" className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white text-sm font-semibold transition-all duration-300 backdrop-blur-sm flex items-center justify-center">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                            </button>
                            <button type="button" className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white text-sm font-semibold transition-all duration-300 backdrop-blur-sm flex items-center justify-center">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <p className="text-center text-gray-400 text-sm mt-8">
                            Don't have an account?{" "}
                            <button 
                                onClick={onSignupClick}
                                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer bg-none border-none p-0 underline-offset-2 hover:underline"
                            >
                                Create one
                            </button>
                        </p>
                    </div>

                    {/* Bottom Info */}
                    <p className="text-center text-gray-500 text-xs mt-6 font-medium">
                        Secure and encrypted • ISO 27001 Certified
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
