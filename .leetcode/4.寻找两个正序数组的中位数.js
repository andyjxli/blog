/*
 * @Author: andyjxli(李嘉欣)
 * @Date: 2021-11-04 09:27:49
 * @LastEditTime: 2021-11-04 11:09:13
 * @LastEditors: andyjxli(李嘉欣)
 * @Description: Edit Description
 * @FilePath: /blog/.leetcode/4.寻找两个正序数组的中位数.js
 */
/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 *
 * @solution: 寻找第 k 个最小数.
 *  若 n + m 为偶数，则 k = (n + m) / 2;
 *  若 n + m 为奇数，则 k = (n + m) / 2 + 1
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

const findMinKNums = (nums1, nums2, k) => {
  const len1 = nums1.length;
  const len2 = nums2.length;
  let index1 = (index2 = Math.ceil(k / 2) - 1);
  console.log(k, index1, index2, nums1, nums2);
  if (len1 === 0) return nums2[index2];
  if (len2 === 0) return nums1[index1];
  if (k === 1) return Math.min(nums1[index1], nums2[index2]);

  k -= Math.floor(k / 2);

  if (index1 > len1 - 1) {
    index1 = len1 - 1;
    k = k - len1;
  }
  if (index2 > len2 - 1) {
    index2 = len2 - 1;
    k = k - len2;
  }

  if (nums1[index1] >= nums2[index2]) {
    // console.log(k, index2);
    if (index) return findMinKNums(nums1, nums2.slice(index2 + 1, len2), k);
  } else return findMinKNums(nums1.slice(index1 + 1, len1), nums2, k);
};

var findMedianSortedArrays = function (nums1, nums2) {
  let len = nums1.length + nums2.length;
  // 偶数
  if (len % 2 === 0) {
    const mid = len / 2;
    console.log(findMinKNums(nums1, nums2, mid));
    console.log(findMinKNums(nums1, nums2, mid + 1));
    return (findMinKNums(nums1, nums2, mid) + findMinKNums(nums1, nums2, mid + 1)) / 2;
  }
  // 奇数
  else {
    const mid = Math.ceil(len / 2);
    return findMinKNums(nums1, nums2, mid);
  }
};

console.log(findMedianSortedArrays([1, 3], [2, 4]));
// @lc code=end
