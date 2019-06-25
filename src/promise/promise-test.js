import { CPromise } from "./promise"

const consoleResult = {}

const promise = () => {
  return new CPromise((resolve, reject) => {
    setTimeout(() => {
      consoleResult.resolve = true

      resolve("resolve")
      // reject('reject');
    })
  })
}

promise()
  .then(
    value => {
      console.log(value)
      consoleResult.thenResolve = value

      return new CPromise((resolve, reject) => {
        setTimeout(() => {
          consoleResult.reject = false

          console.log(reject)

          resolve("reject")
        })
      })
    },
    error => {
      consoleResult.thenReject = error
    }
  )
  .then(
    value => {
      consoleResult.thenReject = value
    },
    error => {
      consoleResult.thenReject = error
    }
  )

export default consoleResult
