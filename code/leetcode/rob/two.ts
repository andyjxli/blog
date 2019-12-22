import rob1 from './one'

/**
 * @param {number[]} nums
 * @return {number}
 */
const rob = function(nums: number[]) {
  const len = nums.length

  if (len === 1) return nums[0]

  return Math.max(rob1(nums.slice(0, len - 1)), rob1(nums.slice(1, len)))
}

export default rob
