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
function getIntersectionNode(
    headA: ListNode | null,
    headB: ListNode | null
): ListNode | null {
    let curNodeA: ListNode | null = headA,
        curNodeB: ListNode | null = headB;
    let lenA: number = 0,
        lenB: number = 0;

    while (curNodeA) {
        curNodeA = curNodeA.next;
        ++lenA;
    }

    while (curNodeB) {
        curNodeB = curNodeB.next;
        ++lenB;
    }

    curNodeA = headA;
    curNodeB = headB;

    if (lenB > lenA) {
        [lenB, lenA] = [lenA, lenB];
        [curNodeB, curNodeA] = [curNodeA, curNodeB];
    }

    let diff: number = lenA - lenB;

    while (diff--) {
        curNodeA = curNodeA.next;
    }

    while (curNodeA !== curNodeB) {
        curNodeA = curNodeA.next;
        curNodeB = curNodeB.next;
    }

    return curNodeA;
}

// ======================== Approach 2 ======================== //
function getIntersectionNode2(
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
    let curNodeA: ListNode | null = headA,
        curNodeB: ListNode | null = headB;

    while (curNodeA !== curNodeB) {
        curNodeA = curNodeA ? curNodeA.next : headB;
        curNodeB = curNodeB ? curNodeB.next : headA;
    }

    return curNodeA;
}
// @lc code=end
