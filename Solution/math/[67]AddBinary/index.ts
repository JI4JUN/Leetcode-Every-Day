/*
 * @lc app=leetcode id=67 lang=typescript
 *
 * [67] Add Binary
 */

// @lc code=start
function addBinary(a: string, b: string): string {
    let carry: number = 0;
    let i: number = a.length - 1;
    let j: number = b.length - 1;
    let k: number = Math.max(i, j) + 1;
    const result: string[] = new Array<string>(k + 1);

    while (i >= 0 || j >= 0 || carry > 0) {
        i >= 0 && (carry += Number(a[i--]));
        j >= 0 && (carry += Number(b[j--]));

        result[k--] = '' + (carry % 2);
        carry >>= 1;
    }

    return result.join('');
}
// @lc code=end
