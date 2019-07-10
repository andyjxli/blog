const isNull = (value: any): boolean => value === null
const isUndefined = (value: any): boolean => value === undefined
const isUnvalid = (value: any): boolean => isNull(value) || isUndefined(value)

export { isNull, isUndefined, isUnvalid }
