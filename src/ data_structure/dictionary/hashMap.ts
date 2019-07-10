import { fyberToString } from "../../share"

interface HashMap {
  toString: (key: any) => string
  table: {
    [props: string]: any
  }
}

class HashMap implements HashMap {
  constructor(toString = fyberToString) {
    this.toString = toString
    this.table = {}
  }
}

export default HashMap
