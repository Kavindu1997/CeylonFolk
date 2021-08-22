import ceylonforkapi from "../api/index";
import { ProductActionTypes } from "../_constants";

export const fetchProducts = () => async (dispatch) => {
  const response = await ceylonforkapi.get("/shop")
  dispatch({type: ProductActionTypes.FETCH_PRODUCTS,payload: response.data})
}

export const fetchProduct = (id) => async function(dispatch) {
  const response = await ceylonforkapi.get(`/ProductDetails/byPid/${id}`)
  dispatch({type: ProductActionTypes.SELECTED_PRODUCT,payload: response.data})
}

export const setProducts = (products) => {
  return { 
    type:  ProductActionTypes.SET_PRODUCTS, 
    payload: products,
  };
}

export const selectedProduct = (product) => {
  return { 
    type:  ProductActionTypes.SELECTED_PRODUCT, 
    payload: product,
  };
}

export const removeSelectedProduct = () => {
  return { 
    type:  ProductActionTypes.REMOVE_SELECTED_PRODUCT, 
  };
}

