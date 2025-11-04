import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import { countReducer } from "./reducer";

import { thunk } from "redux-thunk";
const store = createStore(
  countReducer,
  composeWithDevTools(applyMiddleware(thunk))
  //   applyMiddleware(thunk)
);

export default store;
