import { DeletePropertyOrThrow } from '../index';

describe('DeletePropertyOrThrow function', () => {
    test('Should delete an existing property and return UNUSED', () => {
        const obj = { key: 'value' };
        const result = DeletePropertyOrThrow(obj, 'key');

        expect(obj.key).toBeUndefined();
        expect(result).toBeUndefined();
    });

    test('Should throw TypeError when property deletion fails', () => {
        const obj = {};
        Object.defineProperty(obj, 'key', {
            value: 'value',
            configurable: false
        });

        expect(() => {
            DeletePropertyOrThrow(obj, 'key');
        }).toThrow(TypeError);
        expect(obj.key).toBe('value');
    });

    test('Should not throw TypeError when deleting non-existent property', () => {
        const obj = {};

        expect(() => {
            DeletePropertyOrThrow(obj, 'nonExistent');
        }).not.toThrow(TypeError);
    });
});
