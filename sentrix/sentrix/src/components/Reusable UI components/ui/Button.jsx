function Button({ children, onClick, type = "button", className = "" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border border-border bg-primary text-white hover:opacity-90 ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;
