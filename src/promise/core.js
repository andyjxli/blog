import { PENDING, REJECTED, RESOLVED } from "./utils/constant"
import reject from "./functions/reject"
import resolve from "./functions/resolve"
import { isFunction } from "util"

function Fromise(executor) {
  this.state = PENDING
  this.deferreds = []
  this.value = undefined

  try {
    executor(() => resolve(this, this.value), () => reject(this, this.value))
  } catch (_err) {
    reject(_err)
  }
}

Fromise.prototype.then = function(onResolved, onRejected) {
  const res = new Fromise(() => {})
  const deferreds = new Handler(res, onRejected, onResolved)

  if (this.state === PENDING) {
    this.deferreds.push(deferreds)

    return res
  }

  return res
}

function handleResolved(promise, deferreds) {
  asyncFn()
}

function Handler(promise, onResolved, onRejected) {
  this.onRejected = isFunction(onRejected) ? onRejected : value => value
  this.onResolved = isFunction(onResolved)
    ? onResolved
    : value => {
        throw value
      }
  this.promise = promise
}

const pros = new FyberPromise((resolve, reject) => {
  setTimeout(() => resolve(1), 200)
})
pros
  .then(value => {
    console.log(value, "one")
    return new FyberPromise(r => r(3))
  })
  .then(
    value => console.log(value, "two"),
    reason => console.log(reason, "two reason")
  )

export default Fromise
