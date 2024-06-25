/*
 * @lc app=leetcode.cn id=872 lang=typescript
 *
 * [872] Leaf-Similar Trees
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

function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
    const backtrack = (root: TreeNode, leaves: number[]): void => {
        if (!root) {
            return;
        }

        const { left, right, val } = root;

        if (!left && !right) {
            leaves.push(val);
            return;
        }

        backtrack(left, leaves);
        backtrack(right, leaves);
    }

    const leaves1: number[] = [];
    const leaves2: number[] = [];
    backtrack(root1, leaves1);
    backtrack(root2, leaves2);

    return leaves1.toString() === leaves2.toString();
};
// @lc code=end

