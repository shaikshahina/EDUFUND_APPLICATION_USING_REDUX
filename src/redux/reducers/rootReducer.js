import { combineReducers } from "redux"
import { userReducer ,mutualfundReducers,singleFundReducer} from "./userReducers"

const rootReducer = combineReducers({
    user: userReducer,
    mutualFundsData: mutualfundReducers,
    singleFundDetails: singleFundReducer,
})

export default rootReducer