/*
 * @lc app=leetcode id=300 lang=typescript
 *
 * [300] Longest Increasing Subsequence
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function lengthOfLIS1(nums: number[]): number {
    const numsLen: number = nums.length;
    const dp: number[] = new Array(numsLen).fill(1);

    for (let i = 0; i < numsLen; ++i) {
        for (let j = 0; j < i; ++j) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
}

// ======================== Approach 2 ======================== //
function lengthOfLIS(nums: number[]): number {
    const result: number[] = [];
    const BS = (target: number): number => {
        let left: number = 0;
        let right: number = result.length - 1;

        while (left <= right) {
            const mid: number = left + ((right - left) >> 1);

            if (result[mid] < target) {
                left = mid + 1;
            } else if (result[mid] > target) {
                right = mid - 1;
            } else {
                return mid;
            }
        }

        return left;
    };

    nums.forEach((num) => {
        if (result.length === 0 || result.at(-1)! < num) {
            result.push(num);
        } else {
            result[BS(num)] = num;
        }
    });

    return result.length;
}
// @lc code=end
