/*
 * @lc app=leetcode id=86 lang=typescript
 *
 * [86] Partition List
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

function partition(head: ListNode | null, x: number): ListNode | null {
    if (head === null || head.next === null) {
        return head;
    }

    const dummyNode: ListNode = new ListNode(0, head);
    let currNode: ListNode | null = dummyNode.next;
    let leftEnd: ListNode | null = dummyNode;
    let rightStart: ListNode | null = null;
    let rightEnd: ListNode | null = null;

    while (currNode !== null) {
        if (currNode.val < x) {
            leftEnd.next = currNode;
            leftEnd = leftEnd.next;
        } else {
            if (rightEnd === null) {
                rightStart = currNode;
                rightEnd = currNode;
            } else {
                rightEnd.next = currNode;
                rightEnd = rightEnd.next;
            }
        }

        currNode = currNode.next;
    }

    if (rightEnd !== null) {
        rightEnd.next = null;
    }

    leftEnd.next = rightStart;

    return dummyNode.next;
}
// @lc code=end
