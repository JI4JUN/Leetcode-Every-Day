import { GetV } from '../index';

describe('GetV function', () => {
    const testObject = {
        prop1: 'value',
        prop2: 42,
        prop3: {
            nestedProp: 'nestedValue'
        }
    };

    test('Get property from normal object', () => {
        expect(GetV(testObject, 'prop1')).toBe('value');
        expect(GetV(testObject, 'prop2')).toBe(42);
        expect(GetV(testObject, 'prop3')).toEqual({
            nestedProp: 'nestedValue'
        });
    });

    test('Get property from non-object values', () => {
        const stringValue = 'test';
        const numberValue = 123;

        expect(GetV(stringValue, 'length')).toBe(4);
        expect(GetV(stringValue, 'charAt')).toBeInstanceOf(Function);
        expect(GetV(numberValue, 'toFixed')).toBeInstanceOf(Function);
    });

    test('Returns undefined for non-existing property', () => {
        expect(GetV(testObject, 'nonExistingProp')).toBeUndefined();
    });

    test('Throws TypeError for undefined or null input', () => {
        expect(() => {
            GetV(null, 'prop1');
        }).toThrow(TypeError);

        expect(() => {
            GetV(undefined, 'prop1');
        }).toThrow(TypeError);
    });
});
