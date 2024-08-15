import { MakeBasicObject } from '../MakeBasicObject';

describe('MakeBasicObject function', () => {
    test('Should create an object with specified internal slots', () => {
        const internalSlotsList = ['slotA', 'slotB'];
        const obj = MakeBasicObject(internalSlotsList);

        expect(obj).toHaveProperty('slotA');
        expect(obj).toHaveProperty('slotB');
        expect(obj).toHaveProperty('privateElements');
        expect(obj['slotA']).toBeUndefined();
        expect(obj['slotB']).toBeUndefined();
        expect(obj['privateElements']).toEqual([]);
    });

    test('Should set [[extensible]] to true if included in the internalSlotsList', () => {
        const obj = MakeBasicObject(['extensible']);

        expect(obj['extensible']).toBeTruthy();
    });

    test('Should set [[extensible]] to false if not included in the internalSlotsList', () => {
        const obj = MakeBasicObject([]);

        expect(obj['extensible']).toBeFalsy();
    });

    test('Should set default internal methods', () => {
        const obj = MakeBasicObject([]);

        expect(obj['getPrototypeOf']).toBe(Object.getPrototypeOf);
        expect(obj['setPrototypeOf']).toBe(Object.setPrototypeOf);
        expect(obj['isExtensible']).toBe(Object.isExtensible);
        expect(obj['preventExtensions']).toBe(Object.preventExtensions);
    });

    test('Should ensure internal slots are correctly initialized', () => {
        const internalSlotsList = ['slotX'];
        const obj = MakeBasicObject(internalSlotsList);

        expect(obj['slotX']).toBeUndefined();
        expect(obj['privateElements']).toEqual([]);
        expect(obj['extensible']).toBeFalsy();
    });

    test('should handle empty internalSlotsList correctly', () => {
        const obj = MakeBasicObject([]);

        expect(obj).toHaveProperty('privateElements');
        expect(obj['privateElements']).toEqual([]);
        expect(obj['extensible']).toBeFalsy();
    });
});
