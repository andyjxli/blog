function creatStore(reducer, initState) {
  let state = initState || {}
  let listeners = []

  function getState() {
    return state
  }

  function subscribe(listener) {
    listeners.push(listener)
  }

  function dispatch(action) {
    state = reducer(state, action)

    listeners.forEach(listener => {
      listener()
    })
  }

  // 执行一个空的dispatch，使得state在没有值的时候有一个初始值
  dispatch({
    type: Symbol()
  })

  return {
    getState,
    subscribe,
    dispatch
  }
}

function combileReducers(reducers) {
  const keys = Object.keys(reducers)

  function combiledReducers(state = {}, action) {
    const newState = {}

    keys.forEach(key => {
      const reducer = reducers[key]
      const prevStateForKey = state[key]

      const newStateForKey = reducer(prevStateForKey, action)

      newState[key] = newStateForKey
    })

    return newState
  }

  return combiledReducers
}

export { creatStore, combileReducers }
