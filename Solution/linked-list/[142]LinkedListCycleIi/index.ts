/*
 * @lc app=leetcode id=142 lang=typescript
 *
 * [142] Linked List Cycle II
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

function detectCycle(head: ListNode | null): ListNode | null {
    let fastNode: ListNode | null = head,
        slowNode: ListNode | null = head;

    while (fastNode && fastNode.next) {
        fastNode = fastNode.next.next;
        slowNode = slowNode.next;

        if (fastNode === slowNode) {
            let cycleStart: ListNode | null = head;

            while (fastNode !== cycleStart) {
                cycleStart = cycleStart.next;
                fastNode = fastNode.next;
            }

            return cycleStart;
        }
    }

    return null;
}
// @lc code=end
