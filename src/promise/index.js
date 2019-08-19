const PENDING = Symbol("pending")
const FULFILLED = Symbol("fulfilled")
const REJECTED = Symbol("rejected")
const noop = () => {}
const isFunction = fn => typeof fn === "function"
const asyncFn = (function() {
  if (
    typeof process === "object" &&
    process !== null &&
    typeof process.nextTick === "function"
  ) {
    return process.nextTick
  } else if (typeof setImmediate === "function") {
    return setImmediate
  }
  return setTimeout
})()

function FyberPromise(executor) {
  this.value = null
  this.deffereds = []
  this.status = PENDING

  const resolve = value => {
    if (this.status !== PENDING) return

    // promise 和 value 指向同一对象
    // 对应 Promise A+ 规范 2.3.1
    if (value === this) {
      return reject(new TypeError("A promise cannot be resolved with itself."))
    }

    // 如果 value 为 Promise，则使 promise 接受 value 的状态
    // 对应 Promise A+ 规范 2.3.2
    if (value && value instanceof Promise && value.then === this.then) {
      if (value.status === PENDING) {
        value.deffereds.push(...this.deffereds)
      } else if (this.deffereds.length > 0) {
        for (var i = 0; i < this.deferreds.length; i++) {
          handleResolved(value, deferreds[i])
        }
        value.deferreds = []
      }
      return
    }

    if (value && (typeof value === "object" || typeof value === "function")) {
      let then = null

      try {
        then = value.then
      } catch (err) {
        return reject(err)
      }

      if (typeof then === "function") {
        try {
          then.call(
            value,
            function(value) {
              resolve(value)
            },
            function(reason) {
              reject(reason)
            }
          )
        } catch (err) {
          return reject(err)
        }
      }
      return
    }

    this.status = FULFILLED
    this.value = value
    this.deffereds.forEach(item => handleResolved(this, item))
    this.deferreds = []
  }
  const reject = reason => {
    if (value instanceof FyberPromise) {
      return value.then(resolve, reject)
    }
    if (this.status !== PENDING) return

    this.value = reason
    this.status = REJECTED
    this.deffereds.forEach(item => {
      item.onRejected(this.value)
    })
  }

  function handleResolved(promise, deferred) {
    console.log(promise)
    asyncFn(function() {
      const cb =
        promise.status === FULFILLED ? promise.onFulfilled : promise.onRejected
      const res = cb(promise.value)

      resolve.bind(deferred.promise, res)
    })
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = isFunction(onFulfilled) ? onFulfilled : value => value
  this.onRejected = isFunction(onRejected)
    ? onRejected
    : reason => {
        throw reason
      }
  this.promise = promise
}

FyberPromise.prototype.then = function(onFulfilled, onRejected) {
  const newPromise = new FyberPromise(() => {})
  const deffereds = new Handler(onFulfilled, onRejected, newPromise)
  if (this.status === PENDING) {
    this.deffereds.push(deffereds)
    newPromise.deffereds = this.deffereds
  }
  if (this.status === FULFILLED) {
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
    return 2
  })
  .then(value => console.log(value, "two"))
