import { tinyUnshift } from 'Array/unshift';

describe('Array.prototype.unshift', () => {
    Array.prototype.tinyUnshift = tinyUnshift;

    test('Using unshift()', () => {
        const arr = [1, 2];

        arr.tinyUnshift(0);
        expect(arr).toEqual([0, 1, 2]);

        arr.tinyUnshift(-2, -1);
        expect(arr).toEqual([-2, -1, 0, 1, 2]);

        arr.tinyUnshift([-4, -3]);
        expect(arr).toEqual([[-4, -3], -2, -1, 0, 1, 2]);

        arr.tinyUnshift([-7, -6], [-5]);
        expect(arr).toEqual([[-7, -6], [-5], [-4, -3], -2, -1, 0, 1, 2]);
    });

    /**
     * The unshift() method reads the length property of this. It shifts all indices in the range 0 to length - 1
     * right by the number of arguments (incrementing their values by this number). Then, it sets each index starting
     * at 0 with the arguments passed to unshift(). Finally, it sets the length to the previous length plus the
     * number of prepended elements.
     */
    test('Calling unshift() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            unrelated: 'foo',
            2: 4
        };

        Array.prototype.tinyUnshift.call(arrayLike, 1, 2);
        expect(arrayLike).toEqual({
            0: 1,
            1: 2,
            4: 4,
            length: 5,
            unrelated: 'foo'
        });

        const plainObj = {};

        Array.prototype.tinyUnshift.call(plainObj, 1, 2);
        expect(plainObj).toEqual({ 0: 1, 1: 2, length: 2 });
    });
});
