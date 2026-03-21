function TransactionChart() {
    return (
        <div className="bg-card border border-border rounded-2xl p-4">
            <h3 className="font-semibold mb-2">Transaction Volume</h3>
            <div className="h-40 grid grid-cols-7 gap-2 items-end">
                {[20, 30, 45, 60, 55, 35, 50].map((height, idx) => (
                    <div key={idx} className="w-full bg-primary rounded-t" style={{ height: `${height}%` }} />
                ))}
            </div>
        </div>
    );
}

export default TransactionChart;
