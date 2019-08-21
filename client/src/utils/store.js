import { createStore } from "redux";
import middleware from "../redux/middleware";
import rootReducer from "../redux/reducers";

const initialState = {};

export const store = createStore(rootReducer, initialState, middleware);
