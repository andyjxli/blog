/*
 * @Author: andyjxli(李嘉欣)
 * @Date: 2021-11-03 10:01:03
 * @LastEditTime: 2021-11-03 10:21:32
 * @LastEditors: andyjxli(李嘉欣)
 * @Description: 滑动窗口
 * @FilePath: /blog/.leetcode/3.无重复字符的最长子串.js
 */
/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const len = s.length;
  if (len === 0) return 0;
  let maxLen = 1;
  let left = 0;
  let right = 1;
  while (left < len && right < len) {
    const index = s.slice(left, right).indexOf(s[right]);
    ++right;
    if (index > -1) {
      left += index + 1;
    } else {
      maxLen = Math.max(right - left, maxLen);
    }
  }
  return maxLen;
};
lengthOfLongestSubstring('');
// @lc code=end
