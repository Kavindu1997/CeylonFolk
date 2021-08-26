import { combineReducers } from "redux";
import { user } from "./user.reducer";
import { cart } from "./cart.reducer";
import { checkout } from "./checkout.reducer";
import { productReducer, selectProductReducer } from "./productReducer";
import { colorReducer } from "./colorReducer";

const rootReducer = combineReducers({ user, cart, checkout, productReducer, selectProductReducer, colorReducer });


export default rootReducer;
