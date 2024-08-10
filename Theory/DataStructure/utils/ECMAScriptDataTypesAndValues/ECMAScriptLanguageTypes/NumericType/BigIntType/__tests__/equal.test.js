import { BigIntType } from '../BigIntType';

describe('BigInt::equal function', () => {
    test('Should return true if the BigInt value is equal to another BigInt value', () => {
        const a = 12345678901234567890n;
        const b = 12345678901234567890n;

        expect(BigIntType.equal(a, b)).toBeTruthy();
    });

    test('Should return false if the given two non-same BigInt values', () => {
        const a = 12345678901234567891n;
        const b = 12345678901234567890n;

        expect(BigIntType.equal(a, b)).toBeFalsy();
    });
});
