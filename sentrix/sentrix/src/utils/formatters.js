export const formatCurrency = (value) => {
    const number = Number(value || 0);
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(number);
};

export const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    return date.toLocaleDateString();
};
