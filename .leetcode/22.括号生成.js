/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let dp = [];
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      dp[i] = ['()'];
      continue;
    }

    dp[i] = dp[i - 1].map((item) => `(${item})`);

    for (let j = 0; j < i; j++) {
      dp[i] = dp[j].reduce((prev, curr) => {
        return [...prev].concat(dp[i - j - 1].map((item) => `${curr}${item}`));
      }, dp[i]);
      dp[i] = Array.from(new Set(dp[i]));
    }
  }

  return dp[n - 1];
};
// @lc code=end
