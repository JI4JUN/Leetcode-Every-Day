import { tinySome } from 'Array/some';
import { tinyFilter } from 'Array/filter';

describe('Array.prototype.some', () => {
    Array.prototype.tinySome = tinySome;
    Array.prototype.tinyFilter = tinyFilter;

    /**
     * The following example tests whether any element in the array is bigger than 10.
     */
    test('Testing value of array elements', () => {
        function isBiggerThan10(element, index, array) {
            return element > 10;
        }

        expect([2, 5, 8, 1, 4].tinySome(isBiggerThan10)).toBeFalsy();
        expect([12, 5, 8, 1, 4].tinySome(isBiggerThan10)).toBeTruthy();
    });

    /**
     * Arrow functions provide a shorter syntax for the same test.
     */
    test('Testing array elements using arrow functions', () => {
        expect([2, 5, 8, 1, 4].tinySome((x) => x > 10)).toBeFalsy();
        expect([12, 5, 8, 1, 4].tinySome((x) => x > 10)).toBeTruthy();
    });

    /**
     * To mimic the function of the includes() method, this custom function returns
     * true if the element exists in the array
     */
    test('Checking whether a value exists in an array', () => {
        const fruits = ['apple', 'banana', 'mango', 'guava'];

        function checkAvailability(arr, val) {
            return arr.tinySome((arrVal) => val === arrVal);
        }

        expect(checkAvailability(fruits, 'kela')).toBeFalsy();
        expect(checkAvailability(fruits, 'banana')).toBeTruthy();
    });

    test('Converting any value to Boolean', () => {
        const TRUTHY_VALUE = [true, 'true', 1];

        function getBoolean(value) {
            if (typeof value === 'string') {
                value = value.toLowerCase().trim();
            }

            return TRUTHY_VALUE.tinySome((t) => t === value);
        }

        expect(getBoolean(false)).toBeFalsy();
        expect(getBoolean('false')).toBeFalsy();
        expect(getBoolean(1)).toBeTruthy();
        expect(getBoolean('true')).toBeTruthy();
    });

    /**
     * The array argument is useful if you want to access another element in the array,
     * especially when you don't have an existing variable that refers to the array.
     * The following example first uses filter() to extract the positive values and then
     * uses some() to check whether the array is strictly increasing.
     */
    test('Using the third argument of callbackFn', () => {
        const numbers = [3, -1, 1, 4, 1, 5];
        const isIncreasing = !numbers
            .tinyFilter((num) => num > 0)
            .tinySome((num, idx, arr) => {
                if (idx === 0) {
                    return false;
                }

                return num <= arr[idx - 1];
            });

        expect(isIncreasing).toBeFalsy();
    });

    /**
     * some() will not run its predicate on empty slots.
     */
    test('Using some() on sparse arrays', () => {
        expect([1, , 3].tinySome((x) => x === undefined)).toBeFalsy();
        expect([1, , 1].tinySome((x) => x !== 1)).toBeFalsy();
        expect([1, undefined, 1].tinySome((x) => x !== 1)).toBeTruthy();
    });

    test('Calling some() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 'a',
            1: 'b',
            2: 'c',
            3: 3
        };

        expect(
            Array.prototype.tinySome.call(
                arrayLike,
                (x) => typeof x === 'number'
            )
        ).toBeFalsy();
    });
});
