import { CHECKOUT_CONSTS } from "../_constants";
import ceylonforkapi from "../api/index";
import { getCart,getTotal, emptyCart, emtyTotal,calculateCartCount } from ".";
import { id } from "date-fns/locale";

export const actionGetCustomerDetails = details => async (dispatch)=> {
    var id = localStorage.getItem("userId");
    if (id != '0') {
        const response = await ceylonforkapi.get("/check/customer/"+ id)
        dispatch({ type: CHECKOUT_CONSTS.GET_DETAILS, payload: response.data })
    }    
};

export const actionGetDistricts = delivery => async (dispatch)=> {
        const response = await ceylonforkapi.get("/check/district/")
        dispatch({ type: CHECKOUT_CONSTS.GET_DISTRICT, payload: response.data })
};

export const actionSendToDB = (item) => async (dispatch)=> {
        ceylonforkapi.post("/check/cashOn/",item).then((response) => { 
            if (response.data.data==0) {
                return 0;
            } else {
                dispatch(actionDeleteItem(item))
                return 1;
            }
            dispatch(emptyCart())
            dispatch(emtyTotal()) 
            dispatch(calculateCartCount())
        })
};

export const actionDeleteItem = (item) => async (dispatch)=> {
            const response = await ceylonforkapi.put("/check/deleteCart/",item)
                if (response.data.status==0) {
                    dispatch(errorMsg('1'))
                } else {
                    console.log(response.data)
                    dispatch(getCart())
                    dispatch(getTotal())
                    dispatch(errorMsg("2"))
                }
};

export const errorMsg = (msg) => async (dispatch)=> {
    dispatch({ type: CHECKOUT_CONSTS.ERROR_MSG, payload: msg })
};


