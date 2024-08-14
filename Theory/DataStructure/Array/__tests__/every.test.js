import { tinyEvery } from '../every';
import { tinyFilter } from '../filter';

describe('Array.prototype.every', () => {
    Array.prototype.tinyEvery = tinyEvery;
    Array.prototype.tinyFilter = tinyFilter;

    /**
     * The following example tests whether all elements in the array are 10 or bigger.
     */
    test('Testing size of all array elements', () => {
        function isBigEnough(element, _index, _array) {
            return element >= 10;
        }

        expect([12, 5, 8, 130, 44].tinyEvery(isBigEnough)).toBeFalsy();
        expect([12, 54, 18, 130, 44].tinyEvery(isBigEnough)).toBeTruthy();
    });

    /**
     * The following example first uses filter() to extract the positive values and
     * then uses every() to check whether the array is strictly increasing.
     */
    test('Using the third argument of callbackfn', () => {
        const numbers = [-2, 4, -8, 16, -32];
        const isIncreasing = numbers
            .tinyFilter((num) => num > 0)
            .tinyEvery((num, idx, arr) => {
                if (idx === 0) {
                    return true;
                }

                return num > arr[idx - 1];
            });

        expect(isIncreasing).toBeTruthy();
    });

    /**
     * every() will not run its predicate on empty slots.
     */
    test('Using every() on sparse arrays', () => {
        expect([1, , 3].tinyEvery((x) => x !== undefined)).toBeTruthy();
        expect([2, , 2].tinyEvery((x) => x === 2)).toBeTruthy();
    });

    /**
     * The every() method reads the length property of this and then accesses each
     * propertywith a nonnegative integer key less than length until they all have
     * been accessed or callbackFn returns false.
     */
    test('Calling every() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 'a',
            1: 'b',
            2: 'c',
            3: 345
        };

        expect(
            Array.prototype.tinyEvery.call(
                arrayLike,
                (x) => typeof x === 'string'
            )
        ).toBeTruthy();
    });
});
