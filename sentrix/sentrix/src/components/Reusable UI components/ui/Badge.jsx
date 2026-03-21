function Badge({ type, text }) {
    const styles = {
        low: "bg-riskLow/20 text-riskLow",
        medium: "bg-riskMedium/20 text-riskMedium",
        high: "bg-riskHigh/20 text-riskHigh",
    };

    return (
        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${styles[type]}`}>
            {text}
        </span>
    );
}

export default Badge;