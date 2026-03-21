import { useEffect, useState } from "react";

export default function useRealtime(initialData = [], intervalMs = 5000) {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        const timer = setInterval(() => {
            setData((prev) => [...prev, { id: prev.length + 1, text: `Real-time event ${prev.length + 1}` }]);
        }, intervalMs);

        return () => clearInterval(timer);
    }, [intervalMs]);

    return data;
}
