import { toast } from "react-toastify"
import { loginApi } from "../../services/UserSevices"

export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN'
export const FETCH_USER_SUCCES = 'FETCH_USER_SUCCES'
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'

export const USER_LOGOUT = 'USER_LOGOUT'
export const HANDEL_REFRESH = 'HANDEL_REFRESH'

export const handelLoginRedux = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_USER_LOGIN });

        let res = await loginApi(email.trim(), password)
        //success
        if(res && res.token) {

            localStorage.setItem('token', res.token)
            localStorage.setItem('email', email.trim())

            dispatch({
                type: FETCH_USER_SUCCES,
                data: {email: email.trim(), token: res.token}
            });
        }else {
            //error
            if(res && res.status === 400) {
                toast.error(res.data.error)
            }

            dispatch({
                type: FETCH_USER_ERROR
            })
        }
    }
}

export const handelLogoutRedux = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_LOGOUT
        })
    }
}

export const handelRefresh = () => {
    return (dispatch, getState) => {
        dispatch({
            type: HANDEL_REFRESH
        })
    }
}

