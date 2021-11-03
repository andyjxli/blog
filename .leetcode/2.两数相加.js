/*
 * @Author: andyjxli(李嘉欣)
 * @Date: 2021-11-01 10:09:07
 * @LastEditTime: 2021-11-01 12:16:50
 * @LastEditors: andyjxli(李嘉欣)
 * @Description: Edit Description
 * @FilePath: /.leetcode/2.两数相加.js
 */
/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let carry = 0;
  let p1 = l1;
  let p2 = l2;
  let lastPoint = l1;
  while (p1 || p2) {
    const res = p1.val + p2.val + carry;
    carry = res >= 10 ? 1 : 0;
    p1.val = res % 10;

    if (!p1.next && p2.next) p1.next = new ListNode(0);
    else if (p1.next && !p2.next) p2.next = new ListNode(0);
    lastPoint = p1;
    p1 = p1.next;
    p2 = p2.next;
  }

  if (carry > 0) {
    lastPoint.next = new ListNode(carry);
  }

  return l1;
};
// @lc code=end
