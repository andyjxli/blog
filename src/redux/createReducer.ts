import actions from "./utils/actionTypes"

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

  function dispatch(action: { type: symbol | string; [props: string]: any }) {
    if (typeof action !== "object" || action === null) {
      throw new Error("Expected the action to be object")
    }

    if (typeof action.type === "undefined") {
      throw new Error("action.type is undefined")
    }

    if (isDispatching) {
      throw new Error(
        "You may not store.dispatch from a store listener while the reducer is executing. "
      )
    }

    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }
    listeners.forEach(item => item())

    return action
  }

  function replaceReducer(newReducer: Function) {
    if (typeof newReducer !== "function") {
      throw new Error("Expected newReducer to be a function.")
    }

    currentReducer = newReducer

    dispatch({ type: actions.REPLACTREDUCER_TYPE })
  }

  function observable() {
    type Observer = { next: Function }
    const outerSubscribe = subscribe

    return {
      subscribe(observer: Observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new TypeError("Expected the observer to be an object.")
        }

        function observerState() {
          if (observer.next) {
            observer.next(currentState)
          }
        }

        observerState()
        const unsubscribe = outerSubscribe(observerState)
        return { unsubscribe }
      }
    }
  }

  dispatch({ type: actions.INIT_TYPE })

  return {
    getState,
    subscribe,
    dispatch,
    replaceReducer,
    observable
  }
}
