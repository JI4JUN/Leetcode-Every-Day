/*
 * @lc app=leetcode id=71 lang=typescript
 *
 * [71] Simplify Path
 */

// @lc code=start
function simplifyPath(path: string): string {
    return (
        '/' +
        path
            .split('/')
            .filter((token) => !['.', ''].includes(token))
            .reduce(
                (acc, cur) =>
                    cur === '..' ? (acc.pop(), acc) : (acc.push(cur), acc),
                [] as string[]
            )
            .join('/')
    );
}
// @lc code=end
