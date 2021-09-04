import { CHECKOUT_CONSTS } from "../_constants";
import ceylonforkapi from "../api/index";
import { getCart,getTotal, emptyCart, emtyTotal,calculateCartCount } from ".";

export const actionGetCustomerDetails = details => async (dispatch)=> {
    var id = localStorage.getItem("userId");
    if (id != '0') {
        const response = await ceylonforkapi.get("/check/customer/"+ id)
        dispatch({ type: CHECKOUT_CONSTS.GET_DETAILS, payload: response.data })
        console.log(response.data)
    }    
};

export const actionGetDistricts = delivery => async (dispatch)=> {
        const response = await ceylonforkapi.get("/check/district/")
        dispatch({ type: CHECKOUT_CONSTS.GET_DISTRICT, payload: response.data })
        console.log(response.data)  
};

export const actionSendToDB = (item) => async (dispatch)=> {
        const response = await ceylonforkapi.post("/check/cashOn/",item) 
            if (response.data.error) {
                alert("Order Placement Unsuccessful");
            } else {
                dispatch(actionDeleteItem(item))
                alert("Order Placement Successful");
            }
            dispatch(emptyCart())
            dispatch(emtyTotal()) 
            dispatch(calculateCartCount())
        
};

export const actionDeleteItem = (item) => async (dispatch)=> {
            const response = await ceylonforkapi.put("/check/deleteCart/",item)
                if (response.data.error) {
                    alert(response.data.error);
                }else{
                    dispatch(getCart())
                    dispatch(getTotal())
                }

          
           

};

