import { AssertError } from 'utils/Assert';
import { F } from '../F';

describe('F function', () => {
    test('Should return x if the input x is a Number', () => {
        const x = 42;

        expect(F(x)).toBe(x);
    });

    test('Should throw an error if the input x is not a Number', () => {
        const x = 'Hello';

        expect(() => F(x)).toThrow(AssertError);
    });
});
