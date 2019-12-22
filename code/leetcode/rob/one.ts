// 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，
// 影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
// 给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

// 示例 1:

// 输入: [1,2,3,1]
// 输出: 4
// 解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
//      偷窃到的最高金额 = 1 + 3 = 4 。

/**
 * @param {number[]} nums
 * @return {number}
 * @name DP
 */
// const rob = function(nums: number[]) {
//   const len = nums.length
//   if (nums.length === 0) return 0
//   if (nums.length <= 2) return Math.max(...nums)

//   const dp = Array(len).fill(0)

//   for (let i = 0; i < len; i++) {
//     if (i < 2) {
//       dp[i] = nums[i]
//     } else if (i === 2) {
//       dp[i] = nums[2] + dp[i - 2]
//     } else {
//       dp[i] = nums[i] + Math.max(dp[i - 2], dp[i - 3])
//     }
//   }

//   return Math.max(dp[len - 1], dp[len - 2])
// }

const rob = function(nums: number[]) {
  // 核心点在于： max 为记录当前位置 i 之前的最大值， prevMax 为 i - 1 位以前的最大值，既然相邻的不能相加，那么当计算到第 i 位，就可以只比较 i - 1 位之前的最大值  prevMax + nums[i] 与 i 位之前的最大值 max之间的大小。
  let max = 0
  let prevMax = 0
  const len = nums.length

  for (let i = 0; i < len; i++) {
    const temp = max
    max = Math.max(prevMax + nums[i], max)
    prevMax = temp
  }

  return max
}

export default rob
