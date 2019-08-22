const isNull = (value: any): boolean => value === null
const isUndefined = (value: any): boolean => value === undefined
const isUnvalid = (value: any): boolean => isNull(value) || isUndefined(value)
const isFunction = (value: any): boolean => typeof value === "function"

export { isNull, isUndefined, isUnvalid, isFunction }
