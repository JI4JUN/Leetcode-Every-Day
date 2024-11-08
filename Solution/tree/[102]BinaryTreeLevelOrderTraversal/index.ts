/*
 * @lc app=leetcode id=102 lang=typescript
 *
 * [102] Binary Tree Level Order Traversal
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function levelOrder(root: TreeNode | null): number[][] {
	if (root === null) {
		return [];
	}

	const result: number[][] = [];
	const queue: TreeNode[] = [root];

	while (queue.length > 0) {
		const size: number = queue.length;
		const currentLevel: number[] = [];

		for (let i = 0; i < size; ++i) {
			const { val, left, right } = queue.shift()!;

			if (left) {
				queue.push(left);
			}
			if (right) {
				queue.push(right);
			}

			currentLevel.push(val);
		}

		result.push(currentLevel);
	}

	return result;
}
// @lc code=end
