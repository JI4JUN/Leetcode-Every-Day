import { tinyFlat } from '../index';

describe('Array.prototype.flat', () => {
    Array.prototype.tinyFlat = tinyFlat;

    test('Flattening nested arrays', () => {
        const arr1 = [1, 2, [3, 4]];

        expect(arr1.tinyFlat()).toEqual([1, 2, 3, 4]);

        const arr2 = [1, 2, [3, 4, [5, 6]]];

        expect(arr2.tinyFlat()).toEqual([1, 2, 3, 4, [5, 6]]);

        const arr3 = [1, 2, [3, 4, [5, 6]]];

        expect(arr3.tinyFlat(2)).toEqual([1, 2, 3, 4, 5, 6]);

        const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];

        expect(arr4.tinyFlat(Infinity)).toEqual([
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ]);
    });

    /**
     * The flat() method removes empty slots in arrays.
     */
    test('Using flat() on sparse arrays', () => {
        const arr5 = [1, 2, , 4, 5];

        expect(arr5.tinyFlat()).toEqual([1, 2, 4, 5]);

        const array = [1, , 3, ['a', 'c']];

        expect(array.tinyFlat()).toEqual([1, 3, 'a', 'c']);

        const array2 = [1, , 3, ['a', , ['d', , 'e']]];

        expect(array2.tinyFlat()).toEqual([1, 3, 'a', ['d', , 'e']]);
        expect(array2.tinyFlat(2)).toEqual([1, 3, 'a', 'd', 'e']);
    });

    /**
     * The flat() method reads the length property of this and then accesses each property whose
     * key is a nonnegative integer less than length. If the element is not an array, it's directly
     * appended to the result. If the element is an array, it's flattened according to the depth
     * parameter.
     */
    test('Calling flat() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: [1, 2],
            1: { length: 2, 0: 3, 1: 4 },
            2: 5,
            3: 3
        };

        expect(Array.prototype.tinyFlat.call(arrayLike)).toEqual([
            1,
            2,
            { 0: 3, 1: 4, length: 2 },
            5
        ]);
    });
});
