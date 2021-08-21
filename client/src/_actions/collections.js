import { COLLECTION_CONSTS } from "../_constants/collection.consts";


export const actionDeleteCollection = id => {
    return {
        type: COLLECTION_CONSTS.DELETE_COLLECTION,
        payload: id
    }
};




