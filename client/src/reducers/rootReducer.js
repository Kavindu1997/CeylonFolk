const initState = {
    counter: 234,
    cart: [],
    cartCount: 0,
    totalAmount: 0,
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            console.log(state);
            console.log(action)
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };
        case 'GET_TOTAL':
            return {
                ...state,
                totalAmount: state.totalAmount + action.payload
            };
        case 'INCREMENT_CART_NO':
            return {
                ...state,
                cartCount: state.cartCount + 1
            };
        case 'DECREMENT':
            return { counter: state.counter - 1 };
        default:
            return state;

    }
    return state;
}

export default rootReducer;


