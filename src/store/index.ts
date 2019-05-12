import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import {reducer} from "./reducer"

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));

export default store;
