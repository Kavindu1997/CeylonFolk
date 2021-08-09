import { USER_CONSTS } from "../_constants";
const initialState = {
  isUserLogged: false,
  userDetails: [{ name: "test11", email: "hello@gmail.com" }],
  isLoaderActive: false,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_CONSTS.LOGIN_REQUEST:
      return {
        ...state,
      };
    case USER_CONSTS.LOGIN_SUCCESS:
      console.log(action.user);
      return {
        ...state,
        isUserLogged: true,
        userDetails: action.user,
      };
    default:
      return state;
  }
};
