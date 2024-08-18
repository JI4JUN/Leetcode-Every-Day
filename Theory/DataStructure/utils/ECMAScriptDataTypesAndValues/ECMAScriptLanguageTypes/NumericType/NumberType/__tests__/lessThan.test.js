import { NumberType } from '../NumberType';

describe('lessThan function', () => {
    test('Should return true if a Number value x is less than another Number value y', () => {
        expect(NumberType.lessThan(1, 2)).toBeTruthy();
    });

    test('Should return undefined if x or y is NaN', () => {
        expect(NumberType.lessThan(NaN, NaN)).toBeUndefined();
        expect(NumberType.lessThan(NaN, 1)).toBeUndefined();
        expect(NumberType.lessThan(1, NaN)).toBeUndefined();
    });

    test('Should return false if x is y, x is +0, x is -0, x is +∞, or y is -∞', () => {
        const a = 1;
        const b = a;

        expect(NumberType.lessThan(a, b)).toBeFalsy();
        expect(NumberType.lessThan(+0, -0)).toBeFalsy();
        expect(NumberType.lessThan(-0, +0)).toBeFalsy();
        expect(NumberType.lessThan(+Infinity, 1)).toBeFalsy();
        expect(NumberType.lessThan(1, -Infinity)).toBeFalsy();
    });

    test('Should return true if y is +∞ or x is -∞', () => {
        expect(NumberType.lessThan(1, +Infinity)).toBeTruthy();
        expect(NumberType.lessThan(-Infinity, 1)).toBeTruthy();
    });
});
