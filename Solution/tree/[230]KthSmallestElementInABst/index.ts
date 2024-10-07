/*
 * @lc app=leetcode id=230 lang=typescript
 *
 * [230] Kth Smallest Element in a BST
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

function kthSmallest(root: TreeNode | null, k: number): number {
    let result: number = -1;
    let count: number = 0;
    const inOrder = (root: TreeNode | null): void => {
        if (root === null || result !== -1) {
            return;
        }

        const { left, right, val } = root;

        inOrder(left);

        ++count;
        if (count === k) {
            result = val;

            return;
        }

        inOrder(right);
    };

    inOrder(root);

    return result;
}
// @lc code=end
