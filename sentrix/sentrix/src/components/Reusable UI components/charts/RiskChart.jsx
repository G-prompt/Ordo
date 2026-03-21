function RiskChart() {
    return (
        <div className="bg-card border border-border rounded-2xl p-4">
            <h3 className="font-semibold mb-2">Risk Trend</h3>
            <div className="h-40 flex items-end gap-2">
                <div className="w-8 h-12 bg-riskLow rounded"></div>
                <div className="w-8 h-20 bg-riskMedium rounded"></div>
                <div className="w-8 h-28 bg-riskHigh rounded"></div>
                <div className="w-8 h-24 bg-riskMedium rounded"></div>
                <div className="w-8 h-18 bg-riskLow rounded"></div>
            </div>
        </div>
    );
}

export default RiskChart;
