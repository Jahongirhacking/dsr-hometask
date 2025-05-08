import { createStore } from "./create-store.js";

const INCREMENT_ACTION_TYPE = "INCREMENT";
const DECREMENT_ACTION_TYPE = "DECREMENT";

function reducer(state, action) {
  switch (action.type) {
    case INCREMENT_ACTION_TYPE:
      return state + 1;
    case DECREMENT_ACTION_TYPE:
      return state - 1;
    default:
      return state;
  }
}

export function increment() {
  store.dispatch({ type: INCREMENT_ACTION_TYPE });
}

export function decrement() {
  store.dispatch({ type: DECREMENT_ACTION_TYPE });
}

export const store = createStore(reducer, 0);
