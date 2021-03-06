import { createStore, applyMiddleware, compose } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import rootReducer from "./reducers/rootReducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store