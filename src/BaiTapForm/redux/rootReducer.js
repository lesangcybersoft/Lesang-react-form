import { combineReducers } from "redux";
import { BTFormReducer } from "./slice";

export const RootReducer = combineReducers({
    BTForm: BTFormReducer,
});
