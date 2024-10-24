/*
 * @lc app=leetcode id=19 lang=typescript
 *
 * [19] Remove Nth Node From End of List
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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    let dummyNode: ListNode = new ListNode(0, head);
    let fastNode: ListNode = dummyNode;
    let slowNode: ListNode = dummyNode;

    while (fastNode && n--) {
        fastNode = fastNode.next;
    }

    while (fastNode && fastNode.next) {
        fastNode = fastNode.next;
        slowNode = slowNode.next;
    }

    slowNode.next = slowNode.next.next;

    return dummyNode.next;
}
// @lc code=end
