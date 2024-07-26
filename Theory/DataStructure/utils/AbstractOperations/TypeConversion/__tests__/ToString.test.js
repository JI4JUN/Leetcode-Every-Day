import { ToString } from '../index';

describe('ToString function', () => {
    test('Should convert various types to strings correctly', () => {
        expect(ToString('string')).toBe('string');
        expect(() => ToString(Symbol('symbol'))).toThrow(TypeError);
        expect(ToString(undefined)).toBe('undefined');
        expect(ToString(null)).toBe('null');
        expect(ToString(true)).toBe('true');
        expect(ToString(false)).toBe('false');
        expect(ToString(123)).toBe('123');
        expect(ToString(123n)).toBe('123');
        expect(ToString({})).toBe('[object Object]');
    });

    test('Should convert objects to strings using ToPrimitive with string hint', () => {
        const obj = {
            [Symbol.toPrimitive]: () => {
                return 'object value';
            }
        };

        expect(ToString(obj)).toBe('object value');
    });

    test('Should throw TypeError if object cannot be converted to primitive value', () => {
        let obj = {
            [Symbol.toPrimitive]: () => {
                return {};
            }
        };

        expect(() => ToString(obj)).toThrow(TypeError);
    });
});
