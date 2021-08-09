import { combineReducers } from "redux";
import { user } from "./user.reducer";
import { cart } from "./cart.reducer";

const rootReducer = combineReducers({ user, cart });


export default rootReducer;
