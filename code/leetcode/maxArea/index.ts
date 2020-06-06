///给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

/**
 * @param {number[]} height
 * @return {number}
 */
export const maxArea = function(height: number[]): number {
  const len = height.length
  let result = 0

  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      result = Math.max(result, Math.min(height[i], height[j]) * (j - i))
    }
  }

  return result
}

export const maxAreaByIndicator = function(height: number[]): number {
  let result = 0,
    l = 0,
    r = height.length - 1

  while (l < r) {
    result = Math.max(result, Math.min(height[l], height[r]) * (r - l))
    if (height[l] > height[r]) {
      r--
    } else {
      l++
    }
  }

  return result
}
