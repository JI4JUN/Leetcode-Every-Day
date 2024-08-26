import { mockCharCodeAt } from 'String/charCodeAt';

describe('String.prototype.charCodeAt', () => {
    String.prototype.mockCharCodeAt = mockCharCodeAt;

    test('Using charCodeAt()', () => {
        // The following example returns 65, the Unicode value for A.
        expect('ABC'.mockCharCodeAt(0)).toBe(65);

        // charCodeAt() may return lone surrogates, which are not valid Unicode characters.
        const str = '𠮷𠮾';
        expect(str.mockCharCodeAt(0)).toBe(55362);
        expect(str.mockCharCodeAt(1)).toBe(57271);
    });
});
