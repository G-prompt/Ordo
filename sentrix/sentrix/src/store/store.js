// In this setup, we keep a small local state provider as a placeholder.
// No third-party store dependency is needed for a basic working UI.

import { transactionReducer } from "../features/transactions/transactionSlice";
import { alertReducer } from "../features/alerts/alertSlice";
import { merchantReducer } from "../features/merchants/merchantSlice";

const state = {
    transactions: transactionReducer(undefined, {}),
    alerts: alertReducer(undefined, {}),
    merchants: merchantReducer(undefined, {}),
};

export const getState = () => state;

export const dispatch = (action) => {
    state.transactions = transactionReducer(state.transactions, action);
    state.alerts = alertReducer(state.alerts, action);
    state.merchants = merchantReducer(state.merchants, action);
    return action;
};

