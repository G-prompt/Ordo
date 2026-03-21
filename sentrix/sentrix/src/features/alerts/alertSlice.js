const initialState = {
    alerts: [],
};

export const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case "alerts/add":
            return { ...state, alerts: [action.payload, ...state.alerts] };
        case "alerts/clear":
            return { ...state, alerts: [] };
        default:
            return state;
    }
};

export const addAlert = (alert) => ({ type: "alerts/add", payload: alert });
export const clearAlerts = () => ({ type: "alerts/clear" });
