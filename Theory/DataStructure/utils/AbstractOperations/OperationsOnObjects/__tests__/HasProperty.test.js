import { HasProperty } from '../HasProperty';

describe('HasProperty function', () => {
    const testObject = {
        prop1: 'value',
        prop2: undefined,
        prop3: null
    };

    test('Property exists in object', () => {
        expect(HasProperty(testObject, 'prop1')).toBe(true);
    });

    test('Property does not exist in object', () => {
        expect(HasProperty(testObject, 'nonexistentProp')).toBe(false);
    });

    test('Property exists but value is undefined', () => {
        expect(HasProperty(testObject, 'prop2')).toBe(true);
    });

    test('Property exists but value is null', () => {
        expect(HasProperty(testObject, 'prop3')).toBe(true);
    });

    test('Throws TypeError for non-object input', () => {
        expect(() => {
            HasProperty(null, 'prop1');
        }).toThrow(TypeError);

        expect(() => {
            HasProperty(undefined, 'prop1');
        }).toThrow(TypeError);

        expect(() => {
            HasProperty(42, 'prop1');
        }).toThrow(TypeError);

        expect(() => {
            HasProperty('string', 'prop1');
        }).toThrow(TypeError);
    });
});
