/*
 * @lc app=leetcode id=129 lang=typescript
 *
 * [129] Sum Root to Leaf Numbers
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

function sumNumbers(root: TreeNode | null): number {
    let result: number = 0;

    const backstracking = (root: TreeNode | null, sumStr: string): void => {
        if (!root) {
            return;
        }

        const { left, right, val } = root;
        sumStr += '' + val;

        if (!left && !right) {
            result += Number(sumStr);

            return;
        }

        backstracking(left, sumStr);
        backstracking(right, sumStr);
    };

    backstracking(root, '');

    return result;
}
// @lc code=end
