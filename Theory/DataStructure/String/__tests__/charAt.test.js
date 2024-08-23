import { mockCharAt } from 'String/charAt';

describe('String.prototype.charAt', () => {
    String.prototype.mockCharAt = mockCharAt;

    /**
     * The following example displays characters at different locations in the string "Brave new world":
     */
    test('Using charAt()', () => {
        const anyString = 'Brave new world';

        expect(anyString.mockCharAt()).toBe('B');
        expect(anyString.mockCharAt(0)).toBe('B');
        expect(anyString.mockCharAt(1)).toBe('r');
        expect(anyString.mockCharAt(2)).toBe('a');
        expect(anyString.mockCharAt(3)).toBe('v');
        expect(anyString.mockCharAt(4)).toBe('e');
        expect(anyString.mockCharAt(999)).toBe('');

        const str = '𠮷𠮾';

        expect(str.mockCharAt(0)).toBe('\ud842');
        expect(str.mockCharAt(1)).toBe('\udfb7');
    });
});
