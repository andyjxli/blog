"use strict"

;(function() {
  /**
   * promise
   * @param {function} callback  回调函数
   */
  function CodePromise(callback) {
    // value - promise执行之后的结果
    this.value = null

    // deferreds - then注册的回调函数
    this.deferreds = []

    // status - promise执行状态
    // 0 - pedding
    // 1 - fulfilled
    // 2 - rejected
    this.status = 0

    try {
      callback(
        value => {
          CodePromise.resolve(this, value)
        },
        reason => {
          CodePromise.reject(this, reason)
        }
      )
    } catch (error) {
      CodePromise.reject(this, error)
    }
  }

  CodePromise.resolve = function(value) {
    const _self = this

    // 状态已经改变，拒绝改变状态
    if (this.status !== 0) return

    if (this === value) {
      return CodePromise.reject(
        new TypeError("A promise cannot be resolve with itself.")
      )
    }

    if (value && value instanceof CodePromise && value.then === this.then) {
      let deferreds = this.deferreds

      if (this.status === 0) {
        value.deferreds.push(...deferreds)
      } else if (this.status === 1) {
        deferreds.forEach(deferred => {
          handleResolved(this, deferred)
        })

        value.deferreds.length = 0
      }

      return
    }

    if ((value && typeof value === "object") || typeof value === "function") {
      try {
        const then = value.then
      } catch (error) {
        return this.reject(error)
      }

      if (typeof then === "function") {
        try {
          then.call(
            value,
            value => {
              CodePromise.resolve(value)
            },
            reason => {
              CodePromise.reject(reason)
            }
          )
        } catch (error) {
          _self.reject(error)
        }
      }

      return
    }

    this.status = 1
    this.value = value

    if (this.deferreds.length !== 0) {
      this.deferreds.forEach(deferred => {
        handleResolved(this, deferred)
      })

      this.deferreds.length = 0
    }
  }

  CodePromise.reject = function(reason) {
    if (this.status !== 0) return

    this.status = 2
    this.value = reason

    if (this.deferreds.length !== 0) {
      this.deferreds.forEach(deferred => {
        handleResolved(this, deferred)
      })

      this.deferreds.length = 0
    }
  }

  function handleResolved(promise, deferred) {
    setTimeout(function() {
      const cb =
        promise.status === 1 ? deferred.onResolved : deferred.onRejected

      if (cb === null) {
        if (promise.status === 1) {
          CodePromise.resolve(promise.value)
        } else {
          CodePromise.reject(promise.value)
        }

        return
      }

      try {
        const res = cb(promise.value)
      } catch (error) {
        deferred.reject(error)
      }

      deferred.resolve(res)
    }, 0)
  }

  /**
   * 事件队列构造函数
   * @param {function} resolve
   * @param {function} reject
   * @param {CodePromise} promise
   */
  function Handler(resolve, reject, promise) {
    this.onResolved = typeof resolve === "function" ? resolve : null
    this.onRejected = typeof reject === "function" ? reject : null
    this.promise = promise
  }

  /**
   * then链式调用
   * @param {function} onResolved
   * @param {function} onRejected
   */
  CodePromise.prototype.then = function(onResolved, onRejected) {
    let res = new CodePromise({})

    var deferred = new Handler(onResolved, onRejected, res)

    if (this.status === 0) {
      this.deferreds.push(deferred)
      return res
    }

    handleResolved(this, deferred)

    return res
  }

  function testPromise(id) {
    return new CodePromise(function(resolve, reject) {
      setTimeout(() => {
        resolve(id)
        console.log(1)
      })
    })
  }

  testPromise(2).then(value => {
    console.log(value)
  })
})()

const promise = {
  a: 111,
  b: 22,
  c: 222
}

export default promise
