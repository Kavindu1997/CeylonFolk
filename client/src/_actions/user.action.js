import { USER_CONSTS } from "../_constants";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const userLogin = (data) => async (dispatch) => {
  await axios
    .get("https://dummyapi.io/data/api/user", {
      headers: { "app-id": "611018e1056260e186ad8393" },
    })
    .then((response) => {
      dispatch(success(response.data));
    });
  function request(user) {
    return { type: USER_CONSTS.LOGIN_REQUEST, user };
  }

  function success(user) {
    return { type: USER_CONSTS.LOGIN_SUCCESS, user };
  }

  function error(user) {
    return { type: USER_CONSTS.LOGIN_ERROR, user };
  }
};
