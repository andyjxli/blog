/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */

// 给定两个单词 word1 和 word2，计算出将 word1 转换成 word2 所使用的最少操作数 。

// 你可以对一个单词进行如下三种操作：

// 插入一个字符
// 删除一个字符
// 替换一个字符

export const minDistanceByDP = function(word1, word2) {
  const len1 = word1.length
  const len2 = word2.length

  // 保证 word1 的长度大于等于 word2
  if (len1 < len2) return minDistanceByDP(word2, word1)

  // const digist = len1 - len2

  const dp = Array(len2)
    .fill(0)
    .map(() => Array(len2))
  // 找出相似度最长的匹配方式. 从 1 开始
  for (let L = 1; L <= len2; L++) {
    // for (let i = 0; i < len2; i++) {
    //   const j =
    // }
  }
}
