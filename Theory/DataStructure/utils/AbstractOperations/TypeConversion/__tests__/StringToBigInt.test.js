import { StringToBigInt } from '../StringToBigInt';

describe('StringToBigInt function', () => {
    test('Should convert valid decimal strings to BigInt', () => {
        expect(StringToBigInt('123')).toBe(123n);
        expect(StringToBigInt('00123')).toBe(123n);
        expect(StringToBigInt('-123')).toBe(-123n);
        expect(StringToBigInt('0')).toBe(0n);
    });

    test('Should handle whitespace correctly', () => {
        expect(StringToBigInt('  456  ')).toBe(456n);
        expect(StringToBigInt('\t\n 789 \n\t')).toBe(789n);
    });

    test('Should convert valid hexadecimal strings to BigInt', () => {
        expect(StringToBigInt('0x1A')).toBe(26n);
        expect(StringToBigInt('0xFF')).toBe(255n);
    });

    test('Should convert valid binary strings to BigInt', () => {
        expect(StringToBigInt('0b101')).toBe(5n);
        expect(StringToBigInt('0b11111111')).toBe(255n);
    });

    test('Should return undefined for invalid strings', () => {
        expect(StringToBigInt('123abc')).toBeUndefined();
        expect(StringToBigInt('abc')).toBeUndefined();
        expect(StringToBigInt('12.34')).toBeUndefined();
    });

    test('Should return undefined for non-numeric characters', () => {
        expect(StringToBigInt('123@456')).toBeUndefined();
        expect(StringToBigInt('NaN')).toBeUndefined();
        expect(StringToBigInt('Infinity')).toBeUndefined();
    });

    test('Should return undefined for strings representing floating point numbers', () => {
        expect(StringToBigInt('1.23')).toBeUndefined();
        expect(StringToBigInt('-1.23')).toBeUndefined();
    });

    test('Should return BigInt for valid numeric strings with leading zeros', () => {
        expect(StringToBigInt('00000123')).toBe(123n);
        expect(StringToBigInt('-00000123')).toBe(-123n);
    });
});
