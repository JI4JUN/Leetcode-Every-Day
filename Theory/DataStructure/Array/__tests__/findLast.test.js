import { tinyFindLast } from '../findLast';

describe('Array.prototype.findLast', () => {
    Array.prototype.tinyFindLast = tinyFindLast;

    /**
     * This example shows how you might create a test based on the properties of array elements.
     */
    test('Find last object in an array matching on element properties', () => {
        const inventory = [
            { name: 'apples', quantity: 2 },
            { name: 'bananas', quantity: 0 },
            { name: 'fish', quantity: 1 },
            { name: 'cherries', quantity: 5 }
        ];

        function isNotEnough(item) {
            return item.quantity < 2;
        }

        expect(inventory.tinyFindLast(isNotEnough)).toEqual({
            name: 'fish',
            quantity: 1
        });
    });

    /**
     * The previous example might be written using an arrow function and object destructuring.
     */
    test('Using arrow function and destructuring', () => {
        const inventory = [
            { name: 'apples', quantity: 2 },
            { name: 'bananas', quantity: 0 },
            { name: 'fish', quantity: 1 },
            { name: 'cherries', quantity: 5 }
        ];

        const result = inventory.tinyFindLast(({ quantity }) => quantity < 2);

        expect(result).toEqual({
            name: 'fish',
            quantity: 1
        });
    });

    /**
     * The following example returns the last element in the array that is a prime number,
     * or undefined if there is no prime number.
     */
    test('Find the last prime number in an array', () => {
        function isPrime(element) {
            if (element % 2 === 0 || element < 2) {
                return false;
            }

            for (let factor = 3; factor <= Math.sqrt(element); factor += 2) {
                if (element % factor === 0) {
                    return false;
                }
            }

            return true;
        }

        expect([4, 6, 8, 12].tinyFindLast(isPrime)).toBeUndefined();
        expect([4, 5, 7, 8, 9, 11, 12].tinyFindLast(isPrime)).toBe(11);
    });

    /**
     * The following example first uses filter() to extract the positive values and then
     * uses findLast() to find the last element that is less than its neighbors.
     */
    test('Using the third argument of callbackFn', () => {
        const numbers = [3, -1, 1, 4, 1, 5, 9, 2, 6];
        const lastTrough = numbers
            .filter((num) => num > 0)
            .tinyFindLast((num, idx, arr) => {
                if (idx > 0 && num >= arr[idx - 1]) {
                    return false;
                }

                if (idx < arr.length - 1 && num >= arr[idx + 1]) {
                    return false;
                }

                return true;
            });

        expect(lastTrough).toBe(2);
    });

    /**
     * Empty slots in sparse arrays are visited, and are treated the same as undefined.
     */
    test('Using findLast() on sparse arrays', () => {
        const array1 = [0, 1, , , , 5, 6];
        const visitedIndexes1 = [];
        const visitedValues1 = [];

        array1.tinyFindLast((value, index) => {
            visitedIndexes1.push(index);
            visitedValues1.push(value);
        });

        expect(visitedIndexes1).toEqual([6, 5, 4, 3, 2, 1, 0]);
        expect(visitedValues1).toEqual([
            6,
            5,
            undefined,
            undefined,
            undefined,
            1,
            0
        ]);

        const array2 = [0, 1, , , , 5, 6];
        const visitedIndexes2 = [];
        const visitedValues2 = [];

        array2.tinyFindLast((value, index) => {
            if (index === 6) {
                delete array2[5];
            }

            visitedIndexes2.push(index);
            visitedValues2.push(value);
        });

        expect(visitedIndexes2).toEqual([6, 5, 4, 3, 2, 1, 0]);
        expect(visitedValues2).toEqual([
            6,
            undefined,
            undefined,
            undefined,
            undefined,
            1,
            0
        ]);
    });

    /**
     * The findLast() method reads the length property of this and then accesses each property whose
     * key is a nonnegative integer less than length.
     */
    test('Calling findLast() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 2,
            1: 7.3,
            2: 4,
            3: 3
        };

        expect(
            Array.prototype.tinyFindLast.call(arrayLike, (x) =>
                Number.isInteger(x)
            )
        ).toBe(4);
    });
});
