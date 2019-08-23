// import { PENDING, REJECTED, RESOLVED } from "./utils/constant"
// import { isFunction } from "./../share/type"
const isFunction = value => typeof value === "function"
const PENDING = Symbol("pending")
const REJECTED = Symbol("rejected")
const RESOLVED = Symbol("resolved")
const asyncFn = (function() {
  if (typeof process === "object" && process !== null && isFunction) {
    return process.nextTick
  } else if (isFunction(setImmediate)) {
    return setImmediate
  } else {
    return setTimeout
  }
})()

function resolve(fromise, value) {
  if (fromise.state !== PENDING) return

  if (fromise === value) {
    return reject(new TypeError("A fromise cannot be resolved with itself."))
  }

  // 返回值为 fromise的情况，将 deferreds存入value里以待调用
  if (value && value instanceof Fromise && value.then === fromise.then) {
    if (value.state === PENDING) {
      value.deferreds.push(...fromise.deferreds)
    } else {
      fromise.deferreds.forEach(deferred => {
        handleResolved(value, deferred)
      })
      fromise.deferreds = []
    }
    return
  }

  if (value && typeof value === "object" && isFunction(value.then)) {
    let then = null
    try {
      then = value.then
    } catch (_err) {
      reject(fromise, _err)
    }

    try {
      then.call(value, function(val) {
        resolve(val),
          function(reason) {
            reject(reason)
          }
      })
    } catch (_err) {
      reject(fromise, _err)
    }

    return
  }

  fromise.state = RESOLVED
  fromise.value = value
  fromise.deferreds.forEach(deferred => {
    handleResolved(fromise, deferred)
  })
  fromise.deferreds = []
}

function reject(fromise, reason) {
  if (fromise.state !== PENDING) return

  fromise.state = REJECTED
  fromise.value = reason
  fromise.deferreds.forEach(deferred => handleResolved(fromise, deferred))
  fromise.deferreds = []
}

function handleResolved(fromise, deferred) {
  asyncFn(function() {
    const cb =
      fromise.state === REJECTED ? deferred.onRejected : deferred.onResolved

    try {
      const value = cb(fromise.value)
      resolve(deferred.fromise, value)
    } catch (_err) {
      reject(deferred.fromise, _err)
    }
  })
}

function Handler(fromise, onResolved, onRejected) {
  this.onRejected = isFunction(onRejected)
    ? onRejected
    : value => {
        throw value
      }

  this.onResolved = isFunction(onResolved) ? onResolved : value => value
  this.fromise = fromise
}

function Fromise(executor) {
  this.state = PENDING
  this.deferreds = []
  this.value = undefined

  try {
    executor(value => resolve(this, value), reason => reject(this, reason))
  } catch (_err) {
    reject(_err)
  }
}

Fromise.prototype.then = function(onResolved, onRejected) {
  const res = new Fromise(() => {})
  const deferred = new Handler(res, onResolved, onRejected)

  if (this.state === PENDING) {
    this.deferreds.push(deferred)

    return res
  }

  handleResolved(this, deferred)

  return res
}

Fromise.prototype.catch = function(cb) {
  return this.then(null, cb)
}

const pros = new Fromise((resolve, reject) => {
  setTimeout(() => resolve(1), 200)
})
pros
  .then(value => {
    return value
  })
  .catch(value => console.log(value))
  .then(
    value => console.log(value, "two"),
    reason => console.log(reason, "two reason")
  )

// export default Fromise
