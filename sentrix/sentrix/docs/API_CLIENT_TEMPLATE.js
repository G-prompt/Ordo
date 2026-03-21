/**
 * BACKEND INTEGRATION GUIDE
 * ========================
 * 
 * Current Status: Using mock data with setTimeout
 * Next Step: Replace with actual API calls to backend
 * 
 * INSTRUCTIONS FOR BACKEND DEVELOPER:
 * 
 * 1. Set environment variable in .env.local:
 *    VITE_API_URL=http://localhost:5000  (or your backend URL)
 * 
 * 2. Update apiClient.js to handle:
 *    - Authentication tokens (stored in localStorage)
 *    - Error responses and retries
 *    - Loading states
 * 
 * 3. Replace mock data in features/*/transactionAPI.js with:
 *    const { apiClient } = await import("../../services/apiClient.js");
 *    return apiClient.get(`${import.meta.env.VITE_API_URL}/transactions`);
 * 
 * EXPECTED API RESPONSE FORMAT:
 * {
    *   "success": true,
    *   "data": [...],
    *   "error": null
 * }
    * 
 */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiClient = {
    /**
     * GET request
     * @param {string} endpoint - API endpoint
     * @param {object} options - fetch options
     */
    async get(endpoint, options = {}) {
        const token = localStorage.getItem("authToken");
        const headers = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: "GET",
                ...options,
                headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error [GET ${endpoint}]:`, error);
            throw error;
        }
    },

    /**
     * POST request
     * @param {string} endpoint - API endpoint
     * @param {object} body - Request body
     * @param {object} options - fetch options
     */
    async post(endpoint, body = {}, options = {}) {
        const token = localStorage.getItem("authToken");
        const headers = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: "POST",
                ...options,
                headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error [POST ${endpoint}]:`, error);
            throw error;
        }
    },

    /**
     * PATCH request
     * @param {string} endpoint - API endpoint
     * @param {object} body - Request body
     * @param {object} options - fetch options
     */
    async patch(endpoint, body = {}, options = {}) {
        const token = localStorage.getItem("authToken");
        const headers = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: "PATCH",
                ...options,
                headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error [PATCH ${endpoint}]:`, error);
            throw error;
        }
    },

    /**
     * DELETE request
     * @param {string} endpoint - API endpoint
     * @param {object} options - fetch options
     */
    async delete(endpoint, options = {}) {
        const token = localStorage.getItem("authToken");
        const headers = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: "DELETE",
                ...options,
                headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error [DELETE ${endpoint}]:`, error);
            throw error;
        }
    },
};
