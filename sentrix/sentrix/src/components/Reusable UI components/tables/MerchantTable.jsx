function MerchantTable({ merchants = [] }) {
    if (!merchants.length) {
        return <p>No merchants available.</p>;
    }
    return (
        <table className="min-w-full bg-white border border-border rounded-xl overflow-hidden">
            <thead className="bg-surface">
                <tr>
                    <th className="px-3 py-2 text-left">Merchant</th>
                    <th className="px-3 py-2 text-left">Risk Score</th>
                    <th className="px-3 py-2 text-left">Transactions</th>
                    <th className="px-3 py-2 text-left">Status</th>
                </tr>
            </thead>
            <tbody>
                {merchants.map((m, idx) => (
                    <tr key={idx} className="border-t border-border">
                        <td className="px-3 py-2">{m.name}</td>
                        <td className="px-3 py-2">{m.riskScore}</td>
                        <td className="px-3 py-2">{m.txCount}</td>
                        <td className="px-3 py-2">{m.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MerchantTable;
