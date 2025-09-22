import { combineReducers } from "@reduxjs/toolkit";
import commonReducer from "./common";

const rootReducer = combineReducers({
  common: commonReducer,
});

export default rootReducer;
