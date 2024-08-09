import { sameValueZero } from '../sameValueZero';

describe('Number::sameValueZero function', () => {
    test('Should return true for same value NaN', () => {
        expect(sameValueZero(NaN, NaN)).toBeTruthy();
    });

    test('Should return true for one value is +0 another is -0', () => {
        expect(sameValueZero(+0, -0)).toBeTruthy();
    });

    test('Should return true for one value is -0 another is +0', () => {
        expect(sameValueZero(-0, +0)).toBeTruthy();
    });

    test('Should return true for same Number value', () => {
        expect(sameValueZero(42, 42)).toBeTruthy();
    });

    test('Should return false for non-same Number value', () => {
        expect(sameValueZero(1, 2)).toBeFalsy();
    });
});
