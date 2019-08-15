import compose from "./compose"

export default function applyMiddleware(...middlewares: Array<Function>) {
  return (createReducer: Function) => (...args: Array<any>) => {
    const store = createReducer(...args)
    let dispatch = () => {
      throw new Error(
        "Dispatching while constructing your middleware is not allowed."
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args: Array<any>) => store.dispatch(...args)
    }

    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
