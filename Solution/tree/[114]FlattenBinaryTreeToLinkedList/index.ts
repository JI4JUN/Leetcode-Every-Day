/*
 * @lc app=leetcode id=114 lang=typescript
 *
 * [114] Flatten Binary Tree to Linked List
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

/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
    let prevNode: TreeNode | null = null;

    const backtracking = (root: TreeNode | null): void => {
        if (root === null) {
            return;
        }

        const { right, left } = root;

        backtracking(right);
        backtracking(left);

        root.right = prevNode;
        root.left = null;
        prevNode = root;
    };

    backtracking(root);
}
// @lc code=end
