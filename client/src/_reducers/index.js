import { combineReducers } from "redux";
import { user } from "./user.reducer";
import { cart } from "./cart.reducer";
import { checkout } from "./checkout.reducer";
import { productReducer, selectProductReducer } from "./productReducer";
import { colorReducer } from "./colorReducer";
import { userReducer, selectUserReducer } from "./userManageReducer";


const rootReducer = combineReducers({ user, cart, checkout, productReducer,colorReducer,selectProductReducer,userReducer,selectUserReducer });


export default rootReducer;
 