function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments))
  }
}

export default function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== "object" || typeof actionCreators === null) {
    throw new Error("Expected actionCreators to be an object or a function. ")
  }

  const boundActionCreators = {}

  for (let key in actionCreators) {
    const actionCreator = actionCreators[key]
    if (typeof actionCreator !== "function") {
      throw new Error("Expected actionCreators item to be a function")
    }

    boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
  }
  return boundActionCreators
}
