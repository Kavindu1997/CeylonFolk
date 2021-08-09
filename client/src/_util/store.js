import React from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "../_reducers";

const initialstate = {};
const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialstate,
  applyMiddleware(...middleware)
);

export function StoreProvider(props) {
  return <Provider store={store}>{props.children}</Provider>;
}

