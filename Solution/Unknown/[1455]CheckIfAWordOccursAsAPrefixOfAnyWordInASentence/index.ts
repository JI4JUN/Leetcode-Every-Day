/*
 * @lc app=leetcode id=1455 lang=typescript
 *
 * [1455] Check If a Word Occurs As a Prefix of Any Word in a Sentence
 */

// @lc code=start
function isPrefixOfWord(sentence: string, searchWord: string): number {
	const words = sentence.split(' ');

	for (let i = 0; i < words.length; i++) {
		if (words[i].startsWith(searchWord)) {
			return i + 1;
		}
	}

	return -1;
}
// @lc code=end
