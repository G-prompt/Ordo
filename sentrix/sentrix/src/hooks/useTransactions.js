import { useState, useEffect } from "react";
import { fetchTransactions } from "../features/transactions/transactionAPI";

export default function useTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;
        fetchTransactions()
            .then((data) => {
                if (active) {
                    setTransactions(data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (active) {
                    setError(err);
                    setLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    return { transactions, loading, error };
}
