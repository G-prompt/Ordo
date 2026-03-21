/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "#0B0B0B",
                card: "#111111",
                border: "#1F1F1F",
                textPrimary: "#FFFFFF",
                textSecondary: "#A1A1A1",

                riskLow: "#22C55E",
                riskMedium: "#F59E0B",
                riskHigh: "#EF4444",
            },
        },
    },
    plugins: [],
};