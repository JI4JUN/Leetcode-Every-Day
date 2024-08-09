import { SameValueNonNumber } from '../SameValueNonNumber';

describe('SameValueNonNumber function', () => {
    test('Should return true for null values', () => {
        expect(SameValueNonNumber(null, null)).toBeTruthy();
    });

    test('Should return true for undefined values', () => {
        expect(SameValueNonNumber(undefined, undefined)).toBeTruthy();
    });

    test('Should return true for equal BigInt values', () => {
        expect(SameValueNonNumber(BigInt(123), BigInt(123))).toBeTruthy();
    });

    test('Should return false for different BigInt values', () => {
        expect(SameValueNonNumber(BigInt(123), BigInt(456))).toBeFalsy();
    });

    test('Should return true for equal strings', () => {
        expect(SameValueNonNumber('hello', 'hello')).toBeTruthy();
    });

    test('Should return false for strings with different lengths', () => {
        expect(SameValueNonNumber('hello', 'hell')).toBeFalsy();
    });

    test('Should return false for strings with same length but different characters', () => {
        expect(SameValueNonNumber('hello', 'world')).toBeFalsy();
    });

    test('Should return true for equal boolean values', () => {
        expect(SameValueNonNumber(true, true)).toBeTruthy();
        expect(SameValueNonNumber(false, false)).toBeTruthy();
    });

    test('Should return false for different boolean values', () => {
        expect(SameValueNonNumber(true, false)).toBeFalsy();
        expect(SameValueNonNumber(false, true)).toBeFalsy();
    });

    test('Should return true for the same object reference', () => {
        const obj = {};

        expect(SameValueNonNumber(obj, obj)).toBeTruthy();
    });

    test('Should return false for different object references', () => {
        expect(SameValueNonNumber({}, {})).toBeFalsy();
    });
});
