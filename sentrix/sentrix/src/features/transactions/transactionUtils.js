import { formatCurrency, formatDate } from "../../utils/formatters";

export const normalizeTransaction = (tx) => ({
    ...tx,
    formattedAmount: formatCurrency(tx.amount),
    formattedDate: formatDate(tx.date),
});
