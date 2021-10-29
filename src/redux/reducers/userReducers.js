import { actionTypes } from "../constants/actionTypes";
const initialState = {
    loading: false,
    currentUser: null,
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

export { userReducer };