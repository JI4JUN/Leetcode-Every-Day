/*
 * @lc app=leetcode id=383 lang=typescript
 *
 * [383] Ransom Note
 */

// @lc code=start
function canConstruct(ransomNote: string, magazine: string): boolean {
    if (ransomNote.length > magazine.length) {
        return false;
    }

    const lettersArr: number[] = new Array(26).fill(0);
    const offset: number = 'a'.charCodeAt(0);

    for (const r of magazine) {
        ++lettersArr[r.charCodeAt(0) - offset];
    }

    for (const m of ransomNote) {
        const index: number = m.charCodeAt(0) - offset;

        --lettersArr[index];

        if (lettersArr[index] < 0) {
            return false;
        }
    }

    return true;
}
// @lc code=end
