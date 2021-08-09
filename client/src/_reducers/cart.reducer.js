import { CART_CONSTS } from "../_constants";

const initState = {
    cart: [],
    cartCount: 0,
    totalAmount: 0,
    totalAmountDeduct: 0,
}

export const cart = (state = initState, action) => {
    let updatedCart;
    let updatedItemIndex;
    
    switch (action.type) {
        case CART_CONSTS.ADD_TO_CART:
            console.log(state);
            console.log(action)
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };

        case CART_CONSTS.DELETE_ITEM:
            updatedCart = [...state.cart];
            updatedItemIndex = updatedCart.findIndex(
                item => item.itemId === action.payload
            );
            console.log(updatedItemIndex)
            updatedCart.splice(updatedItemIndex, 1);
            return {...state, cart: updatedCart};

        case CART_CONSTS.GET_TOTAL:
            return {
                ...state,
                totalAmount: state.totalAmount + action.payload
            };

        /*case CART_CONSTS.GET_TOTAL_DEDUCT:
            return {
                ...state.totalAmount,
                totalAmountDeduct: state.totalAmount - action.payload
            };*/

        case CART_CONSTS.INCREMENT_CART_NO:
            return {
                ...state,
                cartCount: state.cartCount + 1
            };

        case CART_CONSTS.DECREMENT_CART_NO:
            return { 
                ...state,
                cartCount: state.cartCount - 1 
            };
            
        default:
            return state;

    }
    return state;
}



