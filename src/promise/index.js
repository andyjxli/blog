const PENDING = Symbol("pending")
const FULFILLED = Symbol("fulfilled")
const REJECTED = Symbol("rejected")
const noop = () => {}
const isFunction = fn => typeof fn === "function"

function FyberPromise(executor) {
  this.value = null
  this.deffered = []
  this.status = PENDING
  this.reason = null

  const resolve = value => {
    if (this.status !== PENDING) return

    this.status = FULFILLED
    this.value = value
    this.deffered.forEach(item => {
      this.value = item.onFulfilled(this.value)
    })
    this.deffered.length = 0
  }
  const reject = reason => {}

  executor(resolve, reject)
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = isFunction(onFulfilled) ? onFulfilled : null
  this.onRejected = isFunction(onRejected) ? onRejected : null
  this.promise = promise
}

FyberPromise.prototype.then = function(onFulfilled, onRejected) {
  const newPromise = new FyberPromise(() => {})
  const deffered = new Handler(onFulfilled, onRejected, newPromise)
  if (this.status === PENDING) {
    this.deffered.push(deffered)
    newPromise.deffered = this.deffered
  }
  if (this.status === FULFILLED && isFunction(onFulfilled)) {
    this.value = onFulfilled(this.value)
  }
  if (this.status === REJECTED && isFunction(onRejected)) {
    onRejected(this.reason)
  }
  return newPromise
}

const pros = new FyberPromise((resolve, reject) => {
  setTimeout(() => resolve(1), 200)
})
pros
  .then(value => {
    console.log(value, "one")
    return value
  })
  .then(value => console.log(value, "two"))
