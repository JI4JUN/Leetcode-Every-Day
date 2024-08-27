/*
 * @lc app=leetcode id=189 lang=typescript
 *
 * [189] Rotate Array
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */
// ======================== Approach 1 ======================== //
function rotate1(nums: number[], k: number): void {
    while (k--) {
        nums.unshift(nums.pop()!);
    }
}

// ======================== Approach 2 ======================== //
function rotate2(nums: number[], k: number): void {
    const len: number = nums.length;
    const reverseSegment = (start: number, end: number): void => {
        while (start < end) {
            [nums[start++], nums[end--]] = [nums[end], nums[start]];
        }
    };

    k %= len;

    reverseSegment(0, len - k - 1);
    reverseSegment(len - k, len - 1);
    nums.reverse();
}

// ======================== Approach 3 ======================== //
function rotate(nums: number[], k: number): void {
    const len: number = nums.length;
    const tempArr: number[] = new Array(len).fill(0);

    k %= len;

    for (let i = 0; i < len; ++i) {
        tempArr[(i + k) % len] = nums[i];
    }

    for (let i = 0; i < len; ++i) {
        nums[i] = tempArr[i];
    }
}
// @lc code=end
