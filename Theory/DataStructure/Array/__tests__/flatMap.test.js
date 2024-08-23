import { mockFlatMap } from '../flatMap';
import { mockMap } from '../map';
import { mockFilter } from '../filter';

describe('Array.prototype.flatMap', () => {
    Array.prototype.mockFlatMap = mockFlatMap;
    Array.prototype.mockMap = mockMap;
    Array.prototype.mockFilter = mockFilter;

    test('map() and flatMap()', () => {
        const arr1 = [1, 2, 3, 4];

        expect(arr1.mockMap((x) => [x * 2])).toEqual([[2], [4], [6], [8]]);
        expect(arr1.mockFlatMap((x) => [x * 2])).toEqual([2, 4, 6, 8]);
        expect(arr1.mockFlatMap((x) => [[x * 2]])).toEqual([
            [2],
            [4],
            [6],
            [8]
        ]);

        const arr2 = ["it's Sunny in", '', 'California'];

        expect(arr2.mockMap((x) => x.split(' '))).toEqual([
            ["it's", 'Sunny', 'in'],
            [''],
            ['California']
        ]);
        expect(arr2.mockFlatMap((x) => x.split(' '))).toEqual([
            "it's",
            'Sunny',
            'in',
            '',
            'California'
        ]);
    });

    /**
     * In this sense, it works like the opposite of filter. Return a 1-element array to keep the item,
     * a multiple-element array to add items, or a 0-element array to remove the item.
     */
    test('For adding and removing items during a map()', () => {
        const a = [5, 4, -3, 20, 17, -33, -4, 18];
        const result = a.mockFlatMap((n) => {
            if (n < 0) {
                return [];
            }

            return n % 2 === 0 ? [n] : [n - 1, 1];
        });

        expect(result).toEqual([4, 1, 4, 20, 16, 1, 18]);
    });

    /**
     * The following example first uses filter() to extract operational stations and then
     * uses flatMap() to create a new array where each element contains a station and
     * its next station. On the last station, it returns an empty array to exclude it from the final array.
     */
    test('Using the third argument of callbackFn', () => {
        const stations = [
            'New Haven',
            'West Haven',
            'Milford (closed)',
            'Stratford'
        ];
        const line = stations
            .mockFilter((name) => !name.endsWith('(closed)'))
            .mockFlatMap((name, idx, arr) => {
                if (idx === arr.length - 1) {
                    return [];
                }

                return [`${name} - ${arr[idx + 1]}`];
            });

        expect(line).toEqual([
            'New Haven - West Haven',
            'West Haven - Stratford'
        ]);
    });

    /**
     * The callbackFn won't be called for empty slots in the source array because map() doesn't,
     * while flat() ignores empty slots in the returned arrays.
     */
    test('Using flatMap() on sparse arrays', () => {
        expect([1, 2, , 4, 5].mockMap((x) => [x, x * 2]));
        expect([1, 2, 3, 4].mockMap((x) => [, x * 2]));
    });

    /**
     * The flatMap() method reads the length property of this and then accesses each property whose
     * key is a nonnegative integer less than length. If the return value of the callback function
     * is not an array, it is always directly appended to the result array.
     */
    test('Calling flatMap() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 1,
            1: 2,
            2: 3,
            3: 4
        };

        expect(
            Array.prototype.flatMap.call(arrayLike, (x) => [x, x * 2])
        ).toEqual([1, 2, 2, 4, 3, 6]);
        expect(
            Array.prototype.flatMap.call(arrayLike, (x) => ({
                length: 1,
                0: x
            }))
        ).toEqual([
            { 0: 1, length: 1 },
            { 0: 2, length: 1 },
            { 0: 3, length: 1 }
        ]);
    });
});
