import { DEPOSIT_CONSTS } from "../_constants";
import ceylonforkapi from "../api/index";
import { deposit } from "../_reducers/deposit.reducer";

export const viewOrderDetails = (data) => async (dispatch) => {
    const response = await ceylonforkapi.post("/deposit/order/",data)
    if(response.data.length==0){
        return 0;
    }else{
        dispatch({ type: DEPOSIT_CONSTS.VIEW_ORDER_DETAILS, payload: response.data })
    }
};

export const claerOrderDetails = () => {
    
   return{
       type: DEPOSIT_CONSTS.CLEAR_ORDER_DETAILS,
       
   }
};