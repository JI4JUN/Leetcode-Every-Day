import { OrdinaryObjectCreate } from '../OrdinaryObjectCreate';

describe('OrdinaryObjectCreate function', () => {
    test('Should create an object with [[Prototype]] and [[Extensible]] slots', () => {
        const proto = { prop: 'value' };
        const obj = OrdinaryObjectCreate(proto);

        expect(obj['Prototype']).toBe(proto);
        expect(obj['Extensible']).toBe(true);
    });

    test('Should create an object with additional internal slots', () => {
        const proto = { prop: 'value' };
        const additionalSlots = ['Slot1', 'Slot2'];
        const obj = OrdinaryObjectCreate(proto, additionalSlots);

        expect(obj['Prototype']).toBe(proto);
        expect(obj['Extensible']).toBe(true);
        expect(obj).toHaveProperty('Slot1');
        expect(obj).toHaveProperty('Slot2');
        expect(obj['Slot1']).toBeUndefined();
        expect(obj['Slot2']).toBeUndefined();
    });

    test('Should create an object with a null prototype', () => {
        const obj = OrdinaryObjectCreate(null);

        expect(obj['Prototype']).toBeNull();
        expect(obj['Extensible']).toBe(true);
    });

    test('Should not share internal slots between different objects', () => {
        const proto = { prop: 'value' };
        const additionalSlots = ['Slot1', 'Slot2'];
        const obj1 = OrdinaryObjectCreate(proto, additionalSlots);
        const obj2 = OrdinaryObjectCreate(proto, additionalSlots);

        obj1['Slot1'] = 'slot1_value';
        obj2['Slot2'] = 'slot2_value';

        expect(obj1['Slot1']).toBe('slot1_value');
        expect(obj2['Slot1']).toBeUndefined();
        expect(obj2['Slot2']).toBe('slot2_value');
        expect(obj1['Slot2']).toBeUndefined();
    });

    test('Should initialize [[PrivateElements]] as an empty list', () => {
        const proto = { prop: 'value' };
        const obj = OrdinaryObjectCreate(proto);

        expect(obj['PrivateElements']).toEqual([]);
    });
});
