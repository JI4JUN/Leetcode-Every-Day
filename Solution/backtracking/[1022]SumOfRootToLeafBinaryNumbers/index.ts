/*
 * @lc app=leetcode id=1022 lang=typescript
 *
 * [1022] Sum of Root To Leaf Binary Numbers
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

    const backtrack = (root: TreeNode | null, valStr: string): void => {
        if (!root) {
            return;
        }

        const tmpValStr: string = valStr;
        const { left, right, val } = root;

        valStr += String(val);

        if (!left && !right) {
            result.push(valStr);

            return;
        }

        backtrack(left, valStr);
        backtrack(right, valStr);
        valStr = tmpValStr;
    };

    backtrack(root, '');

    return result.reduce((sum, str) => (sum += parseInt(str, 2)), 0);
}
// @lc code=end
