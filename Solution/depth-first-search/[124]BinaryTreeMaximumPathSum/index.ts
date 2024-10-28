/*
 * @lc app=leetcode id=124 lang=typescript
 *
 * [124] Binary Tree Maximum Path Sum
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

function maxPathSum(root: TreeNode | null): number {
	if (!root) {
		return 0;
	}

	const dfs = (root: TreeNode | null): number => {
		if (!root) {
			return 0;
		}

		const left: number = dfs(root.left);
		const right: number = dfs(root.right);
		const maxSingle: number = Math.max(
			root.val,
			root.val + Math.max(left, right)
		);
		const curMaxSum: number = Math.max(maxSingle, root.val + left + right);
		result = Math.max(result, curMaxSum);

		return maxSingle;
	};

	let result: number = -Infinity;

	dfs(root);

	return result;
}
// @lc code=end
