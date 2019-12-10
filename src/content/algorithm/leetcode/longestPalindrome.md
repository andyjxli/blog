---
title: 最长回文字符串
path: longestPalindrome
image: ""
author: 李嘉欣
date: 2019-12-10
draft: false
tags:
  - leetcode
  - DP
  - javascript
category: { zh_name: "算法", en_name: "algorithm" }
description: "给定一个字符串 s，找到 s 中最长的回文子串。假设 s 的最大长度为 1000。"
---

## 题目描述

> 最长回文字符串: 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。例如：输入: "babad"； 输出: "bab"； 注意: "aba" 也是一个有效答案。

根据题目可以了解到回文字符串的定义是指给定的字符串翻转后与原字符串相同。

## 解决方案

下面我们给出 `暴力破解` 以及 `动态规划` 的解决方案

### 暴力破解

> 很明显，暴力法将选出所有子字符串可能的开始和结束位置，并检验它是不是回文。

#### 算法逻辑

```javascript
/**
 * @param {string} str
 * @return {string}
 */
export const longestPalindrome = function(str: string) {
  let palindrome = ""
  const len = str.length

  for (let i = 0; i < len; i++) {
    // 选取 i - j 中间的子字符串
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
```

#### 复杂度分析

- 时间复杂度：O(n^3)，假设 n 是输入字符串的长度，则 n(n-1) / 2 为此类子字符串(不包括字符本身是回文的一般解法)的总数。因为验证每个子字符串需要 O(n) 的时间，所以运行时间复杂度是 O(n^3)
- 空间复杂度：O(1)。

#### 动态规划

> 关于动态规划的初步认识：[什么是动态规划（Dynamic Programming）？](https://www.zhihu.com/question/23995189/answer/613096905)。

符合动态规划的几个要点

- 无后效性
  如果给定某一阶段的状态，则在这一阶段以后过程的发展不受这阶段以前各段状态的影响。也就是说，一旦 f(n) 确定了，就不再需要关心他是怎么得出来的。
- 最优子结构
  大问题的最优解可以由小问题的最优解推出，这个性质叫做“最优子结构性质”。

回到题目当中，我们要求到最长的回文字符串。比如 “acbbbca”，如果我们知道 bbb 是回文，那么肯定能确定 cbbbc 也是回文。因为 bbb 的两边是相等的。所以我们可以将最长回文字符串拆解成 从最短的回文字符串开始找起，直到找到最长的回文字符串。

假设给定一个字符串 S， L 为当前字符串 P 的长度。 i 为 当前字符串 P 在 S 的起始下标， j 为当前字符串 P 在 S 的结束下标。例如 S = acbbbca, P = bbb, 那么 L = 3; i = 2; j = 4。 那么我们可以得出关系 L = j - i + 1 => j = L + 1 - 1.

根据上面的定义，我们要确定 P(i, j) 是否为回文字符串的条件是 P(i+1,j−1) 为回文字符串并且 S[i] === S[j]

这里我们就能很轻松的想到要先确定 一字母 与 二字母 的回文。然后找到 三字母 的回文，以此类推，直到结束.

#### 算法逻辑

```javascript{7,17,20}
const longestPalindromeByDP = (str: string) => {
  const len = str.length
  if (len <= 1) return str

  let result = str[0]
  // 创建 dp 二维数组
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
```

#### 复杂度分析

- 时间复杂度：O(n^2)，这里给出我们的运行时间复杂度为 O(n^2)。
- 空间复杂度：O(n^2)该方法使用 O(n^2)的空间来存储表。
