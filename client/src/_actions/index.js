import { CART_CONSTS } from "../_constants";
import ceylonforkapi from "../api/index";


export const actionAddToCart = product => {
    return {
        type: CART_CONSTS.ADD_TO_CART,
        payload: product
    }
};

export const actionGetTotal = total => {
    return {
        type: CART_CONSTS.GET_TOTAL,
        payload: total
    }
};

export const actionDeleteItem = id => {
    return {
        type: CART_CONSTS.DELETE_ITEM,
        payload: id
    }
};

export const incrementCartCount = () => {
    return {
        type: CART_CONSTS.INCREMENT_CART_NO,
    }
};

export const decrementCartCount = () => {
    return {
        type: CART_CONSTS.DECREMENT_CART_NO,
    }
};

export const getCart = () => async (dispatch) => {
    var id = localStorage.getItem("userId");
    if (id != '0') {
        const response = await ceylonforkapi.get("/check/items/"+ id)
        dispatch({ type: CART_CONSTS.GET_CART, payload: response.data })
        console.log(response.data)
    }


};
export const deleteCartUsingID = (id) => async (dispatch) => {
    var uid = localStorage.getItem("userId")
    if (uid > 0) {
      const data = { userId: uid, itemId: id }
        await ceylonforkapi.put("/check/remove/",data).then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
            dispatch(getCart())
            dispatch(getTotal())
            dispatch(decrementCartCount());
        }
      });
    }
};

export const getTotal = () => async (dispatch) => {
    var id = localStorage.getItem("userId");
    if (id != '0') {
        const response = await ceylonforkapi.get("/check/total/"+ id)
        dispatch({ type: CART_CONSTS.GET_CART_TOTAL, payload: response.data })
    }
};

export const sendProductsToDB = (product) => async (dispatch) => {
        await ceylonforkapi.post("/check/addToCart/",product).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
                return 0;
            }
            else {
                dispatch(incrementCartCount());
                dispatch(actionAddToCart(product));
                return 1;
            }
          });    
};


