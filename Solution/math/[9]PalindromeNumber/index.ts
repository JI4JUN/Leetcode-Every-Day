/*
 * @lc app=leetcode id=9 lang=typescript
 *
 * [9] Palindrome Number
 */

// @lc code=start
function isPalindrome(x: number): boolean {
    if (x < 0) {
        return false;
    }

    let reversedX: number = 0;
    let tempX: number = x;

    while (tempX !== 0) {
        reversedX = reversedX * 10 + (tempX % 10);
        tempX = Math.floor(tempX / 10);
    }

    return reversedX === x;
}
// @lc code=end
