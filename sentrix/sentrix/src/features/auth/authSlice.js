import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: !!localStorage.getItem("authToken"),
    user: localStorage.getItem("userName") || null,
    email: localStorage.getItem("userEmail") || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.name;
            state.email = action.payload.email;
            localStorage.setItem("authToken", action.payload.token);
            localStorage.setItem("userName", action.payload.name);
            localStorage.setItem("userEmail", action.payload.email);
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.email = null;
            state.error = null;
            localStorage.removeItem("authToken");
            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
