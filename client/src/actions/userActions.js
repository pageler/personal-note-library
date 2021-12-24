import axios from "axios";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST }); // Call reducer, loading: true

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        // Login User
        const { data } = await axios.post(
            "/api/users/login",
            { email, password },
            config
        );

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data }); // Call reducer

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL, // Call reducer
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password, pic) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const { data } = await axios.post(
            "/api/users",
            { name, email, password, pic },
            config
        );

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};