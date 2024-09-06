/*
 * @lc app=leetcode id=228 lang=typescript
 *
 * [228] Summary Ranges
 */

// @lc code=start
function summaryRanges(nums: number[]): string[] {
    const result: string[] = new Array();
    const numsLen: number = nums.length;

    for (let left = 0, right = -1; left < numsLen; ++left) {
        right = left;

        while (right < numsLen - 1 && nums[right + 1] === nums[right] + 1) {
            ++right;
        }

        result.push(
            left === right ? `${nums[left]}` : `${nums[left]}->${nums[right]}`
        );

        left = right;
    }

    return result;
}
// @lc code=end
