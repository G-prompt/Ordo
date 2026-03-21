import { useSelector, useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure, logout } from "./authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const login = async (email, password) => {
        dispatch(loginStart());
        try {
            // TODO: Replace with actual API call
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error("Login failed");

            const data = await response.json();
            dispatch(
                loginSuccess({
                    token: data.token,
                    name: data.user.name,
                    email: data.user.email,
                })
            );
        } catch (error) {
            dispatch(loginFailure(error.message));
            throw error;
        }
    };

    const signout = () => {
        dispatch(logout());
    };

    return {
        ...auth,
        login,
        logout: signout,
    };
};
