import { CreateDataProperty } from '../CreateDataProperty';

describe('CreateDataProperty function', () => {
    test('Should create a new data property with correct descriptor', () => {
        let obj = {};

        CreateDataProperty(obj, 'newProp', 'Hello');

        expect('newProp' in obj).toBe(true);

        const descriptor = Object.getOwnPropertyDescriptor(obj, 'newProp');

        expect(descriptor.value).toBe('Hello');
        expect(descriptor.writable).toBe(true);
        expect(descriptor.enumerable).toBe(true);
        expect(descriptor.configurable).toBe(true);
    });

    test('Should overwrite existing property with new value', () => {
        let obj = {
            existingProp: 'Existing Value'
        };

        CreateDataProperty(obj, 'existingProp', 'New Value');

        const descriptor = Object.getOwnPropertyDescriptor(obj, 'existingProp');

        expect(descriptor.value).toBe('New Value');
        expect(descriptor.writable).toBe(true);
        expect(descriptor.enumerable).toBe(true);
        expect(descriptor.configurable).toBe(true);
    });

    test('Should return false and not throw when trying to set property on non-object', () => {
        let obj = 'not an object';

        const result = CreateDataProperty(obj, 'newProp', 'Value');

        expect(result).toBe(false);
        expect(typeof obj).toBe('string');
    });
});
