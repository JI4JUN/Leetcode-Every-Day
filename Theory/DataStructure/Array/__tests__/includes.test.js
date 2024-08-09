import { tinyIncludes } from '../includes';

describe('Array.prototype.includes', () => {
    Array.prototype.tinyIncludes = tinyIncludes;

    test('Using includes()', () => {
        expect([1, 2, 3].tinyIncludes(2)).toBeTruthy();
        expect([1, 2, 3].tinyIncludes(4)).toBeFalsy();
        expect([1, 2, 3].tinyIncludes(3, 3)).toBeFalsy();
        expect([1, 2, 3].tinyIncludes(3, -1)).toBeTruthy();
        expect([1, 2, NaN].tinyIncludes(NaN)).toBeTruthy();
        expect(['1', '2', '3'].tinyIncludes(3)).toBeFalsy();
    });

    /**
     * If fromIndex is greater than or equal to the length of the array, false is returned.
     * The array will not be searched.
     */
    test('fromIndex is greater than or equal to the array length', () => {
        const arr = ['a', 'b', 'c'];

        expect(arr.tinyIncludes('c', 3)).toBeFalsy();
        expect(arr.tinyIncludes('c', 100)).toBeFalsy();
    });

    /**
     * If fromIndex is negative, the computed index is calculated to be used as a position
     * in the array at which to begin searching for searchElement. If the computed index is
     * less than or equal to 0, the entire array will be searched.
     */
    test('Computed index is less than 0', () => {
        const arr = ['a', 'b', 'c'];

        expect(arr.tinyIncludes('a', -100)).toBeTruthy();
        expect(arr.tinyIncludes('b', -100)).toBeTruthy();
        expect(arr.tinyIncludes('c', -100)).toBeTruthy();
        expect(arr.tinyIncludes('a', -2)).toBeFalsy();
    });

    /**
     * You can search for undefined in a sparse array and get true.
     */
    test('Using includes() on sparse arrays', () => {
        expect([1, , 3].tinyIncludes(undefined)).toBeTruthy();
    });

    /**
     * The includes() method reads the length property of this and then
     * accesses each property whose key is a nonnegative integer less than length.
     */
    test('Calling includes() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 2,
            1: 3,
            2: 4,
            3: 1
        };

        expect(Array.prototype.tinyIncludes.call(arrayLike, 2)).toBeTruthy();
        expect(Array.prototype.tinyIncludes.call(arrayLike, 1)).toBeFalsy();
    });
});
