export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_TOTAL = 'GET_TOTAL';
export const DELETE_ITEM = 'DELETE_ITEM';

export const actionAddToCart = product => {
    return {
        type: ADD_TO_CART,
        payload: product
    }
};

export const actionGetTotal = total => {
    return {
        type: GET_TOTAL,
        payload: total
    }
};

export const actionDeleteItem = item => {
    return {
        type: DELETE_ITEM,
        payload: item
    }
};

