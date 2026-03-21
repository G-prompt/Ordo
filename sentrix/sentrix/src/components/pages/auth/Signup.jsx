import { useState } from "react";
import AnimatedBackground from "./AnimatedBackground";
import { mockSignup, isMockAuthEnabled } from "../../../utils/mockAuthUtils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function Signup({ onSignupSuccess, onLoginClick }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [useMock] = useState(isMockAuthEnabled());

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        if (name === "confirmPassword" || name === "password") {
            const pwd = name === "password" ? value : formData.password;
            const confirmPwd = name === "confirmPassword" ? value : formData.confirmPassword;
            setPasswordMatch(pwd === confirmPwd || confirmPwd === "");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.acceptTerms) {
            setError("Please accept the terms and conditions");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            let data;

            // Use mock auth or real backend
            if (useMock) {
                data = await mockSignup(formData.name, formData.email, formData.password);
            } else {
                const response = await fetch(`${API_URL}/api/auth/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        confirmPassword: formData.confirmPassword,
                    }),
                });

                data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Signup failed");
                }
            }

            if (data.success) {
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userEmail", data.user.email);
                localStorage.setItem("userName", data.user.name);
                localStorage.setItem("userId", data.user.id);
                localStorage.setItem("authMode", useMock ? "mock" : "real");
                onSignupSuccess();
            } else {
                setError(data.error || "Signup failed. Please try again.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError(err.message || "Signup failed. Please check if the server is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <AnimatedBackground />

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
                <div className="w-full max-w-md">
                    {/* Premium Glassmorphic Card */}
                    <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                        {/* Branding Logo */}
                        <div className="flex justify-center mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">S</span>
                            </div>
                        </div>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
                                Sentrix
                            </h1>
                            <p className="text-gray-400 text-sm">Create your account to get started</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-5 p-3 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-lg flex items-center gap-2">
                                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-300 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Input */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/20 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300"
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/20 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/20 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300"
                                    required
                                />
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${!passwordMatch
                                        ? "border-red-500/50 focus:bg-red-500/5 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/50"
                                        : "border-white/10 focus:bg-white/10 focus:border-white/20 focus:ring-1 focus:ring-cyan-400/50"
                                        }`}
                                    required
                                />
                                {!passwordMatch && (
                                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                        <span>✕</span>
                                        Passwords do not match
                                    </p>
                                )}
                            </div>

                            {/* Terms Checkbox */}
                            <label className="flex items-start text-gray-300 hover:text-white cursor-pointer transition-colors duration-300 mt-4 group">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleChange}
                                    className="mt-1 mr-3 w-4 h-4 bg-white/5 border border-white/20 rounded accent-cyan-400 cursor-pointer group-hover:border-white/40 transition-all"
                                />
                                <span className="text-sm leading-relaxed">
                                    I agree to the <span className="text-cyan-400 hover:text-cyan-300">Terms of Service</span> and <span className="text-cyan-400 hover:text-cyan-300">Privacy Policy</span>
                                </span>
                            </label>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || !passwordMatch}
                                className="w-full py-3 mt-6 relative group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 transform"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Creating account...</span>
                                    </div>
                                ) : (
                                    "Sign Up"
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-400">or continue with</span>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="flex-1 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl text-white text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.85 4.05-1.27 1.045-3.251 1.746-5.99 1.746-4.442 0-8.149-3.585-8.149-8.02 0-4.495 3.716-8.02 8.15-8.02 2.023 0 3.915.856 5.235 2.045l2.457-2.557C18.873 6.38 16.767 5.033 12.48 5.033c-6.868 0-12.731 5.592-12.731 12.487S5.612 29.987 12.48 29.987c3.473 0 6.364-1.126 8.496-3.072 2.047-1.793 3.374-4.353 3.661-7.409H12.48z" />
                                </svg>
                                Google
                            </button>
                            <button
                                type="button"
                                className="flex-1 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl text-white text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </button>
                        </div>

                        {/* Login Link */}
                        <p className="text-center text-gray-400 text-sm mt-6">
                            Already have an account?{" "}
                            <button
                                onClick={onLoginClick}
                                type="button"
                                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300 cursor-pointer bg-none border-none p-0"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
