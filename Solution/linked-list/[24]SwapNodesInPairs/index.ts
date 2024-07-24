/*
 * @lc app=leetcode id=24 lang=typescript
 *
 * [24] Swap Nodes in Pairs
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

function swapPairs(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) {
        return head;
    }

    const dummyNode: ListNode | null = new ListNode(0, head);

    let curNode: ListNode | null = dummyNode;

    while (curNode.next && curNode.next.next) {
        const tempNode1: ListNode | null = curNode.next;
        const tempNode2: ListNode | null = curNode.next.next.next;

        curNode.next = curNode.next.next;
        curNode.next.next = tempNode1;
        curNode.next.next.next = tempNode2;
        curNode = curNode.next.next;
    }

    return dummyNode.next;
}
// @lc code=end
