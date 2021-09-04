import { ORDER_CONSTS } from "../_constants";
import ceylonforkapi from "../api/index";
import { order } from "../_reducers/order.reducer";

export const viewOrderDetails = (data) => async (dispatch) => {
    const response = await ceylonforkapi.post("/deposit/order/",data)
    console.log(response.data.length)
    if(response.data.length==0){
        return 0;
    }else{
        dispatch({ type: ORDER_CONSTS.VIEW_ORDER_DETAILS, payload: response.data })
    }
};

export const claerOrderDetails = () => {
   return{
       type: ORDER_CONSTS.CLEAR_ORDER_DETAILS,
   }
};