/*
 * @lc app=leetcode id=82 lang=typescript
 *
 * [82] Remove Duplicates from Sorted List II
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

function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) {
        return head;
    }

    const dummyNode: ListNode = new ListNode(0, head);
    let curNode: ListNode = dummyNode;

    while (curNode.next !== null) {
        if (
            curNode.next.next !== null &&
            curNode.next.val === curNode.next.next.val
        ) {
            let dupNode: ListNode = curNode.next;

            while (dupNode.next !== null && dupNode.val === dupNode.next.val) {
                dupNode = dupNode.next;
            }

            curNode.next = dupNode.next;
        } else {
            curNode = curNode.next;
        }
    }

    return dummyNode.next;
}
// @lc code=end
