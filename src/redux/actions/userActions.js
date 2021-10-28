import {actionTypes} from './constants/actionTypes'
import {auth} from '../firebase'

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

export const registerInitiate = (email,password,displayName) => {
    return function(dispatch){
        dispatch(registerStart());
        auth.createUserWithEmailAndPassword(email,password).then(({user}) => {
            user.updateProfile({
                displayName
            })
            dispatch(registerSuccess(user))
        }).catch((error) => dispatch(registerFail(error.message)))

    }
}