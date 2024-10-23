/*
 * @lc app=leetcode id=208 lang=typescript
 *
 * [208] Implement Trie (Prefix Tree)
 */

// @lc code=start
class Trie {
	private children: Map<string, Trie>;
	private wordEnd: boolean;

	constructor() {
		this.children = new Map();
		this.wordEnd = false;
	}

	insert(word: string): void {
		let current: Trie = this;

		for (const letter of word) {
			if (!current.children.has(letter)) {
				current.children.set(letter, new Trie());
			}

			current = current.children.get(letter)!;
		}

		current.wordEnd = true;
	}

	search(word: string): boolean {
		let current: Trie = this;

		for (const letter of word) {
			if (current.children.has(letter)) {
				current = current.children.get(letter)!;
			} else {
				return false;
			}
		}

		return current.wordEnd;
	}

	startsWith(prefix: string): boolean {
		let current: Trie = this;

		for (const letter of prefix) {
			if (current.children.has(letter)) {
				current = current.children.get(letter)!;
			} else {
				return false;
			}
		}

		return true;
	}
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end
