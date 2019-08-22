import { fyberToString, hashCode } from "../../share"
import { isUnvalid } from "../../share/type"
import ValuePair from "./valuePair"

interface HashMap {
  toString: (key: any) => string
  table: {
    [props: string]: any
  }
  put(key: string, value: any): boolean
  get(key: string): any
  remove(key: string): boolean
}

class HashMap implements HashMap {
  constructor(toString = fyberToString) {
    this.toString = toString
    this.table = {}
  }

  put(key: string, value: any) {
    if (isUnvalid(key) || isUnvalid(value)) return false

    const position = hashCode(key)
    this.table[position] = new ValuePair(key, value)
    return true
  }

  get(key: string) {
    const valuePair = this.table[hashCode(key)]
    return isUnvalid(valuePair) ? undefined : ValuePair
  }

  remove(key: string) {
    const hash = hashCode(key)
    const valuePair = this.table[hash]
    if (valuePair) {
      delete this.table[hash]
      return true
    }
    return false
  }
}

export default HashMap
