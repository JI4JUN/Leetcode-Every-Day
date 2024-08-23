import { AssertError } from 'utils/Assert';
import { Z } from '../Z';

describe('Z function', () => {
    test('Should return x if the input x is a BigInt', () => {
        const x = 12345678901234567890n;

        expect(Z(x)).toBe(x);
    });

    test('Should throw an error if the input x is not a BigInt', () => {
        const x = 42;

        expect(() => Z(x)).toThrow(AssertError);
    });
});
