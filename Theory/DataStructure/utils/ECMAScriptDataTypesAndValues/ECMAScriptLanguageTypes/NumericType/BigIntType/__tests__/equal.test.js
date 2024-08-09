import { equal } from '../equal';

describe('BigInt::equal function', () => {
    test('Should return true if the BigInt value is equal to another BigInt value', () => {
        const a = BigInt(12345678901234567890n);
        const b = BigInt(12345678901234567890n);

        expect(equal(a, b)).toBeTruthy();
    });

    test('Should return false if the given two non-same BigInt values', () => {
        const a = BigInt(12345678901234567891n);
        const b = BigInt(12345678901234567890n);

        expect(equal(a, b)).toBeFalsy();
    });
});
