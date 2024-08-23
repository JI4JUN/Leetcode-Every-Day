import { mockReverse } from 'Array/reverse';

describe('Array.prototype.reverse', () => {
    Array.prototype.mockReverse = mockReverse;

    /**
     * The following example creates an array items, containing three elements, then reverses the array.
     * The call to reverse() returns a reference to the reversed array items.
     */
    test('Reversing the elements in an array', () => {
        const items = [1, 2, 3];

        items.mockReverse();

        expect(items).toEqual([3, 2, 1]);
    });

    /**
     * The reverse() method returns reference to the original array, so mutating the returned array will
     * mutate the original array as well.
     */
    test('The reverse() method returns the reference to the same array', () => {
        const numbers = [3, 2, 4, 1, 5];
        const reversed = numbers.mockReverse();

        reversed[0] = 5;

        expect(numbers[0]).toBe(5);
    });

    /**
     * Sparse arrays remain sparse after calling reverse(). Empty slots are copied over to their respective
     * new indices as empty slots.
     */
    test('Using reverse() on sparse arrays', () => {
        expect([1, , 3].mockReverse()).toEqual([3, , 1]);
        expect([1, , 3, 4].mockReverse()).toEqual([4, 3, , 1]);
    });

    /**
     * The reverse() method reads the length property of this. It then visits each property having an integer key
     * between 0 and length / 2, and swaps the two corresponding indices on both ends, deleting any destination
     * property for which the source property did not exist.
     */
    test('Calling reverse() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            unrelated: 'foo',
            2: 4,
            3: 33
        };

        expect(Array.prototype.mockReverse.call(arrayLike)).toEqual({
            0: 4,
            3: 33,
            length: 3,
            unrelated: 'foo'
        });
    });
});
