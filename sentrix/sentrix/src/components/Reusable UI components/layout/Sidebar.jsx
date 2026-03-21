function Sidebar({ tabs = [], active, onTab, onLogout }) {
    const userName = localStorage.getItem("userName") || "User";

    return (
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-surface p-3 md:p-5 md:h-screen md:sticky md:top-0 md:flex md:flex-col">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-base md:text-xl font-bold text-textPrimary">Sentrix Menu</h2>
            </div>

            {/* Navigation - Flex grow to take remaining space */}
            <nav className="space-y-2 text-sm md:text-base flex-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => onTab(tab.key)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${active === tab.key
                            ? "bg-primary text-white"
                            : "text-textSecondary hover:bg-surface hover:text-textPrimary"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>

            {/* User Profile Section - Sticky at bottom */}
            <div className="mt-6 pt-6 border-t border-border">
                {/* User Info */}
                <div className="mb-4 px-3">
                    <p className="text-xs text-textSecondary uppercase tracking-wide">Logged in as</p>
                    <p className="text-sm font-semibold text-textPrimary truncate">{userName}</p>
                </div>

                {/* Logout Button */}
                <button
                    onClick={onLogout}
                    className="w-full px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-600 hover:text-red-700 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
