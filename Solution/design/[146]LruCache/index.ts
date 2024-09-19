/*
 * @lc app=leetcode id=146 lang=typescript
 *
 * [146] LRU Cache
 */

// @lc code=start
class LRUCache1 {
    private capacity: number;
    private map: Map<number, number>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map();
    }

    get(key: number): number {
        const value: number | undefined = this.map.get(key);

        if (value === undefined) {
            return -1;
        }

        this.map.delete(key);
        this.map.set(key, value);

        return value;
    }

    put(key: number, value: number): void {
        if (this.map.size >= this.capacity && !this.map.has(key)) {
            const firstKey: number = this.map.keys().next().value;

            this.map.delete(firstKey);
        }

        this.map.delete(key);
        this.map.set(key, value);
    }
}

type Value = {
    key: number;
    val: number;
};

class DoublyLinkedNode {
    public value: Value;
    public next: DoublyLinkedNode | null = null;
    public prev: DoublyLinkedNode | null = null;

    constructor(value: Value) {
        this.value = value;
    }
}

class DoublyLinkedList {
    public firstNode: DoublyLinkedNode | null = null;
    public lastNode: DoublyLinkedNode | null = null;
    public size: number = 0;

    push_front(node: DoublyLinkedNode): void {
        if (this.firstNode === null) {
            this.firstNode = node;
            this.lastNode = node;
        } else {
            node.next = this.firstNode;
            this.firstNode.prev = node;
            this.firstNode = node;
        }

        ++this.size;
    }

    remove(node: DoublyLinkedNode): void {
        if (this.firstNode === null) {
            return;
        }

        --this.size;

        if (this.firstNode === node) {
            this.firstNode = node.next;

            if (node.next !== null) {
                node.next.prev = null;
                node.next = null;
            }

            return;
        }

        if (this.lastNode === node) {
            this.lastNode = node.prev;
            node.prev!.next = null;
            node.prev = null;

            return;
        }

        node.prev!.next = node.next;
        node.next!.prev = node.prev;
    }
}

class LRUCache {
    private list: DoublyLinkedList;
    private keys: Map<number, DoublyLinkedNode>;
    private capacity: number;

    constructor(capacity: number) {
        this.list = new DoublyLinkedList();
        this.keys = new Map();
        this.capacity = capacity;
    }

    get(key: number): number {
        const node: DoublyLinkedNode | undefined = this.keys.get(key);

        if (node === undefined) {
            return -1;
        }

        this.list.remove(node);
        this.list.push_front(node);

        return node.value.val;
    }

    put(key: number, value: number): void {
        if (this.keys.has(key)) {
            const node: DoublyLinkedNode = this.keys.get(key)!;

            node.value.val = value;

            this.list.remove(node);
            this.list.push_front(node);

            return;
        } else {
            const newNode: DoublyLinkedNode = new DoublyLinkedNode({
                key: key,
                val: value
            });

            this.keys.set(key, newNode);
            this.list.push_front(newNode);
        }

        if (this.list.size > this.capacity) {
            const lastNode: DoublyLinkedNode = this.list.lastNode!;

            this.keys.delete(lastNode.value.key);
            this.list.remove(lastNode);
        }
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
