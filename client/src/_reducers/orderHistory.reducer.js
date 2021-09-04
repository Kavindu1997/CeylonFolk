import { ORDERHISTORY_CONSTS } from "../_constants";

const initState = {
    orderHistory: [],
    selectedOrder: []
}

export const orderHistory = (state = initState, action) => {
    switch (action.type) {
        case ORDERHISTORY_CONSTS.GET_ORDER_HISTORY:
            console.log(action.payload)
            return {
                ...state,
                orderHistory: action.payload
            };
            case ORDERHISTORY_CONSTS.VIEW_ORDER:
                console.log(action.payload)
                return {
                    ...state,
                    selectedOrder: action.payload
                };
        default:
            return state;
    }
    return state;
}



