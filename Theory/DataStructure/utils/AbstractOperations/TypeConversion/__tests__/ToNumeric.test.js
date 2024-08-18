import { ToNumeric } from '../ToNumeric';

describe('ToNumeric function', () => {
    test('Should return a number when given a number primitive', () => {
        expect(ToNumeric(42)).toBe(42);
        expect(ToNumeric(-5.6)).toBe(-5.6);
        expect(ToNumeric(NaN)).toBeNaN();
    });

    test('Should return a BigInt when given a BigInt primitive', () => {
        expect(ToNumeric(BigInt(42))).toBe(BigInt(42));
        expect(ToNumeric(BigInt('-123456789012345678901234567890'))).toBe(
            BigInt('-123456789012345678901234567890')
        );
    });

    test('Should return a number when given a numeric string', () => {
        expect(ToNumeric('42')).toBe(42);
        expect(ToNumeric('-42.5')).toBe(-42.5);
    });

    test('Should return a BigInt when given a BigInt string', () => {
        expect(ToNumeric(BigInt('123456789012345678901234567890'))).toBe(
            BigInt('123456789012345678901234567890')
        );
    });

    test('Should correctly handle non-numeric strings', () => {
        expect(ToNumeric('abc')).toBeNaN();
        expect(ToNumeric('')).toBe(0);
        expect(ToNumeric(' ')).toBe(0);
    });

    test('Should handle objects that can be converted to primitives', () => {
        expect(ToNumeric({ valueOf: () => 10 })).toBe(10);
        expect(ToNumeric({ toString: () => '123' })).toBe(123);
        expect(
            ToNumeric({
                [Symbol.toPrimitive]: () => 42
            })
        ).toBe(42);
    });

    test('Should return NaN for objects that cannot be converted to numbers or BigInts', () => {
        expect(ToNumeric({})).toBeNaN();
    });

    test('Should return NaN for undefined, null, or non-convertible values', () => {
        expect(ToNumeric(undefined)).toBeNaN();
        expect(ToNumeric(null)).toBe(0);
        expect(() => ToNumeric(Symbol('test'))).toThrow(TypeError);
    });
});
