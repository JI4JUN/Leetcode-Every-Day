import { AssertError } from 'utils/Assert';
import { UTF16SurrogatePairToCodePoint } from '../UTF16SurrogatePairToCodePoint';

describe('UTF16SurrogatePairToCodePoint function', () => {
    test('Should throw an error when the lead surrogate is not a valid Unicode code point', () => {
        const lead = 0x1234; // Invalid Unicode code point
        const trail = 0xdc00;

        expect(() => UTF16SurrogatePairToCodePoint(lead, trail)).toThrow(
            AssertError
        );
    });

    test('Should throw an error when the trail surrogate is not a valid Unicode code point', () => {
        const lead = 0xd800; // Valid leading surrogate
        const trail = 0x1234; // Invalid Unicode code point

        expect(() => UTF16SurrogatePairToCodePoint(lead, trail)).toThrow(
            AssertError
        );
    });

    test('Should return the correct code point for the minimum lead surrogate and minimum trail surrogate', () => {
        const lead = 0xd800; // Minimum leading surrogate
        const trail = 0xdc00; // Minimum trailing surrogate
        const expectedCodePoint = 0x10000;
        const actualCodePoint = UTF16SurrogatePairToCodePoint(lead, trail);

        expect(actualCodePoint).toBe(expectedCodePoint);
    });

    test('Should return the correct code point for the maximum lead surrogate and maximum trail surrogate', () => {
        const lead = 0xdbff; // Maximum leading surrogate
        const trail = 0xdfff; // Maximum trailing surrogate
        const expectedCodePoint = 0x10ffff;
        const actualCodePoint = UTF16SurrogatePairToCodePoint(lead, trail);

        expect(actualCodePoint).toBe(expectedCodePoint);
    });
});
