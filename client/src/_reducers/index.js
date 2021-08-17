import { combineReducers } from "redux";
import { user } from "./user.reducer";
import { cart } from "./cart.reducer";
import { checkout } from "./checkout.reducer";

const rootReducer = combineReducers({ user, cart, checkout });


export default rootReducer;
