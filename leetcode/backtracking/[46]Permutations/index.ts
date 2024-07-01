/*
 * @lc app=leetcode id=46 lang=typescript
 *
 * [46] Permutations
 */

// @lc code=start
function permute(nums: number[]): number[][] {
    const length = nums.length;

    const result: number[][] = [];
    const visited: boolean[] = new Array<boolean>(length).fill(false);

    const backtrack = (path: number[]): void => {
        if (path.length === length) {
            result.push([...path]);

            return;
        }

        for (let i = 0; i < length; ++i) {
            if (visited[i]) {
                continue;
            }

            path.push(nums[i]);
            visited[i] = true;
            backtrack(path);
            visited[i] = false;
            path.pop();
        }
    };

    backtrack([]);

    return result;
}
// @lc code=end
