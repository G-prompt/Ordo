import { fetchTransactions } from "./transactionAPI";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "transactions/fetchStart":
            return { ...state, loading: true, error: null };
        case "transactions/fetchSuccess":
            return { ...state, loading: false, items: action.payload };
        case "transactions/fetchFailure":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const loadTransactions = () => async (dispatch) => {
    dispatch({ type: "transactions/fetchStart" });
    try {
        const data = await fetchTransactions();
        dispatch({ type: "transactions/fetchSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "transactions/fetchFailure", payload: error.toString() });
    }
};
