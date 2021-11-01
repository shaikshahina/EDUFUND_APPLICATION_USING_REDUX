import { actionTypes } from '../constants/actionTypes'
import { auth } from '../../firebase'
import axios from "axios";

const registerStart = () => ({
    type: actionTypes.REGISTER_START
})

const registerSuccess = (user) => ({
    type: actionTypes.REGISTER_SUCCESS,
    payload: user
})

const registerFail = (error) => ({
    type: actionTypes.REGISTER_FAILURE,
    payload: error
})

const loginStart = () => ({
    type: actionTypes.LOGIN_START
})

const loginSuccess = (user) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: user
})

const loginFail = (error) => ({
    type: actionTypes.LOGIN_FAILURE,
    payload: error
})

const logoutStart = () => ({
    type: actionTypes.LOGOUT_START
})

const logoutSuccess = () => ({
    type: actionTypes.LOGOUT_SUCCESS
})

const logoutFail = (error) => ({
    type: actionTypes.LOGOUT_FAILURE,
    payload: error
})

const fetchmutualfundsDataStart = () => ({
    type: actionTypes.FETCH_MUTUALFUNDS_DATA_START
})

const fetchmutualfundsDataSuccess = (data) => ({
    type: actionTypes.FETCH_MUTUALFUNDS_DATA_SUCCESS,
    payload: data
})

const fetchmutualfundsDataFail = (error) => ({
    type: actionTypes.FETCH_MUTUALFUNDS_DATA_FAILURE,
    payload: error
})

export const registerInitiate = (email, password, userName) => {
    return function (dispatch) {
        dispatch(registerStart());
        auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
            user.updateProfile({
                userName
            })
            dispatch(registerSuccess(user))
        }).catch((error) => dispatch(registerFail(error.message)))

    }
}

export const loginInitiate = (email, password) => {
    return function (dispatch) {
        dispatch(loginStart());
        auth.signInWithEmailAndPassword(email, password).then(({ user }) => {
            dispatch(loginSuccess(user))
        }).catch((error) => dispatch(loginFail(error.message)))

    }
}

export const logoutInitiate = () => {
    return function (dispatch) {
        dispatch(logoutStart());
        auth.signOut().then((resp) => dispatch(logoutSuccess()))
            .catch((error) => dispatch(logoutFail(error.message)))

    }
}

export const fetchMutualfundsDataInitiate = () => async (dispatch) => {
    try {
        dispatch(fetchmutualfundsDataStart());
        const res = await axios.get('https://api.mfapi.in/mf');
        dispatch(fetchmutualfundsDataSuccess(res.data))
    } catch (err) {
        dispatch(fetchmutualfundsDataFail(err.message))
    }
}
export const fetchMutualDetails = (id) => async (dispatch) => {
    const response = await axios.get(`https://api.mfapi.in/mf/${id}`);
    dispatch({ type: actionTypes.FETCH_FUND_DETAILS, payload: response.data });
};
export const removeFundDetails = () => {
    return {
        type: actionTypes.REMOVE_FUND_DETAILS,
    };
};

