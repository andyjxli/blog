import { convert } from './../index'

it('test', () => {
  expect(convert('LEETCODEISHIRING', 3)).toBe('LCIRETOESIIGEDHN')
  expect(convert('LEETCODEISHIRING', 4)).toBe('LDREOEIIECIHNTSG')
  expect(convert('PAYPALISHIRING', 3)).toBe('PAHNAPLSIIGYIR')
  expect(1 + 1).toBe(2)
})
