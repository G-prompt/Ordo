import { useState } from "react";

export default function useAlerts() {
    const [alerts, setAlerts] = useState([]);

    const addAlert = (alert) => {
        setAlerts((prev) => [alert, ...prev]);
    };

    const clearAlerts = () => setAlerts([]);

    return { alerts, addAlert, clearAlerts };
}
