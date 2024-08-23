import { mockValues } from 'Array/values';

describe('Array.prototype.values', () => {
    Array.prototype.mockValues = mockValues;

    /**
     * Because values() returns an iterable iterator, you can use a for...of loop to iterate it.
     */
    test('Iteration using for...of loop', () => {
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});
        const arr = ['a', 'b', 'c', 'd', 'e'];
        const iterator = arr.mockValues();

        for (const letter of iterator) {
            console.log(letter);
        }

        expect(consoleSpy).toHaveBeenCalledWith('a');
        expect(consoleSpy).toHaveBeenCalledWith('b');
        expect(consoleSpy).toHaveBeenCalledWith('c');
        expect(consoleSpy).toHaveBeenCalledWith('d');
        expect(consoleSpy).toHaveBeenCalledWith('e');
    });

    /**
     * Because the return value is also an iterator, you can directly call its next() method.
     */
    test('Iteration using next()', () => {
        const arr = ['a', 'b', 'c', 'd', 'e'];
        const iterator = arr.mockValues();

        expect(iterator.next()).toEqual({ value: 'a', done: false });
        expect(iterator.next()).toEqual({ value: 'b', done: false });
        expect(iterator.next()).toEqual({ value: 'c', done: false });
        expect(iterator.next()).toEqual({ value: 'd', done: false });
        expect(iterator.next()).toEqual({ value: 'e', done: false });
        expect(iterator.next()).toEqual({ value: undefined, done: true });
        expect(iterator.next().value).toBeUndefined();
    });

    /**
     * The iterable returned from values() is not reusable. When next().done = true or currentIndex > length,
     * the for...of loop ends, and further iterating it has no effect.
     */
    test('Reusing the iterable', () => {
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});
        const arr = ['a', 'b', 'c', 'd', 'e'];
        const values = arr.mockValues();

        for (const letter of values) {
            console.log(letter);
        }

        expect(consoleSpy).toHaveBeenCalledWith('a');
        expect(consoleSpy).toHaveBeenCalledWith('b');
        expect(consoleSpy).toHaveBeenCalledWith('c');
        expect(consoleSpy).toHaveBeenCalledWith('d');
        expect(consoleSpy).toHaveBeenCalledWith('e');

        for (const letter of values) {
            expect(letter).toBeUndefined();
        }
    });

    /**
     * There are no values stored in the array iterator object returned from values();
     * instead, it stores the address of the array used in its creation, and reads the
     * currently visited index on each iteration. Therefore, its iteration output depends
     * on the value stored in that index at the time of stepping. If the values in the
     * array changed, the array iterator object's values change too.
     */
    test('Mutations during iteration', () => {
        const arr = ['a', 'b', 'c', 'd', 'e'];
        const iterator = arr.mockValues();

        expect(iterator.next().value).toBe('a');

        arr[1] = 'n';

        expect(iterator.next().value).toBe('n');
    });

    /**
     * values() will visit empty slots as if they are undefined.
     */
    test('Iterating sparse arrays', () => {
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        for (const element of [, 'a'].mockValues()) {
            console.log(element);
        }

        expect(consoleSpy).toHaveBeenCalledWith(undefined);
        expect(consoleSpy).toHaveBeenCalledWith('a');
    });

    /**
     * The values() method reads the length property of this and then accesses each property
     * whose key is a nonnegative integer less than length.
     */
    test('Calling values() on non-array objects', () => {
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});
        const arrayLike = {
            length: 3,
            0: 'a',
            1: 'b',
            2: 'c',
            3: 'd'
        };

        for (const entry of Array.prototype.mockValues.call(arrayLike)) {
            console.log(entry);
        }

        expect(consoleSpy).toHaveBeenCalledWith('a');
        expect(consoleSpy).toHaveBeenCalledWith('b');
        expect(consoleSpy).toHaveBeenCalledWith('c');
    });
});
