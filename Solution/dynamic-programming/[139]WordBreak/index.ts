/*
 * @lc app=leetcode id=139 lang=typescript
 *
 * [139] Word Break
 */

// @lc code=start
function wordBreak(s: string, wordDict: string[]): boolean {
    const wordsSet: Set<string> = new Set(wordDict);
    const dp: boolean[] = new Array(s.length + 1).fill(false);

    dp[0] = true;

    for (let i = 1; i <= s.length; ++i) {
        for (const word of wordsSet) {
            const startIndex: number = i - word.length;

            if (
                startIndex >= 0 &&
                dp[startIndex] &&
                s.substring(startIndex, i) === word
            ) {
                dp[i] = true;

                break;
            }
        }
    }

    return dp[s.length];
}
// @lc code=end
