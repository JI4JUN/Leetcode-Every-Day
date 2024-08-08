import { tinyCopyWithin } from '../index';

describe('Array.prototype.copyWithin', () => {
    Array.prototype.tinyCopyWithin = tinyCopyWithin;

    test('Using copyWithin()', () => {
        expect([1, 2, 3, 4, 5].tinyCopyWithin(0, 3)).toEqual([4, 5, 3, 4, 5]);
        expect([1, 2, 3, 4, 5].tinyCopyWithin(0, 3, 4)).toEqual([
            4, 2, 3, 4, 5
        ]);
        expect([1, 2, 3, 4, 5].tinyCopyWithin(-2, -3, -1)).toEqual([
            1, 2, 3, 3, 4
        ]);
    });

    /**
     * copyWithin() will propagate empty slots.
     */
    test('Using copyWithin() on sparse arrays', () => {
        expect([1, , 3].tinyCopyWithin(2, 1, 2)).toEqual([1, , ,]);
    });

    /**
     * The copyWithin() method reads the length property of this and then manipulates
     * the integer indices involved.
     */
    test('Calling copyWithin() on non-array objects', () => {
        const arrayLike = {
            length: 5,
            3: 1
        };

        expect(Array.prototype.tinyCopyWithin.call(arrayLike, 0, 3)).toEqual({
            0: 1,
            3: 1,
            length: 5
        });
        expect(Array.prototype.tinyCopyWithin.call(arrayLike, 3, 1)).toEqual({
            0: 1,
            length: 5
        });
    });
});
