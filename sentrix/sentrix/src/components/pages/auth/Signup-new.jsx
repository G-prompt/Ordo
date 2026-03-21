import { useState } from "react";
import AnimatedBackground from "./AnimatedBackground";

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

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (!passwordMatch) {
            setError("Passwords do not match");
            return;
        }

        if (!formData.acceptTerms) {
            setError("Please accept the terms and conditions");
            return;
        }

        setLoading(true);

        try {
            localStorage.setItem("authToken", "mock-token");
            localStorage.setItem("userEmail", formData.email);
            localStorage.setItem("userName", formData.name);
            onSignupSuccess();
        } catch {
            setError("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <AnimatedBackground />

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
                <div className="w-full max-w-md">
                    {/* Glassmorphic Card */}
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-white mb-2">Sentrix</h1>
                            <p className="text-gray-300">Create your account</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                                    required
                                />
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 transition-all duration-300 ${!passwordMatch ? "border-red-500/50 focus:border-red-500" : "border-white/20 focus:border-white/40"
                                        }`}
                                    required
                                />
                                {!passwordMatch && (
                                    <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
                                )}
                            </div>

                            {/* Terms Checkbox */}
                            <label className="flex items-start text-gray-300 hover:text-white cursor-pointer transition-colors mt-3">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleChange}
                                    className="mt-1 mr-2 w-4 h-4 bg-white/10 border border-white/20 rounded accent-blue-500"
                                />
                                <span className="text-sm">
                                    I agree to the{" "}
                                    <button type="button" className="text-blue-400 hover:text-blue-300">
                                        Terms of Service
                                    </button>
                                    {" "}and{" "}
                                    <button type="button" className="text-blue-400 hover:text-blue-300">
                                        Privacy Policy
                                    </button>
                                </span>
                            </label>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || !passwordMatch}
                                className="w-full py-3 mt-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50"
                            >
                                {loading ? "Creating account..." : "Sign Up"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center">
                            <div className="flex-1 border-t border-white/20"></div>
                            <span className="px-3 text-gray-400 text-sm">or</span>
                            <div className="flex-1 border-t border-white/20"></div>
                        </div>

                        {/* Social Login */}
                        <div className="flex gap-3">
                            <button type="button" className="flex-1 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all duration-300">
                                Google
                            </button>
                            <button type="button" className="flex-1 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all duration-300">
                                GitHub
                            </button>
                        </div>

                        {/* Login Link */}
                        <p className="text-center text-gray-300 text-sm mt-6">
                            Already have an account?{" "}
                            <button
                                onClick={onLoginClick}
                                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer bg-none border-none p-0"
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
