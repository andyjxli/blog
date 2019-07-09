import { fyberToString, isUnvalid } from "./../share/util"
import ValuePair from "./valuePair"

class Dictionary {
  table: {
    [props: string]: any
  }
  toString: (value: any) => string

  constructor(toString = fyberToString) {
    this.table = {}
    this.toString = toString
  }

  get(key: string) {}

  set(key: string, value: any) {
    if (isUnvalid(key) || isUnvalid(value)) return false
    const stringKey = fyberToString(key)
    this.table[stringKey] = new ValuePair(key, value)
    return true
  }

  remove(key: string) {}

  hasKey(key: string) {
    return isUnvalid(this.table[this.toString(key)])
  }

  size() {}

  isEmpty() {}

  keys() {}

  values() {}

  entries() {}

  clear() {}

  forEach(callback: (key: string, value: any) => {}) {}
}

export default Dictionary
