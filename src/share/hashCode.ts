import { fyberToString } from "."

const hashCode = (key: string | number) => {
  if (typeof key === "number") return key

  const stringKey: string = fyberToString(key)
  // Array.prototype.reduce.call(
  //   stringKey,
  //   (sum: number, _curr: string, index: number) => {
  //     const code = stringKey.charCodeAt(index)
  //     return sum += code ? code :0
  //   }, 0
  // )
  let code = 0
  for (let item of stringKey) {
    code += item.charCodeAt(0)
  }
  return code % 37
}

export default hashCode
