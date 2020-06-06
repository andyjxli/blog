import { myAtoi } from './../index'

it('test myAtoi', () => {
  expect(myAtoi('123-')).toBe(123)
  expect(myAtoi('42')).toBe(42)
  expect(myAtoi('-42')).toBe(-42)
  expect(myAtoi('akjsd')).toBe(0)
  expect(myAtoi('4193 with words')).toBe(4193)
  expect(myAtoi('words and 987')).toBe(0)
  expect(myAtoi('-91283472332')).toBe(-2147483648)
  expect(myAtoi('91283472332')).toBe(2147483647)
})
