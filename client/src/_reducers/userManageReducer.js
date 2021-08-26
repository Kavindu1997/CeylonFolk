import { UserManageActionTypes} from "../_constants/userManageActionTypes";

const initialState = {
  users: [],
};

export const userReducer = (state = initialState, {type,payload}) => {
  switch (type){
      case UserManageActionTypes.FETCH_USERS:
        return {...state,users:payload};
      case UserManageActionTypes.CREATE_USER:
        return {...state,users:payload};
      case UserManageActionTypes.DELETE_USER:
        return {...state,users:payload};
      case UserManageActionTypes.UPDATE_USER:
      return state.map((user)=>user.id===payload.id?payload:{...state});
    default:
      return state;
  }
};
