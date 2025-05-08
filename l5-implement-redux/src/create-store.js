export function createStore(reducer, initialState) {
  let state = initialState;
  let subscribers = [];

  function generateId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    subscribers.forEach((subscriber) => subscriber.listen());
  };

  const subscribe = (listen) => {
    const id = generateId();
    subscribers.push({ id, listen });
    return () => {
      subscribers = subscribers.filter(({ id: subId }) => subId !== id);
    };
  };

  return { getState, dispatch, subscribe };
}
