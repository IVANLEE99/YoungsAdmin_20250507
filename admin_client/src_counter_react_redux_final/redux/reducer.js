import { INCREMENT, DECREMENT } from "./action-types";
import { combineReducers } from "redux";

export const count = (state = 1, action) => {
  console.log(state, action);
  switch (action.type) {
    case INCREMENT:
      return state + action.number;
    case DECREMENT:
      return state - action.number;
    default:
      return state;
  }
};
export const user = (state = {}, action) => {
  console.log(state, action);
  switch (action.type) {
    case INCREMENT:
      return { ...state, name: 2333 };
    case DECREMENT:
      return { ...state, name: 233344 };
    default:
      return state;
  }
};

export default combineReducers({
  count,
  user,
});
