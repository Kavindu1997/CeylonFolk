import { ORDER_CONSTS } from "../_constants";

const initState = {
    order: [],
}

export const order = (state = initState, action) => {
    switch (action.type) {
        case ORDER_CONSTS.VIEW_ORDER_DETAILS:
            return {
                ...state,
                order: action.payload
            };
            case ORDER_CONSTS.CLEAR_ORDER_DETAILS:
            return {
                ...state,
                order: []
            };
        default:
            return state;
    }
    return state;
}



