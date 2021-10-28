import { actionTypes } from "../constants/actionTypes";
const initialState = {
    loading: false,
    currentUser: null,
    error: null
}
const userReducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.REGISTER_START:
            return {
                ...state,
                loading: true,
            }

        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
            }

        case actionTypes.REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state

    }
}

export {userReducer};