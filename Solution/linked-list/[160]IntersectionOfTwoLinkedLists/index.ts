/*
 * @lc app=leetcode id=160 lang=typescript
 *
 * [160] Intersection of Two Linked Lists
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

function getIntersectionNode(
    headA: ListNode | null,
    headB: ListNode | null
): ListNode | null {
    let curANode: ListNode | null = headA,
        curBNode: ListNode | null = headB;
    let lenA: number = 0,
        lenB: number = 0;

    while (curANode) {
        ++lenA;
        curANode = curANode.next;
    }

    while (curBNode) {
        ++lenB;
        curBNode = curBNode.next;
    }

    curANode = headA;
    curBNode = headB;

    if (lenB > lenA) {
        [lenB, lenA] = [lenA, lenB];
        [curBNode, curANode] = [curANode, curBNode];
    }

    let diff: number = lenA - lenB;

    while (diff--) {
        curANode = curANode.next;
    }

    while (curANode) {
        if (curANode === curBNode) {
            return curANode;
        }

        curANode = curANode.next;
        curBNode = curBNode.next;
    }

    return null;
}
// @lc code=end
