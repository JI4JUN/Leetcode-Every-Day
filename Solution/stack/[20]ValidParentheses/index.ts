/*
 * @lc app=leetcode id=20 lang=typescript
 *
 * [20] Valid Parentheses
 */

// @lc code=start
function isValid(s: string): boolean {
    if (s.length % 2 !== 0) {
        return false;
    }

    const stack: string[] = new Array();

    for (const c of s) {
        switch (c) {
            case '(':
            case '{':
            case '[':
                stack.push(c);

                break;
            case ')':
                if (stack.length === 0 || stack[stack.length - 1] !== '(') {
                    return false;
                }

                stack.pop();

                break;
            case '}':
                if (stack.length === 0 || stack[stack.length - 1] !== '{') {
                    return false;
                }

                stack.pop();

                break;
            case ']':
                if (stack.length === 0 || stack[stack.length - 1] !== '[') {
                    return false;
                }

                stack.pop();

                break;
        }
    }

    return stack.length === 0;
}
// @lc code=end
