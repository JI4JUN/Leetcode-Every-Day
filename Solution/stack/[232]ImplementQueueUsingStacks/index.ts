/*
 * @lc app=leetcode id=232 lang=typescript
 *
 * [232] Implement Queue using Stacks
 */

// @lc code=start
class MyQueue {
    private stackIn: number[];
    private stackOut: number[];

    constructor() {
        this.stackIn = [];
        this.stackOut = [];
    }

    push(x: number): void {
        this.stackIn.push(x);
    }

    pop(): number {
        if (this.stackOut.length === 0) {
            while (this.stackIn.length > 0) {
                this.stackOut.push(this.stackIn.pop()!);
            }
        }

        return this.stackOut.pop()!;
    }

    peek(): number {
        const temp: number = this.pop();

        this.stackOut.push(temp);

        return temp;
    }

    empty(): boolean {
        return this.stackIn.length === 0 && this.stackOut.length === 0;
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
// @lc code=end
