# 146 LRU Cache

Created: September 18, 2024 5:37 PM
Difficulty: Medium
Topics: Doubly-Linked List, Hash Table, Linked List

## 📖Description

[LRU Cache](https://leetcode.com/problems/lru-cache/description)

## 🤔Intuition

[LRU Cache](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU) is a typical application of doubly-linked list, it demands ability to quickly search the least recently used data and involves speedy addition and deletion of nodes (run in $O(1)$ average time complexity).

To solve this problem, we can first implement a doubly-linked list, then implement a high-performance LRU Cache based on its features. However, for JS/TS, we can also use `Map` which behaves like an object, with the particularity of respecting insertion order of keys.

## 📋Approach One

This approach will implement a doubly-linked list, here are some details:

### Define `DoublyLinkedNode` Class

The `DoublyLinkedNode` class represents each element which stores `value` and has two pointers `next` and `prev` to both the next and previous nodes in the doubly-linked list.

```tsx
class DoublyLinkedNode {
    public value: Value;
    public next: DoublyLinkedNode | null = null;
    public prev: DoublyLinkedNode | null = null;

    constructor(value: Value) {
        this.value = value;
    }
}
```

A crux of `DoublyLinkedNode` implementation is the type of `value` is `Value` which is defined as:

```tsx
type Value = {
    key: number;
    val: number;
};
```

The reason why we need to store the `key` is that when the LRU Cache performs deletion operations, it needs to remove the eliminated value in the doubly linked list, and delete the key corresponding to the this eliminated value in the map. If the key is not stored in the `DoublyLinkedNode` , we can not run the deletion operations in $O(1)$ average time complexity.

### Define `DoublyLinkedList` Class

Here we will only implement two main methods `push_front(node)` and `remove(node)` which are required by LRU Cache , for manipulating the list.

**`push_front(node)` :**

- If `this.firstNode` is `null` , it means that the current linked list does not contain any elements.
    - Point `this.firstNode` and `this.lastNode` to `node` .
- Otherwise, link `node` to the head of the list, and point `this.firstNode` to `node` .
- Update `this.size` to `this.size + 1` .

```tsx
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
```

**`remove(node)` :**

- If the `this.size` is equal to `0` , means that the linked list has no elements available for deletion, just return.
- Decrease the `this.size` by `1` .
- If the `this.size` is equal to `0` now, means that the current linked list only includes one node, just remove this node.
- If `this.firstNode` points to `node` , means that `node` is the fist node of the linked list.
    - Point `this.firstNode` to `node.next` for updating the pointer `firstNode` .
    - Remove `node` from the list.
    - Stop the execution of the function `remove` .
- If `this.lastNode` points to `node` , means that `node` is the last node of the linked list.
    - Point itself to `node.prev` for updating the pointer `lastNode` .
    - Remove `node` from the list.
    - Stop the execution of the function `remove` .
- Otherwise, use the `prev` and `next` pointers directly to remove the `node` .

```tsx
remove(node: DListNode): void {
    if (this.size === 0) {
        return;
    }

    this.size--;

    if (this.size === 0) {
        node.next = null;
        node.prev = null;
        this.first = null;
        this.last = null;

        return;
    }

    if (this.first === node) {
        this.first = node.next;
        node.next.prev = null;
        node.next = null;

        return;
    }

    if (this.last === node) {
        this.last = node.prev;
        node.prev.next = null;
        node.prev = null;

        return;
    }

    node.prev!.next = node.next;
    node.next!.prev = node.prev;
    node.next = null;
    node.prev = null;
}
```

### Define `LRUCache` Class

Before that, let’s look back LRU Cache again:

- The LRU Cache is a data structure consisting of a map and a doubly linked list.
- The value corresponding to the key in the map is the node of the doubly linked list.
- The node of the doubly linked list stores its value and key.
- The new node or recently used node will be placed in the head of the doubly linked list.
- The eliminated node will be removed from the tail of the doubly linked list.

Now, we are going to implement the LRU Cache. 

**Attributes And Constructor Of `LRUCache` Class:**

- `list: DoulyLinkedList` : We need a doubly linked list to keep track of the order of node usage.
- `keys: Map<number, DoublyLinkedNode>` : We use a map for efficient search operation.
- `capacity: number` : We need a number type variable to regulate the capacity of this LRU Cache.
- `constructor(capcity)` : The `LRUCache` should be constructed by a initial `capacity` value.

```tsx
class LRUCache {
	  private list: DoublyLinkedList;
	  private keys: Map<number, DoublyLinkedNode>;
	  private capacity: number;
	
	  constructor(capacity: number) {
	      this.list = new DoublyLinkedList();
	      this.keys = new Map();
	      this.capacity = capacity;
	  }
}
```

**Methods Of `LRUCache` Class:**

We are required to implement two functions `get(key)` and `put(key, value)` .

**`get(key):`** 

- Try get this `node` from `keys` by `this.keys.get(key)` .
- If this `node` is `null` , means the cache does not contain this node, return `-1` to stop the execution of this function.
- Otherwise, execute `this.list.remove(node)` to remove the `node` from `list` , and place it to the head of `list` by `this.list.push_front(node)` . Now, this `node` is considered to be the recently usage node.
- Return the `val` of the node’s value.

```tsx
get(key: number): number {
    const node: DoublyLinkedNode | undefined = this.keys.get(key);

    if (node === undefined) {
        return -1;
    }

    this.list.remove(node);
    this.list.push_front(node);

    return node.value.val;
}
```

**`put(key, value)` :**

- If `this.keys.has(key)` is `true` , indicates that the input `[key, value]` has already contained,
    - Get this `node` from `keys` by `this.keys.get(key)` .
    - Update `node.value.val` to the new `value` .
    - Execute `this.list.remove(node)` to remove the `node` from `list` , and place it to the head of `list` by `this.list.push_front(node)` .
    - The function has been executed completely, `return` for stopping.
- Otherwise,
    - Create a new node `newNode` .
    - Set this new node to the `keys` .
    - Place it to the head of the `list` .
- Check the capacity of the cache, if it has exceeded the `capacity` ,
    - Get the `lastNode` by `this.list.lastNode` .
    - Remove it from the `keys` and delete it from the `list` .

```tsx
put(key: number, value: number): void {
    if (this.keys.has(key)) {
        const node: DoublyLinkedNode = this.keys.get(key)!;

        node.value.val = value;
        
        this.list.remove(node);
        this.list.push_front(node);

        return;
    } else {
        const newNode: DoublyLinkedNode = new DoublyLinkedNode({ key: key, val: value });

        this.keys.set(key, newNode);
        this.list.push_front(newNode);
    }

    if (this.list.size > this.capacity) {
        const lastNode: DoublyLinkedNode = this.list.lastNode!;

        this.keys.delete(lastNode.value.key);
        this.list.remove(lastNode);
    }
}
```

## 📊Complexity

- **Time complexity:** $O(1)$
- **Space complexity:** $O(Capacity)$

## 🧑🏻‍💻Code

```tsx
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

    remove(node: DListNode): void {
        if (this.size === 0) {
            return;
        }

        this.size--;

        if (this.size === 0) {
            node.next = null;
            node.prev = null;
            this.first = null;
            this.last = null;

            return;
        }

        if (this.first === node) {
            this.first = node.next;
            node.next.prev = null;
            node.next = null;

            return;
        }

        if (this.last === node) {
            this.last = node.prev;
            node.prev.next = null;
            node.prev = null;

            return;
        }

        node.prev!.next = node.next;
        node.next!.prev = node.prev;
        node.next = null;
        node.prev = null;
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
            const newNode: DoublyLinkedNode = new DoublyLinkedNode({ key: key, val: value });

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
```

## 📋Approach Two

This Approach Two substitutes `Map` to the combination of map and doubly-linked list, but its principle is similar to the Approach One, and will not be described in detail here.

## 📊Complexity

- **Time complexity:** $O(1)$
- **Space complexity:** $O(Capacity)$

## 🧑🏻‍💻Code

```tsx
class LRUCache {
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
```

## 🔖Reference

1. [https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU)
2. [https://halfrost.com/lru_lfu_interview/](https://halfrost.com/lru_lfu_interview/)
3. [https://leetcode.com/problems/lru-cache/solutions/1770891/typescript-simple-solution-with-o-1-get-and-put](https://leetcode.com/problems/lru-cache/solutions/1770891/typescript-simple-solution-with-o-1-get-and-put)