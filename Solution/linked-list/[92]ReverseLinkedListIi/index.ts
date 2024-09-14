/*
 * @lc app=leetcode id=92 lang=typescript
 *
 * [92] Reverse Linked List II
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
function reverseBetween1(
    head: ListNode | null,
    left: number,
    right: number
): ListNode | null {
    if (left === right) {
        return head;
    }

    const dummyNode: ListNode = new ListNode(0, head);
    let startNode: ListNode | null = dummyNode;
    let leftNode: ListNode | null = startNode;
    let rightNode: ListNode | null = startNode;

    while (left--) {
        leftNode = leftNode.next;
    }
    while (right--) {
        rightNode = rightNode.next;
    }
    while (startNode.next !== leftNode) {
        startNode = startNode.next;
    }

    startNode.next = rightNode;

    let tempNode: ListNode | null = null;
    let currNode: ListNode | null = leftNode;
    let preNode: ListNode | null = rightNode.next;

    while (currNode !== rightNode) {
        tempNode = currNode.next;
        currNode.next = preNode;
        preNode = currNode;
        currNode = tempNode;
    }

    currNode.next = preNode;

    return dummyNode.next;
}

// ======================== Approach 2 ======================== //
function reverseBetween(
    head: ListNode | null,
    left: number,
    right: number
): ListNode | null {
    if (!head || left === right) return head;

    const dummyNode: ListNode = new ListNode(0, head);
    let pre: ListNode | null = dummyNode;

    // 1. 移动 pre 到 left 前一个节点
    for (let i = 1; i < left; i++) {
        pre = pre.next;
    }

    // 2. 当前的 left 节点
    let curr: ListNode | null = pre.next;

    // 3. 反转 left 到 right 之间的节点
    for (let i = 0; i < right - left; i++) {
        let temp: ListNode | null = curr.next;
        curr.next = temp.next;
        temp.next = pre.next;
        pre.next = temp;
    }

    return dummyNode.next;
}

// @lc code=end
