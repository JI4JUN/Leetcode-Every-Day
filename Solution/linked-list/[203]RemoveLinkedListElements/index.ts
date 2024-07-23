/*
 * @lc app=leetcode id=203 lang=typescript
 *
 * [203] Remove Linked List Elements
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

// ======================== Approach 1 ======================== //
function removeElements1(head: ListNode | null, val: number): ListNode | null {
    while (head && head.val === val) {
        head = head.next;
    }

    if (!head) {
        return head;
    }

    let preNode: ListNode | null = head;
    let curNode: ListNode | null = head.next;

    while (curNode) {
        if (curNode.val === val) {
            preNode.next = curNode.next;
        } else {
            preNode = curNode;
        }

        curNode = curNode.next;
    }

    return head;
}

// ======================== Approach 2 ======================== //
function removeElements(head: ListNode | null, val: number): ListNode | null {
    const dummyNode: ListNode | null = new ListNode(0, head);

    let preNode: ListNode | null = dummyNode;
    let curNode: ListNode | null = dummyNode.next;

    while (curNode) {
        if (curNode.val === val) {
            preNode.next = curNode.next;
        } else {
            preNode = curNode;
        }

        curNode = curNode.next;
    }

    return dummyNode.next;
}
// @lc code=end
