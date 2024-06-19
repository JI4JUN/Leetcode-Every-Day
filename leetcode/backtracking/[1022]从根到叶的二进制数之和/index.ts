/*
 * @lc app=leetcode.cn id=1022 lang=typescript
 *
 * [1022] 从根到叶的二进制数之和
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

function sumRootToLeaf(root: TreeNode | null): number {
    const result: string[] = [];

    const backtrack = (root: TreeNode, valStr: string) => {
        if (!root) {
            return;
        }

        const tmpValStr = valStr;
        valStr += ('' + root.val);

        const { left, right } = root;
        if (left === null && right === null) {
            result.push(valStr)
            return
        }

        backtrack(left, valStr);
        backtrack(right, valStr);
        valStr = tmpValStr;
    }

    backtrack(root, '');

    return result.reduce((sum, str) => sum += parseInt(str, 2), 0);
};
// @lc code=end

