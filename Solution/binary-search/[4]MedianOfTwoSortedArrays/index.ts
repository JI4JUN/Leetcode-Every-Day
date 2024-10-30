/*
 * @lc app=leetcode id=4 lang=typescript
 *
 * [4] Median of Two Sorted Arrays
 */

// @lc code=start
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
	if (nums1.length > nums2.length) {
		[nums1, nums2] = [nums2, nums1];
	}

	const total: number = nums1.length + nums2.length;
	const half: number = Math.floor(total / 2);
	let low: number = 0;
	let high: number = nums1.length - 1;

	while (1) {
		const i: number = low + ((high - low) >> 1);
		const j: number = half - i - 2;
		const left1: number = i >= 0 ? nums1[i] : -Infinity;
		const right1: number = i + 1 < nums1.length ? nums1[i + 1] : Infinity;
		const left2: number = j >= 0 ? nums2[j] : -Infinity;
		const right2: number = j + 1 < nums2.length ? nums2[j + 1] : Infinity;

		if (left1 <= right2 && left2 <= right1) {
			return total % 2 !== 0
				? Math.min(right1, right2)
				: (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
		} else if (left1 > right2) {
			high = i - 1;
		} else {
			low = i + 1;
		}
	}

	return -1;
}
// @lc code=end
