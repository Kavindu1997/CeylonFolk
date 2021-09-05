import ceylonforkapi from "../api/index";
import { ProductActionTypes } from "../_constants";

export const fetchProducts = () => async (dispatch) => {
  const id = localStorage.getItem("userId");
  if(id !='0')
{
  const response = await ceylonforkapi.get("/shop/shops/"+id)
  dispatch({ type: ProductActionTypes.FETCH_PRODUCTS, payload: response.data })
}  else{
  const response = await ceylonforkapi.get("/shop")
  dispatch({ type: ProductActionTypes.FETCH_PRODUCTS, payload: response.data })
}
}

export const fetchProduct = (id) => async function (dispatch) {
  const response = await ceylonforkapi.get(`/ProductDetails/byPid/${id}`)
  dispatch({ type: ProductActionTypes.SELECTED_PRODUCT, payload: response.data })
}

export const setProducts = (products) => {
  return {
    type: ProductActionTypes.SET_PRODUCTS,
    payload: products,
  };
}

export const selectedProduct = (product) => {
  return {
    type: ProductActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
}

export const removeSelectedProduct = () => {
  return {
    type: ProductActionTypes.REMOVE_SELECTED_PRODUCT,
  };
}

export const actionAddToWishlist = (id) => async (dispatch)=> {
  const uid=localStorage.getItem("userId");
  const data = {uid: uid , id:id}
  if(uid!="0"){
    const response = await ceylonforkapi.post("/ProductDetails/addwishlist/",data)
    dispatch({ type: ProductActionTypes.SELECTED_PRODUCT, payload: response.data })
  } 
  dispatch({type:ProductActionTypes.ADD_TO_WISHLIST, payload: id})
}

