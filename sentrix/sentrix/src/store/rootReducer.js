import { transactionReducer } from "../features/transactions/transactionSlice";
import { alertReducer } from "../features/alerts/alertSlice";
import { merchantReducer } from "../features/merchants/merchantSlice";

export const rootReducer = {
    transactions: transactionReducer,
    alerts: alertReducer,
    merchants: merchantReducer,
};
