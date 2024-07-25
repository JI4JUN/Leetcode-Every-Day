import { Call } from '../index';

describe('Cal function', () => {
    function testFunction() {
        return 'testValue';
    }

    test('Call callable function without argumentsList', () => {
        expect(Call(testFunction, undefined)).toBe('testValue');
    });

    test('Call callable function with argumentsList', () => {
        const argumentsList = [1, 2, 3];

        function sum(a, b, c) {
            return a + b + c;
        }

        expect(Call(sum, undefined, argumentsList)).toBe(6);
    });

    test('Throws TypeError for non-callable function', () => {
        expect(() => {
            Call({}, undefined);
        }).toThrow(TypeError);

        expect(() => {
            Call(null, undefined);
        }).toThrow(TypeError);

        expect(() => {
            Call(undefined, undefined);
        }).toThrow(TypeError);

        expect(() => {
            Call('string', undefined);
        }).toThrow(TypeError);
    });

    test('Uses empty argumentsList when not provided', () => {
        function checkArgumentsList() {
            return arguments.length;
        }

        expect(Call(checkArgumentsList, undefined)).toBe(0);
    });
});
