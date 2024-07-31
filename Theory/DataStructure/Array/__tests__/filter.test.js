import { tinyFilter } from '../index';

describe('Array.prototype.filter', () => {
    Array.prototype.tinyFilter = tinyFilter;

    /**
     * The following example uses filter() to create a filtered array that has all elements
     * with values less than 10 removed.
     */
    test('Filtering out all small values', () => {
        function isBigEnough(value) {
            return value >= 10;
        }

        const filtered = [12, 5, 8, 130, 44].tinyFilter(isBigEnough);

        expect(filtered).toStrictEqual([12, 130, 44]);
    });

    /**
     * The following example returns all prime numbers in the array
     */
    test('Find all prime numbers in an array', () => {
        const array = [
            -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
        ];

        function isPrime(num) {
            for (let i = 2; num > i; i++) {
                if (num % i === 0) {
                    return false;
                }
            }
            return num > 1;
        }

        const primes = array.tinyFilter(isPrime);

        expect(primes).toStrictEqual([2, 3, 5, 7, 11, 13]);
    });

    /**
     * The following example uses filter() to create a filtered JSON of all elements
     * with non-zero, numeric id.
     */
    test('Filtering invalid entries from JSON', () => {
        const arr = [
            { id: 15 },
            { id: -1 },
            { id: 0 },
            { id: 3 },
            { id: 12.2 },
            {},
            { id: null },
            { id: NaN },
            { id: 'undefined' }
        ];

        let invalidEntries = 0;

        function filterById(item) {
            if (Number.isFinite(item.id) && item.id !== 0) {
                return true;
            }

            invalidEntries++;

            return false;
        }

        const arrByID = arr.tinyFilter(filterById);

        expect(arrByID).toStrictEqual([
            { id: 15 },
            { id: -1 },
            { id: 3 },
            { id: 12.2 }
        ]);
        expect(invalidEntries).toBe(5);
    });

    /**
     * Following example uses filter() to filter array content based on search criteria.
     */
    test('Searching in array', () => {
        const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

        function filterItems(arr, query) {
            return arr.tinyFilter((el) =>
                el.toLowerCase().includes(query.toLowerCase())
            );
        }

        const filteredFruits1 = filterItems(fruits, 'ap');
        const filteredFruits2 = filterItems(fruits, 'an');

        expect(filteredFruits1).toStrictEqual(['apple', 'grapes']);
        expect(filteredFruits2).toStrictEqual(['banana', 'mango', 'orange']);
    });

    /**
     * The array argument is useful if you want to access another element in the array,
     * especially when you don't have an existing variable that refers to the array.
     * The following example first uses map() to extract the numerical ID from each name
     * and then uses filter() to select the ones that are greater than its neighbors.
     */
    test('Using the third argument of callbackFn', () => {
        const names = ['JC63', 'Bob132', 'Ursula89', 'Ben96'];
        const greatIDs = names
            .map((name) => parseInt(name.match(/[0-9]+/)[0], 10))
            .tinyFilter((id, idx, arr) => {
                if (idx > 0 && id <= arr[idx - 1]) {
                    return false;
                }

                if (idx < arr.length - 1 && id <= arr[idx + 1]) {
                    return false;
                }

                return true;
            });

        expect(greatIDs).toStrictEqual([132, 96]);
    });

    /**
     * filter() will skip empty slots.
     */
    test('Using filter() on sparse arrays', () => {
        const result1 = [1, , undefined].tinyFilter((x) => x === undefined);
        const result2 = [1, , undefined].tinyFilter((x) => x !== 2);

        expect(result1).toStrictEqual([undefined]);
        expect(result2).toStrictEqual([1, undefined]);
    });

    /**
     * The filter() method reads the length property of this and then accesses each property
     * whose key is a nonnegative integer less than length.
     */
    test('Calling filter() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 'a',
            1: 'b',
            2: 'c',
            3: 'a'
        };

        expect(
            Array.prototype.tinyFilter.call(arrayLike, (x) => x <= 'b')
        ).toStrictEqual(['a', 'b']);
    });
});
