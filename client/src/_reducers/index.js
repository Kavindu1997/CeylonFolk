import { combineReducers } from "redux";
import { user } from "./user.reducer";
import { cart } from "./cart.reducer";
import { checkout } from "./checkout.reducer";
import { productReducer, selectProductReducer } from "./productReducer";
import { colorReducer } from "./colorReducer";
import { order } from "./order.reducer";

const rootReducer = combineReducers({ user, cart, checkout, productReducer, selectProductReducer,  colorReducer, order});


export default rootReducer;
 