import { useState } from "react";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const userName = localStorage.getItem("userName") || "User";

    // Sentrix Logo - Monitor icon with gradient background
    const logoImage = "/logo.svg";

    const navigationItems = [
        { label: "Dashboard", href: "#" },
        { label: "Transactions", href: "#" },
        { label: "Reports", href: "#" },
        { label: "Settings", href: "#" },
    ];

    return (
        <nav className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-opacity">
                        {/* Sentrix Logo Icon */}
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-md overflow-hidden">
                            <img
                                src={logoImage}
                                alt="Sentrix Logo"
                                className="w-full h-full object-contain p-1"
                            />
                        </div>

                        {/* Brand Name */}
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-textPrimary">Sentrix</span>
                            <span className="text-xs text-textSecondary font-medium">Dashboard</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navigationItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="px-4 py-2 text-sm text-textSecondary hover:text-primary hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Right Section: User Profile & Status */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-textPrimary max-w-[100px] truncate">
                                {userName}
                            </span>
                        </div>
                        <div className="h-5 w-px bg-border"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-600 font-semibold">LIVE</span>
                        </div>
                    </div>

                    {/* Hamburger Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className={`w-6 h-6 text-textPrimary transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-border py-4 space-y-2 animate-slide-in">
                        {/* Mobile User Info */}
                        <div className="px-4 py-3 bg-blue-50 rounded-lg mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {userName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-textPrimary">{userName}</p>
                                    <p className="text-xs text-green-600 font-medium">● LIVE</p>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Navigation Links */}
                        {navigationItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 text-sm text-textSecondary hover:text-primary hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
                            >
                                {item.label}
                            </a>
                        ))}

                        {/* Mobile Divider */}
                        <div className="border-t border-border my-3"></div>

                        {/* Mobile Admin Link */}
                        <a
                            href="#"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium"
                        >
                            🔒 Admin Oversight
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;