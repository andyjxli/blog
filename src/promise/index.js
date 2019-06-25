const PENDING = Symbol("pending")
const FULFILLED = Symbol("fulfilled")
const REJECTED = Symbol("rejected")
const noop = () => {}
const isFunction = fn => typeof fn === "function"

const FyberPromise = executor => {
  let value = null
  let deffered = []
  let status = PENDING

  const resolve = (promise, value) => {}
  const reject = (promise, reason) => {}

  executor(resolve, reject)
}

FyberPromise.prototype.then = (onFulfilled, onRejected) => {
  if (!isFunction(onFulfilled) || !isFunction(onRejected)) {
  }
}
