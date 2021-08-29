import { ORDER_CONSTS } from "../_constants";
import ceylonforkapi from "../api/index";
import { order } from "../_reducers/order.reducer";

export const viewOrderDetails = (data) => async (dispatch) => {
    const response = await ceylonforkapi.post("/check/order/",data)
    dispatch({ type: ORDER_CONSTS.VIEW_ORDER_DETAILS, payload: response.data })
};