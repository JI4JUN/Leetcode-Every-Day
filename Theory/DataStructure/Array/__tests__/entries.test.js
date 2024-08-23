import { mockEntries } from 'Array/entries';

describe('Array.prototype.entries', () => {
    Array.prototype.mockEntries = mockEntries;

    test('Iterating with index and element', () => {
        const a = ['a', 'b', 'c'];
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        for (const [index, element] of a.mockEntries()) {
            console.log(index, element);
        }

        expect(consoleSpy).toHaveBeenCalledWith(0, 'a');
        expect(consoleSpy).toHaveBeenCalledWith(1, 'b');
        expect(consoleSpy).toHaveBeenCalledWith(2, 'c');
    });

    test('Using a for...of loop', () => {
        const array = ['a', 'b', 'c'];
        const arrayEntries = array.mockEntries();
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        for (const element of arrayEntries) {
            console.log(element);
        }

        expect(consoleSpy).toHaveBeenCalledWith([0, 'a']);
        expect(consoleSpy).toHaveBeenCalledWith([1, 'b']);
        expect(consoleSpy).toHaveBeenCalledWith([2, 'c']);
    });

    /**
     * entries() will visit empty slots as if they are undefined.
     */
    test('Iterating sparse arrays', () => {
        for (const element of [, 'a'].mockEntries()) {
            console.log(element);
        }

        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        expect(consoleSpy).toHaveBeenCalledWith([0, undefined]);
        expect(consoleSpy).toHaveBeenCalledWith([1, 'a']);
    });

    /**
     * The entries() method reads the length property of this and then accesses each property whose
     * key is a nonnegative integer less than length.
     */
    test('Calling entries() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 'a',
            1: 'b',
            2: 'c',
            3: 'd'
        };

        for (const entry of Array.prototype.mockEntries.call(arrayLike)) {
            console.log(entry);
        }

        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        expect(consoleSpy).toHaveBeenCalledWith([0, 'a']);
        expect(consoleSpy).toHaveBeenCalledWith([1, 'b']);
        expect(consoleSpy).toHaveBeenCalledWith([2, 'c']);
    });
});
