import { actionTypes } from "../constants/actionTypes";
const initialState = {
    loading: false,
    currentUser: null,
    error: null
}
const initialFetchingState = {
    mutualFundsData: [],
    error: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_START:
        case actionTypes.LOGIN_START:
        case actionTypes.LOGOUT_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
            }

        case actionTypes.REGISTER_FAILURE:
        case actionTypes.LOGIN_FAILURE:
        case actionTypes.LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state

    }
}

export const mutualfundReducers = (state = initialFetchingState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MUTUALFUNDS_DATA_START:
            return { ...state }
        case actionTypes.FETCH_MUTUALFUNDS_DATA_SUCCESS:
            return { ...state, mutualFundsData: action.payload };
        case actionTypes.FETCH_MUTUALFUNDS_DATA_FAILURE:
            return { ...state, error: action.payload }
        default:
            return state;

    }
}
export const singleFundReducer = (state = { singleFundDetails: {} }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FUND_DETAILS:
            return { ...state, singleFundDetails: action.payload }
        case actionTypes.REMOVE_FUND_DETAILS:
            return {};
        default:
            return state;

    }
}


export { userReducer };