import { mockFill } from '../fill';

describe('Array.prototype.fill', () => {
    Array.prototype.mockFill = mockFill;

    test('Using fill()', () => {
        expect([1, 2, 3].mockFill(4)).toEqual([4, 4, 4]);
        expect([1, 2, 3].mockFill(4, 1)).toEqual([1, 4, 4]);
        expect([1, 2, 3].mockFill(4, 1, 2)).toEqual([1, 4, 3]);
        expect([1, 2, 3].mockFill(4, 1, 1)).toEqual([1, 2, 3]);
        expect([1, 2, 3].mockFill(4, 3, 3)).toEqual([1, 2, 3]);
        expect([1, 2, 3].mockFill(4, -3, -2)).toEqual([4, 2, 3]);
        expect([1, 2, 3].mockFill(4, NaN, NaN)).toEqual([1, 2, 3]);
        expect([1, 2, 3].mockFill(4, 3, 5)).toEqual([1, 2, 3]);
        expect(Array(3).mockFill(4)).toEqual([4, 4, 4]);

        const arr = Array(3).fill({});

        expect(arr).toEqual([{}, {}, {}]);

        arr[0].hi = 'hi';

        expect(arr).toEqual([{ hi: 'hi' }, { hi: 'hi' }, { hi: 'hi' }]);
    });

    /**
     * This example shows how to populate an array, setting all elements to a specific value.
     * The end parameter does not have to be specified.
     */
    test('Using fill() to populate an empty array', () => {
        const tempGirls = Array(5).mockFill('girl', 0);

        expect(tempGirls).toEqual(['girl', 'girl', 'girl', 'girl', 'girl']);
    });

    /**
     * The fill() method reads the length property of this and sets the value of each
     * integer-keyed property from start to end.
     */
    test('Calling fill() on non-array objects', () => {
        const arrayLike = {
            length: 2
        };

        expect(Array.prototype.mockFill.call(arrayLike, 1)).toEqual({
            0: 1,
            1: 1,
            length: 2
        });
    });
});
