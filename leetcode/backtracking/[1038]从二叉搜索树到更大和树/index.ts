/*
 * @lc app=leetcode.cn id=1038 lang=typescript
 *
 * [1038] 从二叉搜索树到更大和树
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

function bstToGst(root: TreeNode | null): TreeNode | null {
    let sum = 0;

    const backtrack = (root: TreeNode | null): void => {
        if (!root) {
            return;
        }

        backtrack(root.right);
        sum += root.val;
        root.val = sum;
        backtrack(root.left);

    }

    backtrack(root);

    return root;
};
// @lc code=end

