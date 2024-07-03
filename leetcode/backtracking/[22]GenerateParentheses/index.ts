/*
 * @lc app=leetcode id=22 lang=typescript
 *
 * [22] Generate Parentheses
 */

// @lc code=start
function generateParenthesis(n: number): string[] {
    const result: string[] = [];
    const visited: boolean[] = new Array<boolean>(n).fill(false);

    let parenthesis: string = '';
    for (let i = 0; i < 2 * n; ++i) {
        parenthesis += i < n ? '(' : ')';
    }

    const isWellFormed = (str: string): boolean => {
        const stack: string[] = [];

        for (const char of str) {
            if (char === '(') {
                stack.push(char);
            } else if (char === ')') {
                if (stack.length === 0) {
                    return false;
                }
                stack.pop();
            }
        }

        return stack.length === 0;
    };

    const backtrack = (path: string): void => {
        if (path.length === 2 * n && isWellFormed(path)) {
            result.push(path);

            return;
        }

        for (let i = 0; i < 2 * n; ++i) {
            if (
                (i === 0 && parenthesis[i] === ')') ||
                (i > 0 &&
                    parenthesis[i - 1] === parenthesis[i] &&
                    !visited[i - 1]) ||
                visited[i]
            ) {
                continue;
            }

            path += parenthesis[i];
            visited[i] = true;
            backtrack(path);
            visited[i] = false;
            path = path.slice(0, -1);
        }
    };

    backtrack('');

    return result;
}
// @lc code=end
