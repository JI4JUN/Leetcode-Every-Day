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
        if (!isAlnum(s[start])) {
            ++start;

            continue;
        }

        if (!isAlnum(s[end])) {
            --end;

            continue;
        }

        if (s[start].toLocaleLowerCase() !== s[end].toLocaleLowerCase()) {
            return false;
        }

        ++start;
        --end;
    }

    return true;
}
// @lc code=end
