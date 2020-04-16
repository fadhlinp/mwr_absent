import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducers from "../reducers";

export default store = createStore(rootReducers, applyMiddleware(thunk));
