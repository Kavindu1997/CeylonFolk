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
            console.log(state.cart)
            updatedCart = [...state.cart];
          let  isProdutInCart  =false
            
            for(let i=0 ;i<= updatedCart.length-1;i++){
                if(updatedCart[i].size=== action.payload.size  && updatedCart[i].productId ===action.payload.productId ){
                    updatedCart[i].quantity = action.payload.quantity + updatedCart[i].quantity;
                    updatedCart[i].totals =  updatedCart[i].quantity * action.payload.price;
                    isProdutInCart = true;
                }
            }

            if(isProdutInCart==true){

            }else{
                updatedCart = [...state.cart, action.payload]
            }


            return {
                ...state,
                cart:updatedCart
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
            console.log(action.payload.id)
            console.log(action.payload.size)
            updatedCart = [...state.cart];
            console.log(updatedCart)
            updatedItemIndex = updatedCart.findIndex(
                item => (item.productId === action.payload.id && item.size === action.payload.size)
            );
            updatedCart.splice(updatedItemIndex, 1);
            return { ...state, cart: updatedCart };

        case CART_CONSTS.GET_TOTAL:
            return {
                ...state,
                totalAmount: state.totalAmount + action.payload
            };

        case CART_CONSTS.GET_TOTAL_DEDUCT:
            let totalAmount=0
            updatedCart = [...state.cart];
            for(let i=0 ;i<= updatedCart.length-1;i++){
                totalAmount=totalAmount+updatedCart[i].totals
            }
            return {
                ...state,
                totalAmount:totalAmount
            };

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
            console.log(state.cart)
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



