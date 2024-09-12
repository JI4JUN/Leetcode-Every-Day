/*
 * @lc app=leetcode id=530 lang=typescript
 *
 * [530] Minimum Absolute Difference in BST
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
// ======================== Approach 1 ======================== //
function getMinimumDifference1(root: TreeNode | null): number {
    const arr: number[] = new Array();

    const backtrack = (root: TreeNode | null): void => {
        if (!root) {
            return;
        }

        const { val, left, right } = root;

        arr.push(val);

        backtrack(left);
        backtrack(right);
    };

    backtrack(root);

    arr.sort((a, b) => a - b);

    let minDiff: number = Infinity;

    for (let i = 1; i < arr.length; ++i) {
        minDiff = Math.min(minDiff, Math.abs(arr[i] - arr[i - 1]));
    }

    return minDiff;
}

// ======================== Approach 2 ======================== //
function getMinimumDifference(root: TreeNode | null): number {
    let minDiff: number = Infinity;
    let preVal: number | null = null;

    const inorder = (root: TreeNode | null): void => {
        if (root === null) {
            return;
        }

        const { val, left, right } = root;

        inorder(left);

        if (preVal !== null) {
            minDiff = Math.min(minDiff, Math.abs(val - preVal));
        }

        preVal = val;

        inorder(right);
    };

    inorder(root);

    return minDiff;
}
// @lc code=end
