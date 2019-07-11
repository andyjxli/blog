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

export default fyberToString
