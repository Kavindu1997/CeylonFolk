import { DEPOSIT_CONSTS } from "../_constants";

const initState = {
    order: [],
}

export const deposit = (state = initState, action) => {
    switch (action.type) {
        case DEPOSIT_CONSTS.VIEW_ORDER_DETAILS:
            return {
                ...state,
                order: action.payload
            };
            case DEPOSIT_CONSTS.CLEAR_ORDER_DETAILS:
                return {
                    ...state,
                    order: []
                };  
        default:
            return state;
    }
    return state;
}



