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
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };

            case CART_CONSTS.UPDATE_CART_QUANTITY:
                return {
                    ...state,
                    cart: action.payload,   
                };

                case CART_CONSTS.CALCULATE_TOTAL_WHEN_CHANGED:
                    console.log(state.cart)
                return {
                    ...state,
                    cart: action.payload.cart,   
                    totalAmount: action.payload.total,
                };
                
            case CART_CONSTS.ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };


        case CART_CONSTS.DELETE_ITEM:
            updatedCart = [...state.cart];
            updatedItemIndex = updatedCart.findIndex(
                item => item.itemId === action.payload
            );
            updatedCart.splice(updatedItemIndex, 1);
            return { ...state, cart: updatedCart };

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

        case CART_CONSTS.GET_CART:
            return {
                ...state,
                cart: action.payload
            };

        case CART_CONSTS.GET_CART_TOTAL:
            return {
                ...state,
                totalAmount: action.payload[0].total
            };

        case CART_CONSTS.REMOVE_CART_ITEM:
            return{
                ...state,
                cart: action.payload
            };

        default:
            return state;

    }
    return state;
}



