const initialState = {
    merchants: [],
};

export const merchantReducer = (state = initialState, action) => {
    switch (action.type) {
        case "merchants/update":
            return { ...state, merchants: action.payload };
        case "merchants/add":
            return { ...state, merchants: [...state.merchants, action.payload] };
        default:
            return state;
    }
};

export const addMerchant = (merchant) => ({ type: "merchants/add", payload: merchant });
export const updateMerchants = (merchants) => ({ type: "merchants/update", payload: merchants });
