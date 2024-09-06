/*
 * @lc app=leetcode id=128 lang=typescript
 *
 * [128] Longest Consecutive Sequence
 */

// @lc code=start
function longestConsecutive(nums: number[]): number {
    const set: Set<number> = new Set(nums);

    return nums.reduce((acc, cur) => {
        if (set.has(cur - 1)) {
            return acc;
        }

        let curLength: number = 1;

        while (set.has(cur + curLength)) {
            ++curLength;
        }

        return Math.max(acc, curLength);
    }, 0);
}
// @lc code=end
