/*
 * @lc app=leetcode id=15 lang=typescript
 *
 * [15] 3Sum
 */

// @lc code=start
function threeSum(nums: number[]): number[][] {
    const result: number[][] = [];
    const len: number = nums.length;

    nums.sort((a, b) => a - b);

    for (let i = 0, j = -1, k = -1; i < len - 2; ++i) {
        if (nums[i] > 0) {
            break;
        }

        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        j = i + 1;
        k = len - 1;

        while (j < k) {
            const sum: number = nums[i] + nums[j] + nums[k];

            if (sum > 0) {
                --k;
            } else if (sum < 0) {
                ++j;
            } else {
                result.push([nums[i], nums[j], nums[k]]);

                --k;
                ++j;

                while (j < k && nums[k] === nums[k + 1]) {
                    --k;
                }
                while (j < k && nums[j] === nums[j - 1]) {
                    ++j;
                }
            }
        }
    }

    return result;
}
// @lc code=end
