import { LengthOfArrayLike } from '../index';

describe('LengthOfArrayLike Function', () => {
    test('Should return the length property of an object as a non-negative integer', () => {
        const arrayLike1 = { length: 5 };
        const arrayLike2 = [1, 2, 3];
        const arrayLike3 = 'test string'; // String object is array-like

        expect(LengthOfArrayLike(arrayLike1)).toBe(5);
        expect(LengthOfArrayLike(arrayLike2)).toBe(3);
        expect(LengthOfArrayLike(arrayLike3)).toBe(11); // 'test string' has length 11
    });

    test('Should throw TypeError for objects with no length property', () => {
        const noLengthObj = { name: 'John' };

        expect(() => {
            LengthOfArrayLike(noLengthObj);
        }).toThrow(TypeError);
    });

    test('Should handle negative or non-numeric length property by throw TypeError', () => {
        const negativeLengthObj = { length: -5 };
        const nonNumericLengthObj = { length: 'abc' };

        expect(() => {
            LengthOfArrayLike(negativeLengthObj);
        }).toThrow(TypeError);
        expect(() => {
            LengthOfArrayLike(nonNumericLengthObj);
        }).toThrow(TypeError);
    });

    test('Should handle large length values by returning a safe integer', () => {
        const largeLengthObj = { length: Number.MAX_SAFE_INTEGER * 2 };

        expect(LengthOfArrayLike(largeLengthObj)).toBe(Number.MAX_SAFE_INTEGER);
    });
});
