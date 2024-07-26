import { ToLength } from '../index';

describe('ToLength function', () => {
    test('Should return an integral Number suitable for use as the length of an array-like object', () => {
        expect(ToLength(5)).toBe(5);
        expect(ToLength(0)).toBe(0);
        expect(ToLength(-5)).toBe(0);
        expect(ToLength('10')).toBe(10);
        expect(ToLength('abc')).toBe(0);
        expect(ToLength(Number.MAX_VALUE * 2)).toBe(Number.MAX_SAFE_INTEGER);
        expect(ToLength(Number.POSITIVE_INFINITY)).toBe(
            Number.MAX_SAFE_INTEGER
        );
        expect(ToLength(Number.NaN)).toBe(0);
    });
});
