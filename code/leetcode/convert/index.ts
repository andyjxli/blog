/**
 * @description 将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。
 * 比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：
 * L   C   I   R
 * E T O E S I I G
 * E   D   H   N
 *
 * 行数为 4 时
 * L     D     R
 * E   O E   I I
 * E C   I H   N
 * T     S     G
 *
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 *
 */
export const convert = function(s: string, n: number) {
  if (n === 1) return s
  const main = []
  const partLen = 2 * n - 2
  const len = s.length

  for (let i = 0; i < len; i++) {
    const partRemainder = i % partLen
    const line =
      partRemainder < n ? partRemainder % n : n - (partRemainder % n) - 2
    main[line] = (main[line] || '') + s[i]
  }

  return main.join('')
}
