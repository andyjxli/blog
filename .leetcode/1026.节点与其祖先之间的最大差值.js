/*
 * @lc app=leetcode.cn id=1026 lang=javascript
 *
 * [1026] 节点与其祖先之间的最大差值
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

const fn = (ele) => {
  if (!ele) return null;
  let leftRes = fn(ele.left);
  let rightRes = fn(ele.right);
  let maxDiff = Math.max(leftRes ? leftRes.maxDiff : 0, rightRes ? rightRes.maxDiff : 0);
  if (leftRes) maxDiff = Math.max(maxDiff, Math.abs(ele.val - leftRes.min), Math.abs(ele.val - leftRes.max));
  if (rightRes) maxDiff = Math.max(maxDiff, Math.abs(ele.val - rightRes.min), Math.abs(ele.val - rightRes.max));

  leftRes = leftRes || { max: 0, min: Number.MAX_SAFE_INTEGER };
  rightRes = rightRes || { max: 0, min: Number.MAX_SAFE_INTEGER };

  return {
    max: Math.max(leftRes.max, rightRes.max, ele.val),
    min: Math.min(leftRes.min, rightRes.min, ele.val),
    maxDiff,
  };
};
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxAncestorDiff = function (root) {
  const res = fn(root);
  return res.maxDiff;
};

// @lc code=end
