/*
 * @lc app=leetcode id=206 lang=typescript
 *
 * [206] Reverse Linked List
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
function reverseList(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) {
        return head;
    }

    let tempNode: ListNode | null = null,
        curNode: ListNode | null = head,
        preNode: ListNode | null = null;

    while (curNode) {
        tempNode = curNode.next;
        curNode.next = preNode;
        preNode = curNode;
        curNode = tempNode;
    }

    return preNode;
}

// ======================== Approach 2 ======================== //
function reverseList2(head: ListNode | null): ListNode | null {
    const recur = (
        preNode: ListNode | null,
        curNode: ListNode | null
    ): ListNode | null => {
        if (!curNode) {
            return preNode;
        }

        let tempNode: ListNode | null = curNode.next;

        curNode.next = preNode;
        preNode = curNode;
        curNode = tempNode;

        return recur(preNode, curNode);
    };

    return recur(null, head);
}

// ======================== Approach 3 ======================== //
function reverseList3(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) {
        return head;
    }

    let newHead: ListNode | null = null;

    const recur = (node: ListNode | null, preNode: ListNode | null): void => {
        if (node.next === null) {
            newHead = node;
            node.next = preNode;
        } else {
            recur(node.next, node);
            node.next = preNode;
        }
    };

    recur(head, null);

    return newHead;
}
// @lc code=end
