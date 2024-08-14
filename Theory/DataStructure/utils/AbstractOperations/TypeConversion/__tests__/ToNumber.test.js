import { ToNumber } from '../ToNumber';

describe('ToNumber function', () => {
    test('Return the argument if it is a Number', () => {
        expect(ToNumber(42)).toBe(42);
        expect(ToNumber(Infinity)).toBe(Infinity);
        expect(ToNumber(-3.14)).toBe(-3.14);
    });

    test('Throw a TypeError if argument is a Symbol or a BigInt', () => {
        expect(() => ToNumber(Symbol())).toThrow(TypeError);
        expect(() => ToNumber(BigInt(42))).toThrow(TypeError);
    });

    test('Return NaN if argument is undefined', () => {
        expect(ToNumber(undefined)).toBeNaN();
    });

    test('Return +0 if argument is null or false', () => {
        expect(ToNumber(null)).toBe(+0);
        expect(ToNumber(false)).toBe(+0);
    });

    test('Return 1 if argument is true', () => {
        expect(ToNumber(true)).toBe(1);
    });

    test('Return the numeric value of the string if argument is a String', () => {
        expect(ToNumber('42')).toBe(42);
        expect(ToNumber('-3.14')).toBe(-3.14);
        expect(ToNumber('string')).toBeNaN();
    });

    test('Return the numeric value of the primitive of the Object argument', () => {
        const mockObject = {
            valueOf: () => 42
        };
        const invalidMockObject = {
            valueOf: () => 'not a number'
        };

        expect(ToNumber(mockObject)).toBe(42);
        expect(ToNumber(invalidMockObject)).toBeNaN();
    });
});
