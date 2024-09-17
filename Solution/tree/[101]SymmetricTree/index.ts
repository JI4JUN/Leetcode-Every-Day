/*
 * @lc app=leetcode id=101 lang=typescript
 *
 * [101] Symmetric Tree
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

function isSymmetric(root: TreeNode | null): boolean {
    const isMirror = (
        tree1: TreeNode | null,
        tree2: TreeNode | null
    ): boolean => {
        if (!tree1 && !tree2) {
            return true;
        }

        if (!tree1 || !tree2) {
            return false;
        }

        if (tree1.val !== tree2.val) {
            return false;
        }

        return (
            isMirror(tree1.left, tree2.right) &&
            isMirror(tree1.right, tree2.left)
        );
    };

    return isMirror(root.left, root.right);
}
// @lc code=end
