import { isFunction } from "../../share/type"

export const asyncFn = (function() {
  if (typeof process === "object" && process !== null && isFunction) {
    return process.nextTick
  } else if (isFunction(setImmediate)) {
    return setImmediate
  } else {
    return setTimeout
  }
})()
