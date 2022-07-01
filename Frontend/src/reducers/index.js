import { combineReducers } from "redux";

import authReducer from "./authReducer.js"
import postReducer from "./postReducer";
import singlePostReducer from "./singlePostReducer";

export const reducers = combineReducers({authReducer,postReducer,singlePostReducer})