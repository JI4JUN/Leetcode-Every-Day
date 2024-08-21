import { tinyWith } from 'Array/with';

describe('Array.prototype.with', () => {
    Array.prototype.tinyWith = tinyWith;

    test('Creating a new array with a single element changed', () => {
        const arr = [1, 2, 3, 4, 5];

        expect(arr.tinyWith(2, 6)).toEqual([1, 2, 6, 4, 5]);
        expect(arr).toEqual([1, 2, 3, 4, 5]);
    });

    /**
     * With the with() method, you can update a single element in an array and then apply other array methods.
     */
    test('Chaining array methods', () => {
        const arr = [1, 2, 3, 4, 5];

        expect(arr.tinyWith(2, 6).map((x) => x ** 2)).toEqual([
            1, 4, 36, 16, 25
        ]);
    });

    /**
     * The with() method always creates a dense array.
     */
    test('Using with() on sparse arrays', () => {
        const arr = [1, , 3, 4, , 6];

        expect(arr.tinyWith(0, 2)).toEqual([2, undefined, 3, 4, undefined, 6]);
    });

    /**
     * The with() method creates and returns a new array. It reads the length property of this and then accesses
     * each property whose key is a nonnegative integer less than length. As each property of this is accessed,
     * the array element having an index equal to the key of the property is set to the value of the property.
     * Finally, the array value at index is set to value.
     */
    test('Calling with() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            unrelated: 'foo',
            0: 5,
            2: 4,
            3: 3
        };

        expect(Array.prototype.tinyWith.call(arrayLike, 0, 1));
    });
});
