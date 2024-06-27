/*
 * @lc app=leetcode id=526 lang=typescript
 *
 * [526] Beautiful Arrangement
 */

// @lc code=start
function countArrangement(n: number): number {
    let result: number = 0;

    const visited = new Array<boolean>(n + 1).fill(false);

    const backtrack = (index: number): void => {
        if (index > n) {
            result++;

            return;
        }

        for (let i = 1; i <= n; i++) {
            if (!visited[i] && (!(i % index) || !(index % i))) {
                visited[i] = true;
                backtrack(index + 1);
                visited[i] = false;
            }
        }
    };

    backtrack(1);

    return result;
}
// @lc code=end
