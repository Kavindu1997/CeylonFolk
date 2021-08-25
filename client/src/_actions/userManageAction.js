import ceylonforkapi from "../api/index";
import { UserManageActionTypes } from "../_constants/userManageActionTypes";

export const fetchUsers = () => async (dispatch) => {
  const response = await ceylonforkapi.get("/users")
  dispatch({type: UserManageActionTypes.FETCH_USERS,payload: response.data})
}

export const createUser = (data) => async (dispatch) => {
  const response = await ceylonforkapi.post("/users",data);
  dispatch({type: UserManageActionTypes.CREATE_USER,payload: response.data});
}

export const deleteUser = (id) => async (dispatch) => {
  const response = await ceylonforkapi.delete(`/users/${id}`);
  dispatch({type: UserManageActionTypes.DELETE_USER,payload: response.data});
}

// export const fetchProduct = (id) => async function(dispatch) {
//   const response = await ceylonforkapi.get(`/ProductDetails/byPid/${id}`)
//   dispatch({type: ProductActionTypes.SELECTED_PRODUCT,payload: response.data})
// }



// export const removeSelectedUser = () => {
//   return { 
//     type:  UserManageActionTypes.REMOVE_SELECTED_USER, 
//   };
// }

