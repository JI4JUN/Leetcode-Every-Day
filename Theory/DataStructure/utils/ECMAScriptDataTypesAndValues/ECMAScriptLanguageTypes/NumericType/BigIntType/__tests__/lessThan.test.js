import { BigIntType } from '../BigIntType';

describe('BigInt::lessThan function', () => {
    test('Should return true if a BigInt x is less than another BigInt y', () => {
        const a = 12345678901234567890n;
        const b = 12345678901234567891n;

        expect(BigIntType.lessThan(a, b)).toBeTruthy();
    });
});
