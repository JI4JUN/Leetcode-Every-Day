import { tinyFind, tinyFilter } from '../index';

describe('Array.prototype.findLastIndex', () => {
    Array.prototype.tinyFind = tinyFind;
    Array.prototype.tinyFilter = tinyFilter;

    test('Find an object in an array by one of its properties', () => {
        const inventory = [
            { name: 'apples', quantity: 2 },
            { name: 'bananas', quantity: 0 },
            { name: 'cherries', quantity: 5 }
        ];

        function isCherries(fruit) {
            return fruit.name === 'cherries';
        }

        expect(inventory.tinyFind(isCherries)).toEqual({
            name: 'cherries',
            quantity: 5
        });
    });

    test('Using arrow function and destructuring', () => {
        const inventory = [
            { name: 'apples', quantity: 2 },
            { name: 'bananas', quantity: 0 },
            { name: 'cherries', quantity: 5 }
        ];

        const result = inventory.tinyFind(({ name }) => name === 'cherries');

        expect(result).toEqual({ name: 'cherries', quantity: 5 });
    });

    /**
     * The following example finds an element in the array that is a prime
     * number (or returns undefined if there is no prime number):
     */
    test('Find a prime number in an array', () => {
        function isPrime(element) {
            let start = 2;

            while (start <= Math.sqrt(element)) {
                if (element % start++ < 1) {
                    return false;
                }
            }

            return element > 1;
        }

        expect([4, 6, 8, 12].tinyFind(isPrime)).toBeUndefined();
        expect([4, 5, 8, 12].tinyFind(isPrime)).toBe(5);
    });

    /**
     * The following example first uses filter() to extract the positive values and then
     * uses find() to find the first element that is less than its neighbors.
     */
    test('Using the third argument of callbackFn', () => {
        const numbers = [3, -1, 1, 4, 1, 5, 9, 2, 6];
        const firstTrough = numbers
            .filter((num) => num > 0)
            .find((num, idx, arr) => {
                if (idx > 0 && num >= arr[idx - 1]) {
                    return false;
                }

                if (idx < arr.length - 1 && num >= arr[idx + 1]) {
                    return false;
                }

                return true;
            });

        expect(firstTrough).toBe(1);
    });

    /**
     * Empty slots in sparse arrays are visited, and are treated the same as undefined.
     */
    test('Using find() on sparse arrays', () => {
        const array1 = [0, 1, , , , 5, 6];
        const visitedIndexes1 = [];
        const visitedValues1 = [];

        array1.tinyFind((value, index) => {
            visitedIndexes1.push(index);
            visitedValues1.push(value);
        });

        expect(visitedIndexes1).toEqual([0, 1, 2, 3, 4, 5, 6]);
        expect(visitedValues1).toEqual([
            0,
            1,
            undefined,
            undefined,
            undefined,
            5,
            6
        ]);

        const array2 = [0, 1, , , , 5, 6];
        const visitedIndexes2 = [];
        const visitedValues2 = [];

        array2.tinyFind((value, index) => {
            if (index === 0) {
                delete array2[5];
            }

            visitedIndexes2.push(index);
            visitedValues2.push(value);
        });

        expect(visitedIndexes2).toEqual([0, 1, 2, 3, 4, 5, 6]);
        expect(visitedValues2).toEqual([
            0,
            1,
            undefined,
            undefined,
            undefined,
            undefined,
            6
        ]);
    });

    /**
     * The find() method reads the length property of this and then accesses each property whose
     * key is a nonnegative integer less than length.
     */
    test('Calling find() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            '-1': 0.1,
            0: 2,
            1: 7.3,
            2: 4
        };

        expect(
            Array.prototype.find.call(arrayLike, (x) => !Number.isInteger(x))
        ).toBe(7.3);
    });
});
