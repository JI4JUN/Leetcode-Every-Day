import { MakeBasicObject } from '../MakeBasicObject';

describe('MakeBasicObject function', () => {
    test('Should create an object with specified internal slots', () => {
        const internalSlotsList = ['SlotA', 'SlotB'];
        const obj = MakeBasicObject(internalSlotsList);

        expect(obj).toHaveProperty('SlotA');
        expect(obj).toHaveProperty('SlotB');
        expect(obj).toHaveProperty('PrivateElements');
        expect(obj['SlotA']).toBeUndefined();
        expect(obj['SlotB']).toBeUndefined();
        expect(obj['PrivateElements']).toEqual([]);
    });

    test('Should set [[Extensible]] to true if included in the internalSlotsList', () => {
        const obj = MakeBasicObject(['Extensible']);

        expect(obj['Extensible']).toBeTruthy();
    });

    test('Should set [[Extensible]] to false if not included in the internalSlotsList', () => {
        const obj = MakeBasicObject([]);

        expect(obj['Extensible']).toBeFalsy();
    });

    test('Should set default internal methods', () => {
        const obj = MakeBasicObject([]);

        expect(obj['GetPrototypeOf']).toBe(Object.getPrototypeOf);
        expect(obj['SetPrototypeOf']).toBe(Object.setPrototypeOf);
        expect(obj['IsExtensible']).toBe(Object.isExtensible);
        expect(obj['PreventExtensions']).toBe(Object.preventExtensions);
    });

    test('Should ensure internal slots are correctly initialized', () => {
        const internalSlotsList = ['SlotX'];
        const obj = MakeBasicObject(internalSlotsList);

        expect(obj['SlotX']).toBeUndefined();
        expect(obj['PrivateElements']).toEqual([]);
        expect(obj['Extensible']).toBeFalsy();
    });

    test('should handle empty internalSlotsList correctly', () => {
        const obj = MakeBasicObject([]);

        expect(obj).toHaveProperty('PrivateElements');
        expect(obj['PrivateElements']).toEqual([]);
        expect(obj['Extensible']).toBeFalsy();
    });
});
