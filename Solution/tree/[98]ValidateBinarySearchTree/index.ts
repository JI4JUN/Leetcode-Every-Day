/*
 * @lc app=leetcode id=98 lang=typescript
 *
 * [98] Validate Binary Search Tree
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
function isValidBST(root: TreeNode | null): boolean {
    const path: number[] = [];
    const inorder = (root: TreeNode | null): void => {
        if (root === null) {
            return;
        }

        const { left, right, val } = root;

        inorder(left);
        path.push(val);
        inorder(right);
    };
    const isAscending = (): boolean => {
        const len: number = path.length;

        if (len === 0 || len === 1) {
            return true;
        }

        for (let i = 1; i < len; ++i) {
            if (path[i - 1] >= path[i]) {
                return false;
            }
        }

        return true;
    };

    inorder(root);

    return isAscending();
}

// ======================== Approach 2 ======================== //
function isValidBST2(root: TreeNode | null): boolean {
    const validateBST = (
        root: TreeNode | null,
        min: number | null,
        max: number | null
    ): boolean => {
        if (root === null) {
            return true;
        }

        const { left, right, val } = root;

        if ((min !== null && val <= min) || (max !== null && val >= max)) {
            return false;
        }

        return validateBST(left, min, val) && validateBST(right, val, max);
    };

    return validateBST(root, null, null);
}
// @lc code=end
