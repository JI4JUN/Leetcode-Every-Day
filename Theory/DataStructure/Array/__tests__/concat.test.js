import { tinyConcat, tinyPush, IsConcatSpreadable } from '../index';

describe('Array.prototype.concat', () => {
    Array.prototype.tinyConcat = tinyConcat;
    Array.prototype.tinyPush = tinyPush;

    /**
     * The following code concatenates two arrays.
     */
    test('Concatenating two arrays', () => {
        const letters = ['a', 'b', 'c'];
        const numbers = [1, 2, 3];
        const alphaNumeric = letters.tinyConcat(numbers);

        expect(alphaNumeric).toEqual(['a', 'b', 'c', 1, 2, 3]);
    });

    /**
     * The following code concatenates three arrays.
     */
    test('Concatenating three arrays', () => {
        const num1 = [1, 2, 3];
        const num2 = [4, 5, 6];
        const num3 = [7, 8, 9];
        const numbers = num1.tinyConcat(num2, num3);

        expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    /**
     * The following code concatenates three values to an array.
     */
    test('Concatenating values to an array', () => {
        const letters = ['a', 'b', 'c'];
        const alphaNumeric = letters.tinyConcat(1, [2, 3]);

        expect(alphaNumeric).toEqual(['a', 'b', 'c', 1, 2, 3]);
    });

    /**
     * The following code concatenates nested arrays and demonstrates retention of references.
     */
    test('Concatenating nested arrays', () => {
        const num1 = [[1]];
        const num2 = [2, [3]];
        const numbers = num1.tinyConcat(num2);

        expect(numbers).toEqual([[1], 2, [3]]);

        num1[0].tinyPush(4);

        expect(numbers).toEqual([[1, 4], 2, [3]]);
    });

    /**
     * concat does not treat all array-like objects as arrays by default — only if Symbol.isConcatSpreadable
     * is set to a truthy value (e.g. true).
     */
    test('Concatenating array-like objects with Symbol.isConcatSpreadable', () => {
        const obj1 = { 0: 1, 1: 2, 2: 3, length: 3 };
        const obj2 = {
            0: 1,
            1: 2,
            2: 3,
            length: 3,
            [Symbol.isConcatSpreadable]: true
        };

        expect([0].tinyConcat(obj1, obj2)).toEqual([
            0,
            { 0: 1, 1: 2, 2: 3, length: 3 },
            1,
            2,
            3
        ]);
    });

    /**
     * If the this value is not an array, it is converted to an object and then treated in the same way as
     * the arguments for concat(). In this case the return value is always a plain new array.
     */
    test('Calling concat() on non-array objects', () => {
        expect(Array.prototype.tinyConcat.call({}, 1, 2, 3)).toEqual([
            {},
            1,
            2,
            3
        ]);
        expect(Array.prototype.tinyConcat.call(1, 2, 3)).toEqual([
            new Number(1),
            2,
            3
        ]);

        const arrayLike = {
            [Symbol.isConcatSpreadable]: true,
            length: 2,
            0: 1,
            1: 2,
            2: 99
        };

        expect(Array.prototype.tinyConcat.call(arrayLike, 3, 4)).toEqual([
            1, 2, 3, 4
        ]);
    });
});

describe('IsConcatSpreadable function', () => {
    test('Return false if O is not an object', () => {
        expect(IsConcatSpreadable(null)).toBe(false);
        expect(IsConcatSpreadable(undefined)).toBe(false);
        expect(IsConcatSpreadable(42)).toBe(false);
        expect(IsConcatSpreadable('string')).toBe(false);
        expect(IsConcatSpreadable(true)).toBe(false);
    });

    test('Return the value of Symbol.isConcatSpreadable if it is defined', () => {
        const obj1 = { [Symbol.isConcatSpreadable]: true };
        const obj2 = { [Symbol.isConcatSpreadable]: false };

        expect(IsConcatSpreadable(obj1)).toBe(true);
        expect(IsConcatSpreadable(obj2)).toBe(false);
    });

    test('Return true for arrays when Symbol.isConcatSpreadable is undefined', () => {
        expect(IsConcatSpreadable([])).toBe(true);
        expect(IsConcatSpreadable([1, 2, 3])).toBe(true);
    });

    test('Return false for objects that are not arrays when Symbol.isConcatSpreadable is undefined', () => {
        expect(IsConcatSpreadable({})).toBe(false);
        expect(IsConcatSpreadable({ foo: 'bar' })).toBe(false);
    });

    test('Correctly handles objects with a Symbol.isConcatSpreadable property set to a truthy or falsy value', () => {
        const objWithTruthy = { [Symbol.isConcatSpreadable]: 'yes' };
        const objWithFalsy = { [Symbol.isConcatSpreadable]: 0 };

        expect(IsConcatSpreadable(objWithTruthy)).toBe(true);
        expect(IsConcatSpreadable(objWithFalsy)).toBe(false);
    });
});
