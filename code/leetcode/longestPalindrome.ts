/**
 * @description 最长回文字符串: 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 * @example
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 * @param {string} str
 * @return {string}
 */
export const longestPalindrome = function(str: string) {
  let palindrome = ""
  const len = str.length

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len + 1; j++) {
      const curr = str.slice(i, j)
      const reverse = curr
        .split("")
        .reverse()
        .join("")

      if (curr === reverse && palindrome.length < curr.length) palindrome = curr
    }
  }

  return palindrome
}

export const longestPalindromeByDP = (str: string) => {
  const len = str.length
  if (len <= 1) return str

  let result = str[0]
  const dp = new Array(len)

  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len).fill(0)
    dp[i][i] = 1
  }
  // L 代表当前回文字符串的长度，二维数组的下标 为 (i, j)。例如（0,0）表示字符串第一位，L 为 1；(1, 2)表示字符串 2-3位，L 为 2.
  // 所以 L = j - i + 1 =>  j = L + i - 1
  for (let L = 2; L <= len; L++) {
    for (let i = 0; i <= len - L; i++) {
      const j = L + i - 1
      if (L === 2 && str[i] === str[j]) {
        dp[i][j] = 1
        result = str.slice(i, L + i)
      } else if (str[i] === str[j] && dp[i + 1][j - 1] === 1) {
        dp[i][j] = 1
        result = str.slice(i, L + i)
      }
    }
  }

  return result
}
