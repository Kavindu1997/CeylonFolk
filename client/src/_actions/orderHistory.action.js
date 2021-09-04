import { ORDERHISTORY_CONSTS } from "../_constants";
import ceylonforkapi from "../api/index";
import { order } from "../_reducers/deposit.reducer";

export const getOrderHistory = () => async (dispatch) => {
    var id = localStorage.getItem("userId");
    if (id != '0') {
        const response = await ceylonforkapi.get("/order/getHistory/"+ id)
        dispatch({ type: ORDERHISTORY_CONSTS.GET_ORDER_HISTORY, payload: response.data  })
    }
};

export const viewOrderDetail = (oId) => async (dispatch) => {
    const response = await ceylonforkapi.get("/order/order/"+oId)
    dispatch({ type: ORDERHISTORY_CONSTS.VIEW_ORDER, payload: response.data })
};
