import { Action } from "./utils/interface"

type Reducers = {
  [props: string]: Function
}
export default function combileReduces(reducers: Reducers) {
  if (typeof reducers !== "object" || reducers === null) {
    throw new Error("Expected reducers to be object.")
  }

  let finalState: { [props: string]: any } = {}
  const keys = Object.keys(reducers)

  return function reducer(
    state: { [props: string]: any } = {},
    action: Action
  ) {
    let hasChanged = false

    keys.forEach(item => {
      const nextState = (reducers = reducers[item](state, action))

      if (typeof nextState === "undefined") {
        throw new Error("Expected reducer to be return object")
      }

      hasChanged = hasChanged || nextState !== state[item]

      finalState[item] = nextState
    })

    hasChanged = hasChanged || Object.keys(finalState).length !== keys.length

    return hasChanged ? finalState : state
  }
}
