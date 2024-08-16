import { tinyLastIndexOf } from '../lastIndexOf';
import { tinyPush } from '../push';

describe('Array.prototype.lastIndexOf', () => {
    Array.prototype.tinyLastIndexOf = tinyLastIndexOf;
    Array.prototype.tinyPush = tinyPush;

    /**
     * The following example uses lastIndexOf() to locate values in an array.
     */
    test('Using lastIndexOf()', () => {
        const numbers = [2, 5, 9, 2];

        expect(numbers.tinyLastIndexOf(2)).toBe(3);
        expect(numbers.tinyLastIndexOf(7)).toBe(-1);
        expect(numbers.tinyLastIndexOf(2, 3)).toBe(3);
        expect(numbers.tinyLastIndexOf(2, 2)).toBe(0);
        expect(numbers.tinyLastIndexOf(2, -2)).toBe(0);
        expect(numbers.tinyLastIndexOf(2, -1)).toBe(3);

        const array = [NaN];

        expect(array.tinyLastIndexOf(NaN)).toBe(-1);
    });

    /**
     * The following example uses lastIndexOf to find all the indices of an element
     * in a given array, using push() to add them to another array as they are found.
     */
    test('Finding all the occurrences of an element', () => {
        const indices = [];
        const array = ['a', 'b', 'a', 'c', 'a', 'd'];
        const element = 'a';

        let idx = array.tinyLastIndexOf(element);

        while (idx !== -1) {
            indices.tinyPush(idx);
            idx = idx > 0 ? array.tinyLastIndexOf(element, idx - 1) : -1;
        }
    });

    /**
     * You cannot use lastIndexOf() to search for empty slots in sparse arrays.
     */
    test('Using lastIndexOf() on sparse arrays', () => {
        expect([1, , 3].tinyLastIndexOf(undefined)).toBe(-1);
    });

    /**
     * The lastIndexOf() method reads the length property of this and then accesses
     * each property whose key is a nonnegative integer less than length.
     */
    test('Calling lastIndexOf() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 2,
            1: 3,
            2: 2,
            3: 5
        };

        expect(Array.prototype.tinyLastIndexOf.call(arrayLike, 2)).toBe(2);
        expect(Array.prototype.tinyLastIndexOf.call(arrayLike, 5)).toBe(-1);
    });
});
