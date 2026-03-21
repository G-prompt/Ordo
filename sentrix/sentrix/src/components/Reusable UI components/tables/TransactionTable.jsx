function TransactionTable({ rows = [] }) {
    if (!rows.length) {
        return <p>No transactions available.</p>;
    }

    return (
        <table className="min-w-full bg-white border border-border rounded-xl overflow-hidden">
            <thead className="bg-surface">
                <tr>
                    <th className="px-3 py-2 text-left">ID</th>
                    <th className="px-3 py-2 text-left">Amount</th>
                    <th className="px-3 py-2 text-left">Merchant</th>
                    <th className="px-3 py-2 text-left">Risk</th>
                    <th className="px-3 py-2 text-left">Date</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.id} className="border-t border-border">
                        <td className="px-3 py-2">{row.id}</td>
                        <td className="px-3 py-2">{row.amount}</td>
                        <td className="px-3 py-2">{row.merchant}</td>
                        <td className="px-3 py-2">{row.risk}</td>
                        <td className="px-3 py-2">{row.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TransactionTable;
