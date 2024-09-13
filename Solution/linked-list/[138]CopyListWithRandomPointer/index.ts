/*
 * @lc app=leetcode id=138 lang=typescript
 *
 * [138] Copy List with Random Pointer
 */

// @lc code=start
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     next: _Node | null
 *     random: _Node | null
 *
 *     constructor(val?: number, next?: _Node, random?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *         this.random = (random===undefined ? null : random)
 *     }
 * }
 */
// ======================== Approach 1 ======================== //
function copyRandomList1(head: _Node | null): _Node | null {
    const copyMap: Map<_Node, _Node> = new Map();
    let currNode: _Node | null = head;

    while (currNode !== null) {
        copyMap.set(currNode, new _Node(currNode.val));

        currNode = currNode.next;
    }

    currNode = head;

    while (currNode !== null) {
        copyMap.get(currNode).next = copyMap.get(currNode.next) || null;
        copyMap.get(currNode).random = copyMap.get(currNode.random) || null;

        currNode = currNode.next;
    }

    return copyMap.get(head);
}

// ======================== Approach 2 ======================== //
function copyRandomList(head: _Node | null): _Node | null {
    if (head === null) {
        return null;
    }

    let currNode: _Node | null = head;

    while (currNode !== null) {
        const newNode: _Node | null = new _Node(currNode.val);

        newNode.next = currNode.next;
        currNode.next = newNode;
        currNode = newNode.next;
    }

    currNode = head;

    while (currNode !== null) {
        currNode.next.random = currNode.random ? currNode.random.next : null;
        currNode = currNode.next.next;
    }

    let oldHead: _Node | null = head;
    let newHead: _Node | null = head.next;
    let currOld: _Node | null = oldHead;
    let currNew: _Node | null = newHead;

    while (currOld !== null) {
        currOld.next = currNew.next;
        currNew.next = currOld.next ? currOld.next.next : null;
        currOld = currOld.next;
        currNew = currNew.next;
    }

    return newHead;
}
// @lc code=end
