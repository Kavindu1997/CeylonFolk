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
    default:
      return state;
  }
};

export const selectUserReducer = (state={}, {type,payload}) => {
  switch (type){
    case UserManageActionTypes.SELECTED_USER:
      return {...state,  ...payload}
    case UserManageActionTypes.REMOVE_SELECTED_USER:
      return {}
    default:
    return state
  }
};