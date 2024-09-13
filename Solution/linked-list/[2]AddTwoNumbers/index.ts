/*
 * @lc app=leetcode id=2 lang=typescript
 *
 * [2] Add Two Numbers
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function addTwoNumbers(
    l1: ListNode | null,
    l2: ListNode | null
): ListNode | null {
    const result: ListNode = new ListNode(0);
    let resultNode: ListNode = result;
    let isOver: boolean = false;

    const handleCarryBit = (val: number): number =>
        val >= 10 ? ((isOver = true), val - 10) : val;

    while (l1 !== null && l2 !== null) {
        let sum: number = l1.val + l2.val;

        if (isOver) {
            ++sum;
            isOver = false;
        }

        resultNode.next = new ListNode(handleCarryBit(sum));
        resultNode = resultNode.next;
        l1 = l1.next;
        l2 = l2.next;
    }

    let tailNode: ListNode | null = l1 || l2;

    while (tailNode !== null) {
        if (isOver) {
            ++tailNode.val;
            isOver = false;
        }

        resultNode.next = new ListNode(handleCarryBit(tailNode.val));
        resultNode = resultNode.next;
        tailNode = tailNode.next;
    }

    if (isOver) {
        resultNode.next = new ListNode(1);
    }

    return result.next;
}
// @lc code=end
