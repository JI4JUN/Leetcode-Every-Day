/*
 * @lc app=leetcode id=380 lang=typescript
 *
 * [380] Insert Delete GetRandom O(1)
 */

// @lc code=start
class RandomizedSet {
    private list: number[];
    private map: Map<number, number>;

    constructor() {
        this.list = new Array();
        this.map = new Map();
    }

    insert(val: number): boolean {
        if (this.map.has(val)) {
            return false;
        }

        this.list.push(val);
        this.map.set(val, this.list.length - 1);

        return true;
    }

    remove(val: number): boolean {
        if (!this.map.has(val)) {
            return false;
        }

        const index: number = this.map.get(val)!;

        this.list[index] = this.list[this.list.length - 1];
        this.map.set(this.list[index], index);
        this.map.delete(val);
        this.list.pop();

        return true;
    }

    getRandom(): number {
        return this.list[Math.floor(Math.random() * this.list.length)];
    }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
// @lc code=end
