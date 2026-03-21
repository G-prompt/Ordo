export const fetchTransactions = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, amount: 45000, merchant: "Shop A", risk: "high", score: 75, date: "2026-03-20" },
                { id: 2, amount: 5000, merchant: "Shop B", risk: "low", score: 20, date: "2026-03-20" },
            ]);
        }, 300);
    });
};
