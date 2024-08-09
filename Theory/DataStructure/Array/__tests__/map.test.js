import { tinyMap } from '../map';

describe('Array.prototype.map', () => {
    Array.prototype.tinyMap = tinyMap;

    /**
     * The following code takes an array of numbers and creates a new array containing
     * the square roots of the numbers in the first array.
     */
    test('Mapping an array of numbers to an array of square roots', () => {
        const numbers = [1, 4, 9];
        const roots = numbers.tinyMap((num) => Math.sqrt(num));

        expect(roots).toStrictEqual([1, 2, 3]);
        expect(numbers).toStrictEqual([1, 4, 9]);
    });

    /**
     * The following code takes an array of objects and creates a new array containing
     * the newly reformatted objects.
     */
    test('Using map to reformat objects in an array', () => {
        const kvArray = [
            { key: 1, value: 10 },
            { key: 2, value: 20 },
            { key: 3, value: 30 }
        ];

        const reformattedArray = kvArray.tinyMap(({ key, value }) => ({
            [key]: value
        }));

        expect(reformattedArray).toStrictEqual([
            { 1: 10 },
            { 2: 20 },
            { 3: 30 }
        ]);
        expect(kvArray).toStrictEqual([
            { key: 1, value: 10 },
            { key: 2, value: 20 },
            { key: 3, value: 30 }
        ]);
    });

    test('Using parseInt() with map()', () => {
        expect(['1', '2', '3'].tinyMap(parseInt)).toStrictEqual([1, NaN, NaN]);
        expect(
            ['1', '2', '3'].tinyMap((str) => parseInt(str, 10))
        ).toStrictEqual([1, 2, 3]);
    });

    /**
     * When undefined or nothing is returned, the resulting array contains undefined.
     */
    test('Mapped array contains undefined', () => {
        const numbers = [1, 2, 3, 4];
        const filteredNumbers = numbers.tinyMap((num, index) => {
            if (index < 3) {
                return num;
            }
        });

        expect(filteredNumbers).toStrictEqual([1, 2, 3, undefined]);
        expect(numbers).toStrictEqual([1, 2, 3, 4]);
    });

    /**
     * The callback can have side effects.
     */
    test('Side-effectful mapping', () => {
        const cart = [5, 15, 25];

        let total = 0;

        const withTax = cart.tinyMap((cost) => {
            total += cost;
            return cost * 1.2;
        });

        expect(withTax).toStrictEqual([6, 18, 30]);
        expect(total).toBe(45);
    });

    /**
     * The following example first uses filter() to extract the positive values and then
     * uses map() to create a new array where each element is the average of its neighbors
     * and itself.
     */
    test('Using the third argument of callbackFn', () => {
        const numbers = [3, -1, 1, 4, 1, 5, 9, 2, 6];
        const averaged = numbers
            .filter((num) => num > 0)
            .tinyMap((num, idx, arr) => {
                const prev = arr[idx - 1];
                const next = arr[idx + 1];

                let count = 1;
                let total = num;

                if (prev !== undefined) {
                    count++;
                    total += prev;
                }
                if (next !== undefined) {
                    count++;
                    total += next;
                }

                const average = total / count;

                return Math.round(average * 100) / 100;
            });

        expect(averaged).toStrictEqual([2, 2.67, 2, 3.33, 5, 5.33, 5.67, 4]);
    });

    /**
     * A sparse array remains sparse after map(). The indices of empty slots are still empty
     * in the returned array, and the callback function won't be called on them.
     */
    test('Using map() on sparse arrays', () => {
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});
        const mapResult = [1, , 3].tinyMap((x, index) => {
            console.log(`Visit ${index}`);

            return x * 2;
        });

        expect(consoleSpy).toHaveBeenCalledWith('Visit 0');
        expect(consoleSpy).toHaveBeenCalledWith('Visit 2');
        expect(mapResult).toStrictEqual([2, , 6]);
    });

    /**
     * The map() method reads the length property of this and then accesses each property whose
     * key is a nonnegative integer less than length.
     */
    test('Calling map() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 2,
            1: 3,
            2: 4,
            3: 5
        };

        expect(
            Array.prototype.tinyMap.call(arrayLike, (x) => x ** 2)
        ).toStrictEqual([4, 9, 16]);
    });
});
