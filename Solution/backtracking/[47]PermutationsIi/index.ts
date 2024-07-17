/*
 * @lc app=leetcode id=47 lang=typescript
 *
 * [47] Permutations II
 */

// @lc code=start
function permuteUnique(nums: number[]): number[][] {
    const length: number = nums.length;

    const result: number[][] = [];
    const visited: boolean[] = new Array<boolean>(length).fill(false);

    const backtrack = (path: number[]): void => {
        if (path.length === length) {
            result.push([...path]);

            return;
        }

        for (let i = 0; i < length; ++i) {
            if (
                (i > 0 && nums[i - 1] === nums[i] && !visited[i - 1]) ||
                visited[i]
            ) {
                continue;
            }

            visited[i] = true;
            path.push(nums[i]);
            backtrack(path);
            path.pop();
            visited[i] = false;
        }
    };

    nums.sort();

    backtrack([]);

    return result;
}
// @lc code=end
