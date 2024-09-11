/*
 * @lc app=leetcode id=155 lang=typescript
 *
 * [155] Min Stack
 */

// @lc code=start
// ======================== Approach 1 ======================== //
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
        if (this.queue.pop()! === this.minQueue.at(-1)!) {
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

// ======================== Approach 1 ======================== //
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
                const newMinNode: MinNode = new MinNode(val, 1);

                newMinNode.next = this.minNode;
                this.minNode = newMinNode;
            } else if (val === curMinVal) {
                ++this.minNode.freq;
            }
        } else {
            this.minNode = new MinNode(val, 1);
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

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

// @lc code=end
