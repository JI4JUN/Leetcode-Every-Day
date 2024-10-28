/*
 * @lc app=leetcode id=23 lang=typescript
 *
 * [23] Merge k Sorted Lists
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

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
	if (lists.length === 0) {
		return null;
	}

	const mergeSortedLists = (
		list1: ListNode | null,
		list2: ListNode | null
	): ListNode | null => {
		const dummyNode: ListNode = new ListNode();
		let currentNode: ListNode = dummyNode;

		while (list1 && list2) {
			if (list1.val > list2.val) {
				currentNode.next = list2;
				list2 = list2.next;
			} else {
				currentNode.next = list1;
				list1 = list1.next;
			}

			currentNode = currentNode.next;
		}

		currentNode.next = list1 || list2;

		return dummyNode.next;
	};

	while (lists.length > 1) {
		const tmpLists: Array<ListNode | null> = [];

		for (let i = 0; i < lists.length; i += 2) {
			const list1: ListNode = lists[i];
			const list2: ListNode | null =
				i + 1 < lists.length ? lists[i + 1] : null;

			tmpLists.push(mergeSortedLists(list1, list2));
		}

		lists = tmpLists;
	}

	return lists[0];
}
// @lc code=end
