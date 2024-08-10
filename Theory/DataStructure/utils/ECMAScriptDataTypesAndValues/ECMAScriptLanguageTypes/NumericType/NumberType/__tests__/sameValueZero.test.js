import { NumberType } from '../NumberType';

describe('Number::sameValueZero function', () => {
    test('Should return true for same value NaN', () => {
        expect(NumberType.sameValueZero(NaN, NaN)).toBeTruthy();
    });

    test('Should return true for one value is +0 another is -0', () => {
        expect(NumberType.sameValueZero(+0, -0)).toBeTruthy();
    });

    test('Should return true for one value is -0 another is +0', () => {
        expect(NumberType.sameValueZero(-0, +0)).toBeTruthy();
    });

    test('Should return true for same Number value', () => {
        expect(NumberType.sameValueZero(42, 42)).toBeTruthy();
    });

    test('Should return false for non-same Number value', () => {
        expect(NumberType.sameValueZero(1, 2)).toBeFalsy();
    });
});
