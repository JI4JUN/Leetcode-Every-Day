import { GetMethod } from '../GetMethod';

describe('GetMethod function', () => {
    const testObject = {
        method1: function () {
            return 'method1';
        },
        method2: 42,
        method3: undefined,
        method4: null
    };

    test('Get existing callable method', () => {
        const method = GetMethod(testObject, 'method1');

        expect(method).toBeInstanceOf(Function);
        expect(method()).toBe('method1');
    });

    test('Throws TypeError for non-callable method', () => {
        expect(() => {
            GetMethod(testObject, 'method2');
        }).toThrow(TypeError);
    });

    test('Returns undefined for undefined value', () => {
        expect(GetMethod(testObject, 'method3')).toBeUndefined();

        expect(GetMethod(42, 'method1')).toBeUndefined();

        expect(GetMethod('string', 'method1')).toBeUndefined();
    });

    test('Returns undefined for null value', () => {
        expect(GetMethod(testObject, 'method4')).toBeUndefined();
    });

    test('Throws TypeError for non-object input', () => {
        expect(() => {
            GetMethod(null, 'method1');
        }).toThrow(TypeError);

        expect(() => {
            GetMethod(undefined, 'method1');
        }).toThrow(TypeError);
    });
});
