import { mockKeys } from '../keys';

describe('Array.prototype.keys', () => {
    Array.prototype.mockKeys = mockKeys;

    /**
     * Unlike Object.keys(), which only includes keys that actually exist in the array,
     * the keys() iterator doesn't ignore holes representing missing properties.
     */
    test('Using keys() on sparse arrays', () => {
        const arr = ['a', , 'c'];
        const sparseKeys = Object.keys(arr);
        const denseKeys = [...arr.mockKeys()];

        expect(sparseKeys).toEqual(['0', '2']);
        expect(denseKeys).toEqual([0, 1, 2]);
    });

    /**
     * The keys() method reads the length property of this and then yields all integer indices
     * between 0 and length - 1. No index access actually happens.
     */
    test('Calling keys() on non-array objects', () => {
        const arrayLike = {
            length: 3
        };
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        for (const entry of Array.prototype.mockKeys.call(arrayLike)) {
            console.log(entry);
        }

        expect(consoleSpy).toHaveBeenCalledWith(0);
        expect(consoleSpy).toHaveBeenCalledWith(1);
        expect(consoleSpy).toHaveBeenCalledWith(2);
    });
});
