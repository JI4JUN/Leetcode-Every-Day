/*
 * @lc app=leetcode id=209 lang=typescript
 *
 * [209] Minimum Size Subarray Sum
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function minSubArrayLen1(target: number, nums: number[]): number {
    const len: number = nums.length;

    let result: number = Infinity;
    let left: number = 0;
    let right: number = 0;
    let sum: number = 0;

    while (right < len) {
        const count: number = right - left + 1;

        sum += nums[right];

        if (sum >= target) {
            result = Math.min(result, count);
            right = ++left;
            sum = 0;
        } else {
            if (count === len) {
                break;
            }

            ++right;
        }
    }

    return result === Infinity ? 0 : result;
}

// ======================== Approach 2 ======================== //
function minSubArrayLen2(target: number, nums: number[]): number {
    let result: number = Infinity;
    let sum: number = 0;

    for (let left = 0, right = 0; right < nums.length; ++right) {
        sum += nums[right];

        while (sum >= target) {
            result = Math.min(result, right - left + 1);
            sum -= nums[left++];
        }
    }

    return result === Infinity ? 0 : result;
}

// ======================== Approach 3 ======================== //
function minSubArrayLen(target: number, nums: number[]): number {
    const len: number = nums.length;
    const prefix: number[] = new Array(len + 1).fill(0);
    for (let i = 1; i < prefix.length; ++i) {
        prefix[i] = prefix[i - 1] + nums[i - 1];
    }

    let result: number = Infinity;
    let start: number = 0;

    while (start < len) {
        let left: number = start + 1;
        let right: number = len + 1;

        while (left < right) {
            const mid: number = left + ((right - left) >> 1);

            if (prefix[mid] - prefix[start] >= target) {
                result = Math.min(result, mid - start);
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        start++;
    }

    return result === Infinity ? 0 : result;
}
// @lc code=end
