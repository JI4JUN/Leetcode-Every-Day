/*
 * @lc app=leetcode id=238 lang=typescript
 *
 * [238] Product of Array Except Self
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function productExceptSelf1(nums: number[]): number[] {
    return nums.map((_num, index, arr) =>
        arr.reduce((acc, cur, idx) => (idx === index ? acc : acc * cur), 1)
    );
}

// ======================== Approach 2 ======================== //
function productExceptSelf(nums: number[]): number[] {
    const len: number = nums.length;
    const result: number[] = new Array(len).fill(0);
    const { product, zeroCnt } = nums.reduce(
        (acc, cur) => {
            let { product, zeroCnt } = acc;
            if (cur === 0) {
                ++zeroCnt;
            } else {
                product *= cur;
            }

            return { product, zeroCnt };
        },
        { product: 1, zeroCnt: 0 }
    );

    if (zeroCnt === 1) {
        return nums.reduce(
            (acc, cur, idx) => (cur === 0 ? ((acc[idx] = product), acc) : acc),
            result
        );
    } else if (zeroCnt === 0) {
        return nums.reduce(
            (acc, cur, idx) => ((acc[idx] = Math.floor(product / cur)), acc),
            result
        );
    }

    // zeroCnt === 0
    return result;
}
// @lc code=end
