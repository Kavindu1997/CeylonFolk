import { CHECKOUT_CONSTS } from "../_constants";
import ceylonforkapi from "../api/index";
import { getCart,getTotal } from ".";

export const actionGetCustomerDetails = details => async (dispatch)=> {
    var id = localStorage.getItem("userId");
    if (id != '0') {
        const response = await ceylonforkapi.get("/check/customer/"+ id)
        dispatch({ type: CHECKOUT_CONSTS.GET_DETAILS, payload: response.data })
        console.log(response.data)
    }    
};

export const actionSendToDB = (item) => async (dispatch)=> {
        await ceylonforkapi.post("/check/cashOn/",item).then((response) => {
            if (response.data.error) {
                alert("Order Placement Unsuccessful");
            } else {
                dispatch(actionDeleteItem(item))
                alert("Order Placement Successful");

            }
        });
        dispatch(getCart())
        dispatch(getTotal()) 
};

export const actionDeleteItem = (item) => async (dispatch)=> {
            await ceylonforkapi.put("/check/deleteCart/",item).then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                }else{
                    dispatch(getCart())
                    dispatch(getTotal())
                }

            });
           

};

