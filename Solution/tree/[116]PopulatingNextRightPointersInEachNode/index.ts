/*
 * @lc app=leetcode id=116 lang=typescript
 *
 * [116] Populating Next Right Pointers in Each Node
 */

// @lc code=start
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     left: _Node | null
 *     right: _Node | null
 *     next: _Node | null
 *     constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function connect(root: _Node | null): _Node | null {
    if (root === null) {
        return null;
    }

    let leftNode: _Node | null = root;

    while (leftNode.left) {
        let currNode: _Node | null = leftNode;

        while (currNode) {
            currNode.left.next = currNode.right;
            currNode.right.next = currNode.next?.left || null;
            currNode = currNode.next;
        }

        leftNode = leftNode.left;
    }

    return root;
}
// @lc code=end
