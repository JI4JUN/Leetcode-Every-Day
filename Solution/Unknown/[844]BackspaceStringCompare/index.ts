/*
 * @lc app=leetcode id=844 lang=typescript
 *
 * [844] Backspace String Compare
 */

// @lc code=start
function backspaceCompare(s: string, t: string): boolean {
    const stack1: string[] = [];
    const stack2: string[] = [];

    for (const c of s) {
        if (c === '#') {
            if (stack1.length > 0) {
                stack1.pop();
            }
        } else {
            stack1.push(c);
        }
    }

    for (const c of t) {
        if (c === '#') {
            if (stack2.length > 0) {
                stack2.pop();
            }
        } else {
            stack2.push(c);
        }
    }

    return JSON.stringify(stack1) === JSON.stringify(stack2);
}
// @lc code=end
