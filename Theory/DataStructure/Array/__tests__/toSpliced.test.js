import { mockToSpliced } from 'Array/toSpliced';

describe('Array.prototype.toSpliced', () => {
    Array.prototype.mockToSpliced = mockToSpliced;

    /**
     * You can use toSpliced() to delete, add, and replace elements in an array and create a new array
     * more efficiently than using slice() and concat().
     */
    test('Deleting, adding, and replacing elements', () => {
        const months = ['Jan', 'Mar', 'Apr', 'May'];
        const months2 = months.mockToSpliced(1, 0, 'Feb');

        expect(months2).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May']);

        const months3 = months2.mockToSpliced(2, 2);
        expect(months3).toEqual(['Jan', 'Feb', 'May']);

        const months4 = months3.mockToSpliced(1, 1, 'Feb', 'Mar');
        expect(months4).toEqual(['Jan', 'Feb', 'Mar', 'May']);

        expect(months).toEqual(['Jan', 'Mar', 'Apr', 'May']);
    });

    /**
     * The toSpliced() method always creates a dense array.
     */
    test('Using toSpliced() on sparse arrays', () => {
        const arr = [1, , 3, 4, , 6];

        expect(arr.mockToSpliced(1, 2)).toEqual([1, 4, undefined, 6]);
    });

    /**
     * The toSpliced() method reads the length property of this. It then reads the integer-keyed properties needed
     * and writes them into the new array.
     */
    test('Calling toSpliced() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            unrelated: 'foo',
            0: 5,
            2: 4
        };

        expect(
            Array.prototype.mockToSpliced.call(arrayLike, 0, 1, 2, 3)
        ).toEqual([2, 3, undefined, 4]);
    });
});
