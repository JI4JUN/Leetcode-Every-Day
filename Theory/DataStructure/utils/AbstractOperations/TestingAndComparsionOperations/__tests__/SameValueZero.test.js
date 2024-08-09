import { SameValueZero } from '../SameValueZero';

describe('SameValueZero function', () => {
    test('Should return false if the type of two given values are not the same', () => {
        const value1 = 42;
        const value2 = '42';

        expect(SameValueZero(value1, value2)).toBeFalsy();
    });

    test('Should return true for Number values', () => {
        expect(SameValueZero(42, 42)).toBeTruthy();
    });

    test('Should return true for null values', () => {
        expect(SameValueZero(null, null)).toBeTruthy();
    });

    test('Should return true for undefined values', () => {
        expect(SameValueZero(undefined, undefined)).toBeTruthy();
    });

    test('Should return true for equal BigInt values', () => {
        expect(SameValueZero(BigInt(123), BigInt(123))).toBeTruthy();
    });

    test('Should return false for different BigInt values', () => {
        expect(SameValueZero(BigInt(123), BigInt(456))).toBeFalsy();
    });

    test('Should return true for equal strings', () => {
        expect(SameValueZero('hello', 'hello')).toBeTruthy();
    });

    test('Should return false for strings with different lengths', () => {
        expect(SameValueZero('hello', 'hell')).toBeFalsy();
    });

    test('Should return false for strings with same length but different characters', () => {
        expect(SameValueZero('hello', 'world')).toBeFalsy();
    });

    test('Should return true for equal boolean values', () => {
        expect(SameValueZero(true, true)).toBeTruthy();
        expect(SameValueZero(false, false)).toBeTruthy();
    });

    test('Should return false for different boolean values', () => {
        expect(SameValueZero(true, false)).toBeFalsy();
        expect(SameValueZero(false, true)).toBeFalsy();
    });

    test('Should return true for the same object reference', () => {
        const obj = {};

        expect(SameValueZero(obj, obj)).toBeTruthy();
    });

    test('Should return false for different object references', () => {
        expect(SameValueZero({}, {})).toBeFalsy();
    });
});
