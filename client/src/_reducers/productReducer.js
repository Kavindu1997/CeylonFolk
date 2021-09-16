import { Category } from "@material-ui/icons";
import { ProductActionTypes } from "../_constants";

const initialState = {
  productObject: [], filteredItems: [], size:''
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ProductActionTypes.SET_PRODUCTS:
      return { ...state, productObject: payload }
    case ProductActionTypes.FETCH_PRODUCTS:
      return { ...state, productObject: payload, filteredItems: payload }
    case ProductActionTypes.FILTER_PRODUCTS_BY_SIZE:
    return { ...state, filteredItems: payload.items, size: payload.size }
    default:
      return state
  }
};

export const selectProductReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ProductActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload }

    case ProductActionTypes.REMOVE_SELECTED_PRODUCT:
      return {}

    default:
      return state
  }
};