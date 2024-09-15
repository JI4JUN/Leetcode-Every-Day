/*
 * @lc app=leetcode id=61 lang=typescript
 *
 * [61] Rotate List
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

function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (head === null || head.next === null) {
        return head;
    }

    let currNode: ListNode | null = head;
    let len: number = 0;

    while (currNode !== null) {
        len++;
        currNode = currNode.next;
    }

    k %= len;

    if (k === 0) {
        return head;
    }

    const dummyNode: ListNode = new ListNode(0, head);
    let leftNode: ListNode | null = dummyNode;
    let rightNode: ListNode | null = dummyNode;

    while (k--) {
        rightNode = rightNode.next;
    }
    while (rightNode.next !== null) {
        leftNode = leftNode.next;
        rightNode = rightNode.next;
    }

    dummyNode.next = leftNode.next;
    leftNode.next = null;
    rightNode.next = head;

    return dummyNode.next;
}
// @lc code=end
