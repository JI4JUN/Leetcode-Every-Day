import { mockToReversed } from 'Array/toReversed';

describe('Array.prototype.toReversed', () => {
    Array.prototype.mockToReversed = mockToReversed;

    /**
     * The following example creates an array items, containing three elements, then creates a new array
     * that's the reverse of items. The items array remains unchanged.
     */
    test('Reversing the elements in an array', () => {
        const items = [1, 2, 3];
        const reversedItems = items.mockToReversed();

        expect(reversedItems).toEqual([3, 2, 1]);
        expect(items).toEqual([1, 2, 3]);
    });

    /**
     * The return value of toReversed() is never sparse. Empty slots become undefined in the returned array.
     */
    test('Using toReversed() on sparse arrays', () => {
        expect([1, , 3].mockToReversed()).toEqual([3, undefined, 1]);
        expect([1, , 3, 4].mockToReversed()).toEqual([4, 3, undefined, 1]);
    });

    /**
     * The toReversed() method reads the length property of this. It then visits each property having an integer
     * key between length - 1 and 0 in descending order, adding the value of the current property to the end of
     * the array to be returned.
     */
    test('Calling toReversed() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            unrelated: 'foo',
            2: 4
        };

        expect(Array.prototype.mockToReversed.call(arrayLike)).toEqual([
            4,
            undefined,
            undefined
        ]);
    });
});
