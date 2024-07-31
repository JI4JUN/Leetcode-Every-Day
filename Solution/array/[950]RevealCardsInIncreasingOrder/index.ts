/*
 * @lc app=leetcode id=950 lang=typescript
 *
 * [950] Reveal Cards In Increasing Order
 */

// @lc code=start
function deckRevealedIncreasing(deck: number[]): number[] {
    deck.sort((a, b) => a - b);

    const result: number[] = [deck.pop()!];

    for (const num of deck.reverse()) {
        result.unshift(result.pop()!);
        result.unshift(num);
    }

    return result;
}
// @lc code=end
