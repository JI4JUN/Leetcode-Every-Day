import {
    CompareArrayElements,
    SortIndexedProperties,
    mockSort
} from 'Array/sort';
import { mockJoin } from 'Array/join';
import { mockMap } from 'Array/map';

describe('SortIndexedProperties function', () => {
    test('Should sort properties with no holes', () => {
        const obj = {
            0: 'banana',
            1: 'apple',
            2: 'cherry',
            length: 3
        };
        const result = SortIndexedProperties(
            obj,
            obj.length,
            (x, y) => {
                return x.localeCompare(y);
            },
            'SKIP-HOLES'
        );

        expect(result).toEqual(['apple', 'banana', 'cherry']);
    });

    test('Should sort properties with holes skipped', () => {
        const obj = {
            0: 'banana',
            2: 'apple',
            4: 'cherry',
            length: 5
        };
        const result = SortIndexedProperties(
            obj,
            obj.length,
            (x, y) => {
                return x.localeCompare(y);
            },
            'SKIP-HOLES'
        );

        expect(result).toEqual(['apple', 'banana', 'cherry']);
    });

    test('Should read-through holes correctly', () => {
        const obj = {
            0: 'banana',
            2: 'apple',
            4: 'cherry',
            length: 5
        };
        const result = SortIndexedProperties(
            obj,
            obj.length,
            (x, y) => {
                if (x === undefined) {
                    return 1;
                }

                if (y === undefined) {
                    return -1;
                }

                return x.localeCompare(y);
            },
            'READ-THROUGH-HOLES'
        );

        expect(result).toEqual([
            'apple',
            'banana',
            'cherry',
            undefined,
            undefined
        ]);
    });

    test('Should return an empty array for objects with no indexed properties', () => {
        const obj = { length: 0 };
        const result = SortIndexedProperties(
            obj,
            obj.length,
            (x, y) => x - y,
            'SKIP-HOLES'
        );

        expect(result).toEqual([]);
    });

    test('Should handle numeric values correctly', () => {
        const obj = {
            0: 10,
            1: 5,
            2: 20,
            length: 3
        };
        const result = SortIndexedProperties(
            obj,
            obj.length,
            (x, y) => x - y,
            'SKIP-HOLES'
        );

        expect(result).toEqual([5, 10, 20]);
    });

    test('Should handle abrupt completion during sort', () => {
        const obj = {
            0: 'banana',
            1: 'apple',
            2: 'cherry',
            length: 3
        };

        expect(() => {
            SortIndexedProperties(
                obj,
                obj.length,
                (_x, _y) => {
                    throw new Error('Comparator Error');
                },
                'SKIP-HOLES'
            );
        }).toThrow('Comparator Error');
    });

    test('Should correctly handle large array lengths', () => {
        const obj = {};
        const len = 10000;

        for (let i = 0; i < len; i++) {
            obj[i] = Math.floor(Math.random() * len);
        }

        obj.length = len;

        const result = SortIndexedProperties(
            obj,
            obj.length,
            (x, y) => x - y,
            'SKIP-HOLES'
        );

        for (let i = 1; i < result.length; i++) {
            expect(result[i - 1]).toBeLessThanOrEqual(result[i]);
        }
    });

    test('Should correctly handle mixed types of elements', () => {
        const obj = {
            0: 'banana',
            1: 42,
            2: 'apple',
            3: -1,
            length: 4
        };
        const result = SortIndexedProperties(
            obj,
            obj.length,
            (x, y) => {
                return String(x).localeCompare(String(y));
            },
            'SKIP-HOLES'
        );

        expect(result).toEqual([-1, 42, 'apple', 'banana']);
    });
});

describe('CompareArrayElements function', () => {
    test('Should return +0 when both x and y are undefined', () => {
        expect(CompareArrayElements(undefined, undefined)).toBe(+0);
    });

    test('Should return 1 when x is undefined and y is not undefined', () => {
        expect(CompareArrayElements(undefined, 'a')).toBe(1);
    });

    test('Should return -1 when y is undefined and x is not undefined', () => {
        expect(CompareArrayElements('a', undefined)).toBe(-1);
    });

    test('Should call comparator and return its result if defined', () => {
        const comparator = jest.fn((x, y) => x.length - y.length);

        expect(CompareArrayElements('abc', 'a', comparator)).toBe(2);
        expect(comparator).toHaveBeenCalledWith('abc', 'a');
    });

    test('Should return +0 if comparator returns NaN', () => {
        const comparator = jest.fn(() => NaN);

        expect(CompareArrayElements('a', 'b', comparator)).toBe(+0);
    });

    test('Should return -1 when xString < yString', () => {
        expect(CompareArrayElements('a', 'b')).toBe(-1);
    });

    test('Should return 1 when yString < xString', () => {
        expect(CompareArrayElements('b', 'a')).toBe(1);
    });

    test('Should return +0 when xString === yString', () => {
        expect(CompareArrayElements('a', 'a')).toBe(+0);
    });

    test('Should handle numeric strings correctly', () => {
        expect(CompareArrayElements('10', '2')).toBe(-1);
        expect(CompareArrayElements('2', '10')).toBe(1);
    });

    test('Should handle mixed types correctly (number and string)', () => {
        expect(CompareArrayElements(2, '10')).toBe(1);
        expect(CompareArrayElements('10', 2)).toBe(-1);
    });
});

describe('Array.prototype.sort', () => {
    Array.prototype.mockSort = mockSort;
    Array.prototype.mockJoin = mockJoin;
    Array.prototype.mockMap = mockMap;

    /**
     * The following example creates four arrays and displays the original array, then the sorted arrays.
     * The numeric arrays are sorted without a compare function, then sorted using one.
     */
    test('Creating, displaying, and sorting an array', () => {
        const stringArray = ['Blue', 'Humpback', 'Beluga'];
        const numberArray = [40, 1, 5, 200];
        const numericStringArray = ['80', '9', '700'];
        const mixedNumericArray = ['80', '9', '700', 40, 1, 5, 200];

        function compareNumbers(a, b) {
            return a - b;
        }

        stringArray.mockJoin();

        expect(stringArray.mockSort()).toEqual(['Beluga', 'Blue', 'Humpback']);

        numberArray.mockJoin();

        expect(numberArray.mockSort()).toEqual([1, 200, 40, 5]);
        expect(numberArray.mockSort(compareNumbers)).toEqual([1, 5, 40, 200]);

        numericStringArray.mockJoin();

        expect(numericStringArray.mockSort()).toEqual(['700', '80', '9']);
        expect(numericStringArray.mockSort(compareNumbers)).toEqual([
            '9',
            '80',
            '700'
        ]);

        mixedNumericArray.mockJoin();
        expect(mixedNumericArray.mockSort()).toEqual([
            1,
            200,
            40,
            5,
            '700',
            '80',
            '9'
        ]);
        expect(mixedNumericArray.mockSort(compareNumbers)).toEqual([
            1,
            5,
            '9',
            40,
            '80',
            200,
            '700'
        ]);
    });

    /**
     * Arrays of objects can be sorted by comparing the value of one of their properties.
     */
    test('Sorting array of objects', () => {
        const items = [
            { name: 'Edward', value: 21 },
            { name: 'Sharpe', value: 37 },
            { name: 'And', value: 45 },
            { name: 'The', value: -12 },
            { name: 'Magnetic', value: 13 },
            { name: 'Zeros', value: 37 }
        ];

        expect(items.mockSort((a, b) => a.value - b.value)).toEqual([
            { name: 'The', value: -12 },
            { name: 'Magnetic', value: 13 },
            { name: 'Edward', value: 21 },
            { name: 'Sharpe', value: 37 },
            { name: 'Zeros', value: 37 },
            { name: 'And', value: 45 }
        ]);
        expect(
            items.mockSort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();

                if (nameA < nameB) {
                    return -1;
                }

                if (nameA > nameB) {
                    return 1;
                }

                return 0;
            })
        ).toEqual([
            { name: 'And', value: 45 },
            { name: 'Edward', value: 21 },
            { name: 'Magnetic', value: 13 },
            { name: 'Sharpe', value: 37 },
            { name: 'The', value: -12 },
            { name: 'Zeros', value: 37 }
        ]);
    });

    /**
     * For sorting strings with non-ASCII characters, i.e. strings with accented characters (e, é, è, a, ä, etc.),
     * strings from languages other than English, use String.prototype.localeCompare(). This function can compare
     * those characters so they appear in the right order.
     */
    test('Sorting non-ASCII characters', () => {
        const items = [
            'réservé',
            'premier',
            'communiqué',
            'café',
            'adieu',
            'éclair'
        ];

        expect(items.sort((a, b) => a.localeCompare(b))).toEqual([
            'adieu',
            'café',
            'communiqué',
            'éclair',
            'premier',
            'réservé'
        ]);
    });

    /**
     * The compareFn can be invoked multiple times per element within the array. Depending on the compareFn's nature,
     * this may yield a high overhead. The more work a compareFn does and the more elements there are to sort,
     * it may be more efficient to use map() for sorting. The idea is to traverse the array once to extract the actual
     * values used for sorting into a temporary array, sort the temporary array, and then traverse the temporary array
     * to achieve the right order.
     */
    test('Sorting with map', () => {
        function someSlowOperation(v) {
            let count = 0;

            while (count < 10000) {
                count++;
            }

            return v;
        }

        const data = ['delta', 'alpha', 'charlie', 'bravo'];
        const mapped = data.mockMap((v, i) => {
            return { i, value: someSlowOperation(v) };
        });

        mapped.mockSort((a, b) => {
            if (a.value > b.value) {
                return 1;
            }

            if (a.value < b.value) {
                return -1;
            }

            return 0;
        });

        const result = mapped.mockMap((v) => data[v.i]);

        expect(result).toEqual(['alpha', 'bravo', 'charlie', 'delta']);
    });

    /**
     * The sort() method returns a reference to the original array, so mutating the returned array will mutate
     * the original array as well.
     */
    test('sort() returns the reference to the same array', () => {
        const numbers1 = [3, 1, 4, 1, 5];
        const sorted1 = numbers1.mockSort((a, b) => a - b);

        sorted1[0] = 10;

        expect(sorted1[0]).toBe(10);
        expect(numbers1[0]).toBe(10);

        const numbers2 = [3, 1, 4, 1, 5];
        const sorted2 = [...numbers2].mockSort((a, b) => a - b);

        sorted2[0] = 10;

        expect(sorted2[0]).toBe(10);
        expect(numbers2[0]).toBe(3);
    });

    /**
     * It's important to note that students that have the same grade (for example, Alex and Devlin), will remain in the same
     * order as before calling the sort. This is what a stable sorting algorithm guarantees.
     */
    test('Sort stability', () => {
        const students = [
            {
                name: 'Alex',
                grade: 15
            },
            {
                name: 'Devlin',
                grade: 15
            },
            {
                name: 'Eagle',
                grade: 13
            },
            {
                name: 'Sam',
                grade: 14
            }
        ];

        students.mockSort(
            (firstItem, secondItem) => firstItem.grade - secondItem.grade
        );

        expect(students).toEqual([
            { name: 'Eagle', grade: 13 },
            { name: 'Sam', grade: 14 },
            { name: 'Alex', grade: 15 },
            { name: 'Devlin', grade: 15 }
        ]);
    });

    /**
     * If a comparing function does not satisfy all of purity, stability, reflexivity, anti-symmetry,
     * and transitivity rules, as explained in the description, the program's behavior is not well-defined.
     */
    test('Sorting with non-well-formed comparator', () => {
        const arr1 = [3, 1, 4, 1, 5, 9];
        const compareFn1 = (a, b) => (a > b ? 1 : 0);

        arr1.mockSort(compareFn1);

        expect(arr1).toEqual([1, 1, 3, 4, 5, 9]);

        const arr2 = [3, 1, 4, 1, 5, 9];
        const compareFn2 = (a, b) => (a > b ? -1 : 0);

        arr2.mockSort(compareFn2);

        expect(arr2).toEqual([3, 1, 4, 1, 5, 9]);
    });

    /**
     * Empty slots are moved to the end of the array.
     */
    test('Using sort() on sparse arrays', () => {
        expect(['a', 'c', , 'b'].mockSort()).toEqual(['a', 'b', 'c', ,]);
        expect([, undefined, 'a', 'b'].mockSort()).toEqual([
            'a',
            'b',
            undefined,
            ,
        ]);
    });

    /**
     * The sort() method reads the length property of this. It then collects all existing integer-keyed
     * properties in the range of 0 to length - 1, sorts them, and writes them back. If there are missing
     * properties in the range, the corresponding trailing properties are deleted, as if the non-existent
     * properties are sorted towards the end.
     */
    test('Calling sort() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            unrelated: 'foo',
            0: 5,
            2: 4
        };

        expect(Array.prototype.mockSort.call(arrayLike)).toEqual({
            0: 4,
            1: 5,
            length: 3,
            unrelated: 'foo'
        });
    });
});
