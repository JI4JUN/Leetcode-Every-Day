import { AssertError } from 'utils/Assert';
import { R } from '../R';

describe('R function', () => {
    test('Should return x if the input x is a Number or BigInt', () => {
        const x1 = 42;
        const x2 = 12345678901234567890n;

        expect(R(x1)).toBe(x1);
        expect(R(x2)).toBe(x2);
    });

    test('Should throw an error if the input x is neither a Number nor BigInt', () => {
        const x = 'Hello';

        expect(() => R(x)).toThrow(AssertError);
    });
});
