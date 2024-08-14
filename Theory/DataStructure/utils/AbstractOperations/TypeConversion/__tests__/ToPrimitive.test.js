import { ToPrimitive } from '../ToPrimitive';

describe('ToPrimitive function', () => {
    test('Should return input if it is already a non-object type or null', () => {
        expect(ToPrimitive(42)).toBe(42);
        expect(ToPrimitive('string')).toBe('string');
        expect(ToPrimitive(true)).toBe(true);
        expect(ToPrimitive(undefined)).toBeUndefined();
        expect(ToPrimitive(null)).toBe(null);
    });

    test('should convert input object to primitive type using preferredType hint', () => {
        const obj = {
            [Symbol.toPrimitive]: (hint) => {
                switch (hint) {
                    case 'string':
                        return 'string value';
                    case 'number':
                        return 42;
                }
            }
        };

        expect(ToPrimitive(obj, 'string')).toBe('string value');
        expect(ToPrimitive(obj, 'number')).toBe(42);
    });

    test('Should use "number" as default preferredType if not provided', () => {
        const obj = {
            valueOf: function () {
                return 42;
            }
        };

        expect(ToPrimitive(obj)).toBe(42);
    });

    test('Should throw TypeError if preferredType is invalid', () => {
        const obj = {};

        expect(() => ToPrimitive(obj, 'invalid')).toThrow(TypeError);
    });
});
