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

Fromise.prototype.finally = function(cb) {
  return this.then(
    value => Fromise.resolve(cb()).then(() => value),
    reason =>
      Fromise.resolve(cb()).then(() => {
        throw reason
      })
  )
}

Fromise.race = function(values) {
  return new Fromise((resolve, reject) => {
    values.forEach(value =>
      value.then(val => resolve(val), reason => reject(reason))
    )
  })
}

Fromise.all = function(values) {
  return new Fromise((resolve, reject) => {
    const len = values.length
    const result = []
    if (len === 0) return resolve([])
    values.map((value, index) =>
      value.then(
        val => {
          result[index] = val
          if (result.length === len) resolve(result)
        },
        reason => reject(reason)
      )
    )
  })
}

Fromise.resolve = function(value) {
  return new Fromise(resolve => resolve(value))
}

Fromise.reject = function(value) {
  return new Fromise((_, reject) => reject(value))
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
  .finally(() => console.log("finally"))

const race = Fromise.race([
  new Fromise(resolve => {
    setTimeout(() => resolve(3000), 200)
  }),
  new Fromise(reject => {
    setTimeout(() => reject(3001), 1000)
  })
])

race.then(value => console.log(value), reason => console.log(reason))

const all = Fromise.all([
  new Fromise(resolve => {
    setTimeout(() => resolve(3000), 200)
  }),
  new Fromise((_, reject) => {
    setTimeout(() => _(3001), 1000)
  })
])

all.then(
  value => console.log(value, "all"),
  reason => console.log(reason, "all")
)
// export default Fromise
