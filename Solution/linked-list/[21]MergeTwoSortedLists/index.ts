/*
 * @lc app=leetcode id=21 lang=typescript
 *
 * [21] Merge Two Sorted Lists
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

function mergeTwoLists(
    list1: ListNode | null,
    list2: ListNode | null
): ListNode | null {
    const dummyNode: ListNode = new ListNode();
    let curNode: ListNode = dummyNode;

    while (list1 && list2) {
        if (list1.val < list2.val) {
            curNode.next = list1;
            list1 = list1.next;
        } else {
            curNode.next = list2;
            list2 = list2.next;
        }

        curNode = curNode.next;
    }

    curNode.next = list1 || list2;

    return dummyNode.next;
}
// @lc code=end
