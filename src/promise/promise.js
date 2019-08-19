try {
  module.exports = FyberPromise
} catch (e) {}

function FyberPromise(executor) {
  var self = this

  self.status = "pending"
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  function resolve(value) {
    if (value instanceof FyberPromise) {
      return value.then(resolve, reject)
    }
    setTimeout(function() {
      // 异步执行所有的回调函数
      if (self.status === "pending") {
        self.status = "resolved"
        self.data = value
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    })
  }

  function reject(reason) {
    setTimeout(function() {
      // 异步执行所有的回调函数
      if (self.status === "pending") {
        self.status = "rejected"
        self.data = reason
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}

function resolveFyberPromise(Fyberpromise2, x, resolve, reject) {
  var then
  var thenCalledOrThrow = false

  if (Fyberpromise2 === x) {
    return reject(new TypeError("Chaining cycle detected for Fyberpromise!"))
  }

  if (x instanceof FyberPromise) {
    if (x.status === "pending") {
      //because x could resolved by a FyberPromise Object
      x.then(function(v) {
        resolveFyberPromise(Fyberpromise2, v, resolve, reject)
      }, reject)
    } else {
      //but if it is resolved, it will never resolved by a FyberPromise Object but a static value;
      x.then(resolve, reject)
    }
    return
  }

  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      then = x.then //because x.then could be a getter
      if (typeof then === "function") {
        then.call(
          x,
          function rs(y) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return resolveFyberPromise(Fyberpromise2, y, resolve, reject)
          },
          function rj(r) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true
      return reject(e)
    }
  } else {
    resolve(x)
  }
}

FyberPromise.prototype.then = function(onResolved, onRejected) {
  var self = this
  var Fyberpromise2
  onResolved =
    typeof onResolved === "function"
      ? onResolved
      : function(v) {
          return v
        }
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function(r) {
          throw r
        }

  if (self.status === "resolved") {
    return (Fyberpromise2 = new FyberPromise(function(resolve, reject) {
      setTimeout(function() {
        // 异步执行onResolved
        try {
          var x = onResolved(self.data)
          resolveFyberPromise(Fyberpromise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    }))
  }

  if (self.status === "rejected") {
    return (Fyberpromise2 = new FyberPromise(function(resolve, reject) {
      setTimeout(function() {
        // 异步执行onRejected
        try {
          var x = onRejected(self.data)
          resolveFyberPromise(Fyberpromise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    }))
  }

  if (self.status === "pending") {
    // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容已是异步执行，构造函数里的定义
    return (Fyberpromise2 = new FyberPromise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          var x = onResolved(value)
          resolveFyberPromise(Fyberpromise2, x, resolve, reject)
        } catch (r) {
          reject(r)
        }
      })

      self.onRejectedCallback.push(function(reason) {
        try {
          var x = onRejected(reason)
          resolveFyberPromise(Fyberpromise2, x, resolve, reject)
        } catch (r) {
          reject(r)
        }
      })
    }))
  }
}

FyberPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

FyberPromise.deferred = FyberPromise.defer = function() {
  var dfd = {}
  dfd.Fyberpromise = new FyberPromise(function(resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
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
