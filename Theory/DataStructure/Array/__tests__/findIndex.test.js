import { tinyFindIndex } from '../index';

describe('Array.prototype.findIndex', () => {
    Array.prototype.tinyFindIndex = tinyFindIndex;

    /**
     * The following example returns the index of the first element in the array that
     * is a prime number, or -1 if there is no prime number.
     */
    test('Find the index of a prime number in an array', () => {
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

        expect([4, 6, 8, 9, 12].tinyFindIndex(isPrime)).toBe(-1);
        expect([4, 6, 7, 9, 12].tinyFindIndex(isPrime)).toBe(2);
    });

    /**
     * The following example first uses filter() to extract the positive values and
     * then uses findIndex() to find the first element that is less than its neighbors.
     */
    test('Using the third argument of callbackFn', () => {
        const numbers = [3, -1, 1, 4, 1, 5, 9, 2, 6];
        const firstTrough = numbers
            .filter((num) => num > 0)
            .findIndex((num, idx, arr) => {
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
     * You can search for undefined in a sparse array and get the index of an empty slot.
     */
    test('Using findIndex() on sparse arrays', () => {
        expect([1, , 3].findIndex((x) => x === undefined)).toBe(1);
    });

    /**
     * The findIndex() method reads the length property of this and then accesses each property whose
     * key is a nonnegative integer less than length.
     */
    test('Calling findIndex() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            '-1': 0.1,
            0: 2,
            1: 7.3,
            2: 4
        };

        expect(
            Array.prototype.findIndex.call(
                arrayLike,
                (x) => !Number.isInteger(x)
            )
        ).toBe(1);
    });
});
