import { CreateDataPropertyOrThrow } from '../CreateDataPropertyOrThrow';

describe('CreateDataPropertyOrThrow function', () => {
    test('Should create a new data property with correct descriptor', () => {
        const obj = {};
        const result = () => CreateDataPropertyOrThrow(obj, 'newProp', 'Hello');

        expect(result).not.toThrow(TypeError);
        expect('newProp' in obj).toBe(true);

        const descriptor = Object.getOwnPropertyDescriptor(obj, 'newProp');

        expect(descriptor.value).toBe('Hello');
        expect(descriptor.writable).toBe(true);
        expect(descriptor.enumerable).toBe(true);
        expect(descriptor.configurable).toBe(true);
    });

    test('Should throw a TypeError when trying to overwrite existing property', () => {
        const obj = {
            existingProp: 'Existing Value'
        };

        Object.defineProperty(obj, 'existingProp', {
            value: 'Existing Value',
            writable: false,
            enumerable: true,
            configurable: false
        });

        const result = () =>
            CreateDataPropertyOrThrow(obj, 'existingProp', 'New Value');

        expect(result).toThrow(TypeError);
        expect(obj.existingProp).toBe('Existing Value');

        const descriptor = Object.getOwnPropertyDescriptor(obj, 'existingProp');

        expect(descriptor.value).toBe('Existing Value');
        expect(descriptor.writable).toBe(false);
        expect(descriptor.enumerable).toBe(true);
        expect(descriptor.configurable).toBe(false);
    });

    test('Should throw a TypeError when trying to set property on non-object', () => {
        let obj = 'not an object';

        const result = () => CreateDataPropertyOrThrow(obj, 'newProp', 'Value');

        expect(result).toThrow(TypeError);
        expect(typeof obj).toBe('string');
    });
});
