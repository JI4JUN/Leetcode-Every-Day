import { Set } from '../index';

describe('Set function', () => {
    let obj = { p1: 1 };

    Object.defineProperty(obj, 'p2', {
        value: 2,
        writable: false,
        enumerable: true,
        configurable: true
    });

    test('Should set a property on the object', () => {
        Set(obj, 'p1', '1', false);
        Set(obj, 'p3', '3', false);

        expect(obj.p1).toBe('1');
        expect(obj.p3).toBe('3');
    });

    test('Should return undefined when setting succeeds', () => {
        const result = Set(obj, 'p4', '4', false);

        expect(result).toBeUndefined();
    });

    test('Should throw TypeError when setting fails and Throw is true', () => {
        expect(() => {
            Set(obj, 'p2', '42', true);
        }).toThrow(TypeError);
    });

    test('Should not throw TypeError when setting fails and Throw is false', () => {
        expect(() => {
            Set(obj, 'p2', '42', false);
        }).not.toThrow(TypeError);
    });
});
