import { INCREMENT, DECREMENT } from "./action-types";

export const countReducer = (state = 1, action) => {
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
