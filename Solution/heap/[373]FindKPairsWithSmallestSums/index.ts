/*
 * @lc app=leetcode id=373 lang=typescript
 *
 * [373] Find K Pairs with Smallest Sums
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function kSmallestPairs1(
    nums1: number[],
    nums2: number[],
    k: number
): number[][] {
    interface INode {
        sum: number;
        num1: number;
        num2: number;
        index2: number;
    }

    const result: number[][] = Array.from({ length: k }, () => []);
    const len: number = result.length;
    const minQueue = new MinPriorityQueue({
        priority: (node: INode) => node.sum
    });

    for (let i = 0; i < Math.min(nums1.length, k); ++i) {
        minQueue.enqueue({
            sum: nums1[i] + nums2[0],
            num1: nums1[i],
            num2: nums2[0],
            index2: 0
        });
    }

    while (k > 0 && !minQueue.isEmpty()) {
        const { num1, num2, index2 } = minQueue.dequeue().element;

        result[len - k] = [num1, num2];

        const nextIndex2: number = index2 + 1;

        if (nextIndex2 < nums2.length) {
            minQueue.enqueue({
                sum: num1 + nums2[nextIndex2],
                num1,
                num2: nums2[nextIndex2],
                index2: nextIndex2
            });
        }

        --k;
    }

    return result;
}

// ======================== Approach 2 ======================== //
interface INode {
    sum: number;
    num1: number;
    num2: number;
    index2: number;
}

class MinHeap {
    private nodes: INode[];

    constructor() {
        this.nodes = [];
    }

    private swap(i: number, j: number): void {
        [this.nodes[i], this.nodes[j]] = [this.nodes[j], this.nodes[i]];
    }

    private shouldSwap(parentIndex: number, childIndex: number): boolean {
        if (parentIndex < 0 || parentIndex >= this.size()) {
            return false;
        }
        if (childIndex < 0 || childIndex >= this.size()) {
            return false;
        }

        return this.nodes[parentIndex].sum > this.nodes[childIndex].sum;
    }

    private heapifyUp(startIndex: number): void {
        let childIndex: number = startIndex;
        let parentIndex: number = (childIndex - 1) >> 1;

        while (this.shouldSwap(parentIndex, childIndex)) {
            this.swap(parentIndex, childIndex);

            childIndex = parentIndex;
            parentIndex = (childIndex - 1) >> 1;
        }
    }

    private heapifyDown(startIndex: number): void {
        const length: number = this.size();
        const leftChildIndex: number = 2 * startIndex + 1;
        const rightChildIndex: number = 2 * startIndex + 2;
        let smallest: number = startIndex;

        if (
            leftChildIndex < length &&
            this.nodes[leftChildIndex].sum < this.nodes[smallest].sum
        ) {
            smallest = leftChildIndex;
        }
        if (
            rightChildIndex < length &&
            this.nodes[rightChildIndex].sum < this.nodes[smallest].sum
        ) {
            smallest = rightChildIndex;
        }
        if (smallest !== startIndex) {
            this.swap(startIndex, smallest);
            this.heapifyDown(smallest);
        }
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    size(): number {
        return this.nodes.length;
    }

    insert(value: INode): void {
        this.nodes.push(value);
        this.heapifyUp(this.size() - 1);
    }

    pop(): INode {
        if (this.size() === 1) {
            return this.nodes.pop()!;
        }

        const minValue: INode = this.nodes[0];
        this.nodes[0] = this.nodes.pop()!;

        this.heapifyDown(0);

        return minValue;
    }
}

function kSmallestPairs(
    nums1: number[],
    nums2: number[],
    k: number
): number[][] {
    const result: number[][] = Array.from({ length: k }, () => []);
    const len: number = result.length;
    const minHeap = new MinHeap();

    for (let i = 0; i < Math.min(nums1.length, k); ++i) {
        minHeap.insert({
            sum: nums1[i] + nums2[0],
            num1: nums1[i],
            num2: nums2[0],
            index2: 0
        });
    }

    while (k > 0 && !minHeap.isEmpty()) {
        const { num1, num2, index2 } = minHeap.pop();

        result[len - k] = [num1, num2];

        const nextIndex2: number = index2 + 1;

        if (nextIndex2 < nums2.length) {
            minHeap.insert({
                sum: num1 + nums2[nextIndex2],
                num1,
                num2: nums2[nextIndex2],
                index2: nextIndex2
            });
        }

        --k;
    }

    return result;
}
// @lc code=end
