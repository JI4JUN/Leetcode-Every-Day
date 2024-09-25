/*
 * @lc app=leetcode id=67 lang=typescript
 *
 * [67] Add Binary
 */

// @lc code=start
function addBinary(a: string, b: string): string {
    let result: string = '';
    let carry: number = 0;
    let i: number = a.length - 1;
    let j: number = b.length - 1;

    while (i >= 0 || j >= 0 || carry > 0) {
        i >= 0 && (carry += Number(a[i--]));
        j >= 0 && (carry += Number(b[j--]));

        result += String(carry % 2);
        carry = carry >> 1;
    }

    return result.split('').reverse().join('');
}
// @lc code=end
