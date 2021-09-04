import { CHECKOUT_CONSTS } from "../_constants";

const initState = {
    detail: [],
    cartCount: 0,
    delivery: [],
}

export const checkout = (state = initState, action) => {

    switch (action.type) {
        case CHECKOUT_CONSTS.GET_DETAILS:
            return {
                ...state,
                detail: action.payload,
            };
        case CHECKOUT_CONSTS.GET_DISTRICT:
            return {
                ...state,
                delivery: action.payload,
            };
        default:
            return state;

    }
    return state;

}
