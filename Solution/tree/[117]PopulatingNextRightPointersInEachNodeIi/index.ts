/*
 * @lc app=leetcode id=117 lang=typescript
 *
 * [117] Populating Next Right Pointers in Each Node II
 */

// @lc code=start
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     left: _Node | null
 *     right: _Node | null
 *     next: _Node | null
 *
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

    const queue: _Node[] = new Array();
    queue.push(root);

    while (queue.length > 0) {
        const size: number = queue.length;
        let preNode: _Node | null = null;

        for (let i = 0; i < size; ++i) {
            const currNode: _Node | null = queue.shift();

            if (currNode === null) {
                break;
            }

            currNode.next = preNode;
            preNode = currNode;

            if (currNode.right) {
                queue.push(currNode.right);
            }
            if (currNode.left) {
                queue.push(currNode.left);
            }
        }
    }

    return root;
}
// @lc code=end
