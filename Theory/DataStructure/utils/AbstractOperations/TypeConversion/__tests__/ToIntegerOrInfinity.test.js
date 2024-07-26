import { ToIntegerOrInfinity } from '../index';

describe('ToIntegerOrInfinity function', () => {
    test('Should return 0 for NaN, +0, and -0', () => {
        expect(ToIntegerOrInfinity('abc')).toBe(0);
        expect(ToIntegerOrInfinity(NaN)).toBe(0);
        expect(ToIntegerOrInfinity(+0)).toBe(0);
        expect(ToIntegerOrInfinity(-0)).toBe(0);
    });

    test('Should return +Infinity for +Infinity', () => {
        expect(ToIntegerOrInfinity(+Infinity)).toBe(+Infinity);
    });

    test('Should return -Infinity for -Infinity', () => {
        expect(ToIntegerOrInfinity(-Infinity)).toBe(-Infinity);
    });

    test('Should truncate positive numbers', () => {
        expect(ToIntegerOrInfinity(42.8)).toBe(42);
    });

    test('Should truncate negative numbers', () => {
        expect(ToIntegerOrInfinity(-17.3)).toBe(-17);
    });

    test('Should handle large positive numbers', () => {
        expect(ToIntegerOrInfinity(Number.MAX_VALUE * 2)).toBe(+Infinity);
    });

    test('Should handle large negative numbers', () => {
        expect(ToIntegerOrInfinity(-Number.MAX_VALUE * 2)).toBe(-Infinity);
    });
});
