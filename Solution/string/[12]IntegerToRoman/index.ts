/*
 * @lc app=leetcode id=12 lang=typescript
 *
 * [12] Integer to Roman
 */

// @lc code=start
function intToRoman(num: number): string {
    const intArr: number[] = [
        1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1
    ];
    const symbolArr: string[] = [
        'M',
        'CM',
        'D',
        'CD',
        'C',
        'XC',
        'L',
        'XL',
        'X',
        'IX',
        'V',
        'IV',
        'I'
    ];
    let result: string = '';
    let index: number = 0;

    while (num > 0) {
        if (num >= intArr[index]) {
            result += symbolArr[index];
            num -= intArr[index];
        } else {
            ++index;
        }
    }

    return result;
}
// @lc code=end
