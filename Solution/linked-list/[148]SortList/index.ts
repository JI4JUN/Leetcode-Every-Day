/*
 * @lc app=leetcode id=148 lang=typescript
 *
 * [148] Sort List
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
function merge(left: ListNode | null, right: ListNode | null): ListNode | null {
    if (left === null || right === null) {
        return right || left;
    }

    const dummyNode = new ListNode();
    let currNode = dummyNode;

    while (left && right) {
        if (left.val < right.val) {
            currNode.next = left;
            left = left.next;
        } else {
            currNode.next = right;
            right = right.next;
        }

        currNode = currNode.next;
    }

    // Handle the remaining elements.
    currNode.next = left || right;

    return dummyNode.next;
}

function sortList(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) {
        return head;
    }

    let slow = head;
    let fast = head.next;

    // Get the middle node of the given list.
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    const midNode = slow;
    let leftNode = head;
    let rightNode = midNode.next;

    // Break the list into two halves.
    midNode.next = null;

    // Recursive sort the two halves.
    leftNode = sortList(leftNode);
    rightNode = sortList(rightNode);

    return merge(leftNode, rightNode);
}
// @lc code=end
