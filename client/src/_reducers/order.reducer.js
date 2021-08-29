import { ORDER_CONSTS } from "../_constants";

const initState = {
    order: [],
}

export const order = (state = initState, action) => {
    switch (action.type) {
        case ORDER_CONSTS.VIEW_ORDER_DETAILS:
            console.log(action.payload)
            return {
                ...state,
                order: action.payload
            };

        default:
            return state;
    }
    return state;
}



