import ValuePair from "./valuePair"
import { fyberToString, NumberUtil } from "../../share"
const { isUnvalid } = NumberUtil

class Dictionary {
  table: {
    [props: string]: any
  }
  toString: (value: any) => string

  constructor(toString = fyberToString) {
    this.table = {}
    this.toString = toString
  }

  get(key: string) {
    const value = this.table[fyberToString(key)]
    return isUnvalid(value) ? undefined : value
  }

  set(key: string, value: any) {
    if (isUnvalid(key) || isUnvalid(value)) return false
    const stringKey = fyberToString(key)
    this.table[stringKey] = new ValuePair(key, value)
    return true
  }

  remove(key: string) {
    if (this.hasKey(key)) {
      delete this.table[fyberToString(key)]
      return true
    }
    return false
  }

  hasKey(key: string) {
    return isUnvalid(this.table[this.toString(key)])
  }

  size() {
    return this.table.keys().length
  }

  isEmpty() {
    return this.size() === 0
  }

  keys() {
    return this.entries().map(item => item.key)
  }

  values() {
    return this.entries().map(item => item.value)
  }

  entries() {
    let entries = []
    for (let prop in this.table) {
      if (this.hasKey(prop)) {
        entries.push(this.table[prop])
      }
    }
    return entries
  }

  clear() {
    this.table = {}
  }

  forEach(callback: (key: string, value: any) => {}) {
    this.entries().map(item => callback(item.key, item.value))
  }
}

export default Dictionary
