import { CART_CONSTS } from "../_constants";

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

/*export const actionGetTotalDeduct = total => {
    return {
        type: CART_CONSTS.GET_TOTAL_DEDUCT,
        payload: total
    }
};*/

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


