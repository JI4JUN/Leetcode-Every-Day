import { FindViaPredicate, tinyFindLastIndex, tinyFilter } from '../index';

describe('FindViaPredicate function', () => {
    test('Should find the first element that satisfies the predicate', () => {
        const arr = [1, 2, 3, 4, 5];
        const predicate = (value) => value > 3;
        const result = FindViaPredicate(
            arr,
            arr.length,
            'ASCENDING',
            predicate,
            null
        );

        expect(result).toEqual({ index: 3, value: 4 });
    });

    test('Should return the correct index and value when direction is DESCENDING', () => {
        const arr = [1, 2, 3, 4, 5];
        const predicate = (value) => value > 3;
        const result = FindViaPredicate(
            arr,
            arr.length,
            'DESCENDING',
            predicate,
            null
        );

        expect(result).toEqual({ index: 4, value: 5 });
    });

    test('Should return the correct index and value when no element satisfies the predicate', () => {
        const arr = [1, 2, 3, 4, 5];
        const predicate = (value) => value > 5;
        const result = FindViaPredicate(
            arr,
            arr.length,
            'ASCENDING',
            predicate,
            null
        );

        expect(result).toEqual({ index: -1, value: undefined });
    });

    test('Should throw TypeError when predicate is not a function', () => {
        const arr = [1, 2, 3, 4, 5];

        expect(() =>
            FindViaPredicate(arr, arr.length, 'ASCENDING', null, null)
        ).toThrow(TypeError);
    });
});

describe('Array.prototype.findLastIndex', () => {
    Array.prototype.tinyFindLastIndex = tinyFindLastIndex;
    Array.prototype.tinyFilter = tinyFilter;

    /**
     * The following example returns the index of the last element in the array that is a prime number,
     * or -1 if there is no prime number.
     */
    test('Find the index of the last prime number in an array', () => {
        function isPrime(element) {
            if (element % 2 === 0 || element < 2) {
                return false;
            }

            for (let factor = 3; factor <= Math.sqrt(element); factor += 2) {
                if (element % factor === 0) {
                    return false;
                }
            }

            return true;
        }

        expect([4, 6, 8, 12].tinyFindLastIndex(isPrime)).toBe(-1);
        expect([4, 5, 7, 8, 9, 11, 12].tinyFindLastIndex(isPrime)).toBe(5);
    });

    /**
     * The following example first uses filter() to extract the positive values and then uses findLastIndex()
     * to find the last element that is less than its neighbors.
     */
    test('Find the index of the last prime number in an array', () => {
        const numbers = [3, -1, 1, 4, 1, 5, 9, 2, 6];
        const lastTrough = numbers
            .tinyFilter((num) => num > 0)
            .tinyFindLastIndex((num, idx, arr) => {
                if (idx > 0 && num >= arr[idx - 1]) {
                    return false;
                }

                if (idx < arr.length - 1 && num >= arr[idx + 1]) {
                    return false;
                }

                return true;
            });

        expect(lastTrough).toBe(6);
    });

    /**
     * You can search for undefined in a sparse array and get the index of an empty slot.
     */
    test('Using findLastIndex() on sparse arrays', () => {
        expect([1, , 3].tinyFindLastIndex((x) => x === undefined)).toBe(1);
    });

    test('Calling findLastIndex() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 2,
            1: 7.3,
            2: 4,
            3: 3
        };

        expect(
            Array.prototype.tinyFindLastIndex.call(arrayLike, (x) =>
                Number.isInteger(x)
            )
        ).toBe(2);
    });
});
