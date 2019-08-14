export default function createReducer(
  reducer: Function,
  preState: object | Function,
  enhancer?: Function
) {
  let state: undefined | object = preState

  if (typeof preState === "function" && typeof enhancer === "function") {
    throw new Error("initState only recieve type object")
  }

  if (typeof preState === "function" && typeof enhancer === "undefined") {
    enhancer = preState
    state = enhancer
  }

  if (typeof reducer !== "function") {
    throw new Error("Expected the reducer to be a function.")
  }

  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error("Expected the enhancer to be a function.")
    }

    enhancer(createReducer)(reducer, state)
  }

  let currentState = state
  let currentReducer = reducer
  let listeners: Array<Function> = []
  let isDispatching = false

  function getState() {
    if (isDispatching) {
      throw new Error(
        "You may not call store.getState() while the reducer is executing."
      )
    }
  }

  function subscribe(listener: Function) {
    if (typeof listener !== "function") {
      throw new Error("listener the enhancer to be a function.")
    }

    if (isDispatching) {
      throw new Error(
        "You may not call store.subscribe() while the reducer is executing."
      )
    }

    let isSubscribe = true

    listeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribe) return

      if (isDispatching) {
        throw new Error(
          "You may not unsubscribe from a store listener while the reducer is executing. "
        )
      }

      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)

      isSubscribe = false
    }
  }

  function dispatch(action: Function) {
    // if ()
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}
