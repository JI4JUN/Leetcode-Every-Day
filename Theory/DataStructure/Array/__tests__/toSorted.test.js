import { tinyToSorted } from 'Array/toSorted';

describe('Array.prototype.toSorted', () => {
    Array.prototype.tinyToSorted = tinyToSorted;

    test('Sorting an array', () => {
        const months = ['Mar', 'Jan', 'Feb', 'Dec'];
        const sortedMonths = months.tinyToSorted();

        expect(sortedMonths).toEqual(['Dec', 'Feb', 'Jan', 'Mar']);
        expect(months).toEqual(['Mar', 'Jan', 'Feb', 'Dec']);

        const values = [1, 10, 21, 2];
        const sortedValues = values.tinyToSorted((a, b) => a - b);

        expect(sortedValues).toEqual([1, 2, 10, 21]);
        expect(values).toEqual([1, 10, 21, 2]);
    });

    /**
     * Empty slots are sorted as if they have the value undefined. They are always sorted to the end of
     * the array and compareFn is not called for them.
     */
    test('Using toSorted() on sparse arrays', () => {
        expect(['a', 'c', , 'b'].tinyToSorted()).toEqual([
            'a',
            'b',
            'c',
            undefined
        ]);
        expect([, undefined, 'a', 'b'].tinyToSorted()).toEqual([
            'a',
            'b',
            undefined,
            undefined
        ]);
    });

    test('Calling toSorted() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            unrelated: 'foo',
            0: 5,
            2: 4,
            3: 3
        };

        expect(Array.prototype.tinyToSorted.call(arrayLike)).toEqual([
            4,
            5,
            undefined
        ]);
    });
});
