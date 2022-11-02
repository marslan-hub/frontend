import { applyMiddleware, createStore, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import MapReducers from "./components/Map/Map.reducer";

const reduxMiddleware = applyMiddleware(logger, thunk);

const Store = createStore(MapReducers, {}, reduxMiddleware);

export default Store;
