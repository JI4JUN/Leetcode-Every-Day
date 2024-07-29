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

// ======================== Approach 1 ======================== //
function getIntersectionNode1(
    headA: ListNode | null,
    headB: ListNode | null
): ListNode | null {
    let curANode: ListNode | null = headA,
        curBNode: ListNode | null = headB;
    let lenA: number = 0,
        lenB: number = 0;

    while (curANode) {
        curANode = curANode.next;
        ++lenA;
    }

    while (curBNode) {
        curBNode = curBNode.next;
        ++lenB;
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

// ======================== Approach 2 ======================== //
function getIntersectionNode(
    headA: ListNode | null,
    headB: ListNode | null
): ListNode | null {
    const set: Set<ListNode | null> = new Set<ListNode | null>();

    while (headA) {
        set.add(headA);

        headA = headA.next;
    }

    while (headB) {
        if (set.has(headB)) {
            return headB;
        }

        headB = headB.next;
    }

    return null;
}

// ======================== Approach 3 ======================== //
function getIntersectionNode3(
    headA: ListNode | null,
    headB: ListNode | null
): ListNode | null {
    let curANode: ListNode | null = headA,
        curBNode: ListNode | null = headB;

    while (curANode !== curBNode) {
        if (!curANode) {
            curANode = headB;
        } else {
            curANode = curANode.next;
        }

        if (!curBNode) {
            curBNode = headA;
        } else {
            curBNode = curBNode.next;
        }
    }

    return curANode;
}
// @lc code=end
