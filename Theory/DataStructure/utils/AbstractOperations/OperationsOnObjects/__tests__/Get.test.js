import { Get } from '../index';

describe('Get function', () => {
    let testObject;

    beforeEach(() => {
        testObject = {
            prop1: 'value',
            prop2: 42,
            prop3: {
                nestedProp: 'nestedValue'
            }
        };
    });

    test('Get existing property', () => {
        expect(Get(testObject, 'prop1')).toBe('value');
    });

    test('Get existing property with number value', () => {
        expect(Get(testObject, 'prop2')).toBe(42);
    });

    test('Get nested property', () => {
        expect(Get(testObject, 'prop3')).toEqual({ nestedProp: 'nestedValue' });
    });

    test('Throws TypeError for non-existent property', () => {
        expect(() => {
            Get(testObject, 'nonexistentProp');
        }).toThrow(TypeError);
    });

    test('Throws TypeError for non-object input', () => {
        expect(() => {
            Get(null, 'prop1');
        }).toThrow(TypeError);

        expect(() => {
            Get(undefined, 'prop1');
        }).toThrow(TypeError);

        expect(() => {
            Get(42, 'prop1');
        }).toThrow(TypeError);

        expect(() => {
            Get('string', 'prop1');
        }).toThrow(TypeError);
    });
});
