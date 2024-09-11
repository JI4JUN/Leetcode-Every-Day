# 155 Min Stack

Created: September 11, 2024 3:34 PM
Difficulty: Medium
Topics: Stack

## 📖Description

[Min Stack](https://leetcode.com/problems/min-stack/description/)

## 🤔Intuition

The most important thing to solve this problem is to track of the minimum element in the stack. Due to the `push(val)` and `pop()` operations will change the structure of the stack, if the current minimum element has been removed, we need to update the minimum element to the previous one.

## 📋Approach One

We can use an array `minQueue` to record every element that can be the minimum element in the stack.

### `push(val: number): void`

- Append the `val` to the `queue` .
- If the `minQueue` is empty or the parameter `val` is no greater than the current minimum element, means that `val` is the minimum element in the stack , append the `val` to the `minQueue` .

```tsx
push(val: number): void {
    this.queue.push(val);

    if (this.minQueue.length === 0 || val <= this.getMin()) {
        this.minQueue.push(val);
    }
}
```

### `pop(): void`

- Remove the element at the end of the `queue` .
- If this deleted element is equal to the current minimum element, remove the element at the end of the `minQueue` for updating the current minimum element to the previous one.

```tsx
pop(): void {
    if (this.queue.pop()! === this.getMin()) {
        this.minQueue.pop();
    }
}
```

### `top(): number`

- Just return the element at the end of the `queue` .

```tsx
top(): number {
    return this.queue.at(-1)!;
}
```

### `getMin(): number`

- Just return the element at the end of the `minQueue` which represents the current minimum element in the stack.

```tsx
getMin(): number {
    return this.minQueue.at(-1)!;
}
```

## 📊Complexity (For Each Function)

- **Time complexity:** $O(1)$
- **Space complexity:** $O(1)$

## 🧑🏻‍💻Code

```tsx
class MinStack1 {
    private queue: number[];
    private minQueue: number[];

    constructor() {
        this.queue = [];
        this.minQueue = [];
    }

    push(val: number): void {
        this.queue.push(val);

        if (this.minQueue.length === 0 || val <= this.getMin()) {
            this.minQueue.push(val);
        }
    }

    pop(): void {
        if (this.queue.pop()! === this.getMin()) {
            this.minQueue.pop();
        }
    }

    top(): number {
        return this.queue.at(-1)!;
    }

    getMin(): number {
        return this.minQueue.at(-1)!;
    }
}
```

## 📋Approach Two

Consider a case in which the parameter list waiting to be pushed onto the stack in a test case is `[0, -1, -1, -1, -1, ..., -1]` , in Approach One, we will get a `minQueue` which is `[-1, -1, -1, -1, ..., -1]` , which will result in unnecessary memory overhead. So, we can use a linked list to store each minimum element and their frequency.

```tsx
class MinNode {
    val: number;
    freq: number;
    next: MinNode | null;

    constructor(val?: number, freq?: number, next?: MinNode | null) {
        this.val = val ?? 0;
        this.freq = freq ?? 0;
        this.next = next ?? null;
    }
}
```

### `push(val: number): void`

- Append the `val` to the `queue` .
- If `minNode` is no `null` , means the stack has already recorded a minimum element.
    - Get this element `curMinVal` .
    - If `val` is less than `curMinVal` , means that the stack need to update the minimum element records.
        - Create a new `MinNode` constructed by `val` .
        - Set `newMinNode.next` to `minNode` .
        - Update `minNode` to `newMinNode` .
    - Else if `val` is equal to `curMinVal` , no update required.
        - Just update the frequency of `minNode` to `minNode.freq + 1` .
- Otherwise, record the first element as the current minimum element.

```tsx
push(val: number): void {
    this.queue.push(val);

    if (this.minNode !== null) {
        const curMinVal: number = this.getMin();

        if (val < curMinVal) {
            const newMinNode: MinNode = new MinNode(val);

            newMinNode.next = this.minNode;
            this.minNode = newMinNode;
        } else if (val === curMinVal) {
            ++this.minNode.freq;
        }
    } else {
        this.minNode = new MinNode(val);
    }
}
```

### `pop(): void`

- Remove the element at the end of the `queue` .
- If this deleted element is equal to the current minimum element.
    - Set `minNode.freq` to `minNode.freq - 1` .
    - If `minNode.freq` is equal 0, means that after the `pop()` operation, the stack no longer contains the element which is recorded as the minimum element after `pop()` operation.
        - Update `minNode` to `minNode.next` .

```tsx
pop(): void {
    if (this.queue.pop() === this.getMin()) {
        if (--this.minNode!.freq === 0) {
            this.minNode = this.minNode!.next;
        }
    }
}
```

### `top(): number`

- Just return the element at the end of the `queue` .

```tsx
top(): number {
    return this.queue.at(-1)!;
}
```

### `getMin(): number`

- Just return `minNode.val` .

```tsx
getMin(): number {
    return this.minNode!.val;
}
```

## 📊Complexity (For Each Function)

- **Time complexity:** $O(1)$
- **Space complexity:** $O(1)$

## 🧑🏻‍💻Code

```tsx
class MinNode {
    val: number;
    freq: number;
    next: MinNode | null;

    constructor(val?: number, freq?: number, next?: MinNode | null) {
        this.val = val ?? 0;
        this.freq = freq ?? 1;
        this.next = next ?? null;
    }
}

class MinStack {
    private queue: number[];
    private minNode: MinNode | null;

    constructor() {
        this.queue = [];
        this.minNode = null;
    }

    push(val: number): void {
        this.queue.push(val);

        if (this.minNode !== null) {
            const curMinVal: number = this.getMin();

            if (val < curMinVal) {
                const newMinNode: MinNode = new MinNode(val);

                newMinNode.next = this.minNode;
                this.minNode = newMinNode;
            } else if (val === curMinVal) {
                ++this.minNode.freq;
            }
        } else {
            this.minNode = new MinNode(val);
        }
    }

    pop(): void {
        if (this.queue.pop() === this.getMin()) {
            if (--this.minNode!.freq === 0) {
                this.minNode = this.minNode!.next;
            }
        }
    }

    top(): number {
        return this.queue.at(-1)!;
    }

    getMin(): number {
        return this.minNode!.val;
    }
}
```

## 🔖Reference

1. [https://leetcode.com/problems/min-stack/solutions/5737255/dont-make-copy-of-min-element-in-the-same-stack-dont-drain-the-memory](https://leetcode.com/problems/min-stack/solutions/5737255/dont-make-copy-of-min-element-in-the-same-stack-dont-drain-the-memory)