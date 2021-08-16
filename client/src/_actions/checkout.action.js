import { CHECKOUT_CONSTS } from "../_constants";

export const actionGetCustomerDetails = details => {
    return {
        type: CHECKOUT_CONSTS.GET_DETAILS,
        payload: details
    }
};