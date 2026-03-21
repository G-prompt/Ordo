import { apiClient } from "./apiClient";

export const getTransactions = async () => {
    try {
        // Placeholder path; update to real API endpoint as needed
        return await apiClient.get("/api/transactions");
    } catch (error) {
        console.error(error);
        return [];
    }
};
