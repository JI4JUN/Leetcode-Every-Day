import { LengthOfArrayLike } from '../LengthOfArrayLike';

describe('LengthOfArrayLike Function', () => {
    test('Should return the length property of an object as a non-negative integer', () => {
        const arrayLike1 = { length: 5 };
        const arrayLike2 = [1, 2, 3];

        expect(LengthOfArrayLike(arrayLike1)).toBe(5);
        expect(LengthOfArrayLike(arrayLike2)).toBe(3);
    });

    test('Should add length: 0 for objects with no length property', () => {
        const noLengthObj = { name: 'John' };
        const len = LengthOfArrayLike(noLengthObj);

        expect(len).toBe(0);
        expect(noLengthObj).toStrictEqual({
            name: 'John',
            length: 0
        });
    });

    test('Should handle negative or non-numeric length property', () => {
        const negativeLengthObj = { length: -5 };
        const nonNumericLengthObj = { length: 'abc' };

        expect(LengthOfArrayLike(negativeLengthObj)).toBe(0);
        expect(LengthOfArrayLike(nonNumericLengthObj)).toBe(0);
    });

    test('Should handle large length values by returning a safe integer', () => {
        const largeLengthObj = { length: Number.MAX_SAFE_INTEGER * 2 };

        expect(LengthOfArrayLike(largeLengthObj)).toBe(Number.MAX_SAFE_INTEGER);
    });
});
