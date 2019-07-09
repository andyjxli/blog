class ValuePair {
  key: string
  value: any

  constructor(key: string, value: any) {
    this.key = key
    this.value = value
  }

  toString() {
    return `[#${this.key}: ${this.value}]`
  }
}

export default ValuePair
