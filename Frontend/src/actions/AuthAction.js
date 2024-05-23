import * as AuthApi from "../api/AuthRequest.js"

export const logIn = (formData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" })
    try {
        const { data } = await AuthApi.logIn(formData);
        dispatch({ type: "AUTH_SUCCESS", data: data })
    } catch (error) {
        dispatch({ type: "AUTH_FAIL"})
        console.log(error);
    }
}

export const addDeviceToken = (token) => async (dispatch) => {
    dispatch({ type: "DEVICE_TOKEN_STORING_START" })
    try {
        dispatch({ type: "DEVICE_TOKEN_STORING_SUCCESS", data: token })
    }
    catch (error) {
        console.log(error);
        dispatch({ type: "DEVICE_TOKEN_STORING_FAIL" })
    }
}

export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" })
    try {
        const { data } = await AuthApi.signUp(formData);
        dispatch({ type: "AUTH_SUCCESS", data: data })
    } catch (error) {
        console.log(error);
    }
}

export const logout = () => async (dispatch) => {
    localStorage.clear();
    dispatch({ type: "LOG_OUT" })
}


