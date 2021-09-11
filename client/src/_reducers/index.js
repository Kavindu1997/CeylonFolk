import { combineReducers } from "redux";
import { cart } from "./cart.reducer";
import { checkout } from "./checkout.reducer";
import { productReducer, selectProductReducer } from "./productReducer";
import { colorReducer } from "./colorReducer";
import { userReducer } from "./userManageReducer";
import { couponReducer } from "./couponReducer";
import { deposit } from "./deposit.reducer";
import { orderHistory } from "./orderHistory.reducer";
import { userEmailReducer } from "./userDetailsReducer";

const rootReducer = combineReducers({ cart, checkout, productReducer, colorReducer, selectProductReducer, userReducer, couponReducer, deposit, orderHistory, userEmailReducer  });

export default rootReducer;
