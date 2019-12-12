/**
 * @param {string} s
 * @return {number}
 */
const longestValidParenthesesByDP = function(s: string) {
  const len = s.length
  const dp = Array(len).fill(0)
  if (len < 2) return 0

  for (let i = 1; i < len; i++) {
    if (s[i] === ')') {
      if (s[i - 1] === '(') {
        dp[i] = (i > 2 ? dp[i - 2] : 0) + 2
      } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
        dp[i] =
          dp[i - 1] + 2 + (i - dp[i - 1] - 2 > 0 ? dp[i - dp[i - 1] - 2] : 0)
      }
    }
  }
  console.log(dp)

  return Math.max(...dp)
}

const longestValidParenthesesByDPError = function(s) {
  const len = s.length
  if (len < 2) return 0
  if (len === 2) return s[0] === '(' && s[1] === ')' ? 2 : 0
  let longestValue = 0

  const dp = Array(len)
    .fill(0)
    .map(() => Array(len).fill(0))
  // 找出当前的长度为 L 的符合'()'有效括号的字符串。那么 需要满足 s[i] === '(' && s[j] === ')' && dp[i + 1][j - 1] === 1
  // L = j - i + 1 => j = L - i + 1
  for (let L = 2; L <= len; L = L + 2) {
    for (let i = 0; i <= len - L; i++) {
      const j = L + i - 1
      if (L === 2 && s[i] === '(' && s[j] === ')') {
        longestValue = L
        dp[i][j] = 1
      } else if (
        L > 2 &&
        ((dp[i][j - 2] === 1 && dp[j - 1][j] === 1) ||
          (dp[i + 1][j - 1] === 1 && s[i] === '(' && s[j] === ')') ||
          (dp[i + 2][j] === 1 && dp[i][i + 1] === 1))
      ) {
        dp[i][j] = 1
        longestValue = L
      }
    }
  }

  return longestValue
}

export default longestValidParenthesesByDP
