/*
 * @lc app=leetcode id=125 lang=typescript
 *
 * [125] Valid Palindrome
 */

// @lc code=start
function isPalindrome(s: string): boolean {
    let start: number = 0;
    let end: number = s.length - 1;

    const isAlnum = (str: string): boolean => /^[a-zA-Z0-9]+$/.test(str);

    while (start <= end) {
        const startChar: string = s[start];
        const endChar: string = s[end];

        if (!isAlnum(startChar)) {
            ++start;

            continue;
        }

        if (!isAlnum(endChar)) {
            --end;

            continue;
        }

        if (startChar.toLocaleLowerCase() !== endChar.toLocaleLowerCase()) {
            return false;
        }

        ++start;
        --end;
    }

    return true;
}
// @lc code=end
