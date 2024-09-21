/*
 * @lc app=leetcode id=412 lang=typescript
 *
 * [412] Fizz Buzz
 */

// @lc code=start
function fizzBuzz(n: number): string[] {
    return new Array(n).fill('').map((curr, index) => {
        if ((index + 1) % 3 === 0) {
            curr += 'Fizz';
        }
        if ((index + 1) % 5 === 0) {
            curr += 'Buzz';
        }
        if (curr === '') {
            curr += index + 1;
        }

        return curr;
    });
}
// @lc code=end
