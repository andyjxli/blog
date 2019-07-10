/**
 * toStringx
 * @param value any
 */
const fyberToString = (value: any): string => {
  if (value === null) return "NULL"
  else if (value === undefined) return "UNDEFINED"
  else if (typeof value === "string" || value instanceof String)
    return `${value}`

  return value.toString()
}

const isNull = (value: any): boolean => value === null
const isUndefined = (value: any): boolean => value === undefined
const isUnvalid = (value: any): boolean => isNull(value) || isUndefined(value)

export default fyberToString
