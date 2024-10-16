/*
 * @lc app=leetcode id=215 lang=typescript
 *
 * [215] Kth Largest Element in an Array
 */

// @lc code=start
function findKthLargest(nums: number[], k: number): number {
    let len: number = nums.length;
    const startIndex: number = (len - 1) >> 1;
    const maxHeapify = (i: number): void => {
        const left: number = 2 * i + 1;
        const right: number = 2 * i + 2;
        let largest: number = i;

        if (left < len && nums[left] > nums[largest]) {
            largest = left;
        }
        if (right < len && nums[right] > nums[largest]) {
            largest = right;
        }
        if (largest !== i) {
            [nums[i], nums[largest]] = [nums[largest], nums[i]];

            maxHeapify(largest);
        }
    };

    for (let i = startIndex; i >= 0; --i) {
        maxHeapify(i);
    }

    for (let i = 0; i < k - 1; ++i) {
        [nums[0], nums[len - 1]] = [nums[len - 1], nums[0]];
        --len;

        maxHeapify(0);
    }

    return nums[0];
}
// @lc code=end
