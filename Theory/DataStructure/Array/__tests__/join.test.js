import { mockJoin } from '../join';

describe('Array.prototype.join', () => {
    Array.prototype.mockJoin = mockJoin;

    /**
     * The following example creates an array, a, with three elements,
     * then joins the array four times: using the default separator,
     * then a comma and a space, then a plus and an empty string.
     */
    test('Joining an array four different ways', () => {
        const a = ['Wind', 'Water', 'Fire'];

        expect(a.mockJoin()).toBe('Wind,Water,Fire');
        expect(a.mockJoin(', ')).toBe('Wind, Water, Fire');
        expect(a.mockJoin(' + ')).toBe('Wind + Water + Fire');
        expect(a.mockJoin('')).toBe('WindWaterFire');
    });

    /**
     * join() treats empty slots the same as undefined and produces an extra separator.
     */
    test('Using join() on sparse arrays', () => {
        expect([1, , 3].mockJoin()).toBe('1,,3');
        expect([1, undefined, 3].mockJoin()).toBe('1,,3');
    });

    /**
     * The join() method reads the length property of this and then accesses each property
     * whose key is a nonnegative integer less than length.
     */
    test('Calling join() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 2,
            1: 3,
            2: 4,
            3: 5
        };

        expect(Array.prototype.mockJoin.call(arrayLike)).toBe('2,3,4');
        expect(Array.prototype.mockJoin.call(arrayLike, '.')).toBe('2.3.4');
    });
});
