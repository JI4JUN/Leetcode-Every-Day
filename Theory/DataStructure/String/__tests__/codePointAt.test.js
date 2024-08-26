import { mockCodePointAt } from '../codePointAt';
import { mockMap } from 'Array';

describe('String.prototype.codePointAt', () => {
    String.prototype.mockCodePointAt = mockCodePointAt;
    Array.prototype.mockMap = mockMap;

    test('Using codePointAt()', () => {
        expect('ABC'.mockCodePointAt(0)).toBe(65);
        expect('ABC'.mockCodePointAt(0).toString(16)).toBe('41');
        expect('😍'.mockCodePointAt(0)).toBe(128525);
        expect('\ud83d\ude0d'.mockCodePointAt(0)).toBe(128525);
        expect('\ud83d\ude0d'.mockCodePointAt(0).toString(16)).toBe('1f60d');
        expect('😍'.mockCodePointAt(1)).toBe(56845);
        expect('\ud83d\ude0d'.mockCodePointAt(1)).toBe(56845);
        expect('\ud83d\ude0d'.mockCodePointAt(1).toString(16)).toBe('de0d');
        expect('ABC'.mockCodePointAt(42)).toBeUndefined();
    });

    test('Looping with codePointAt()', () => {
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});
        const str = '\ud83d\udc0e\ud83d\udc71\u2764';

        for (const condePoint of str) {
            console.log(condePoint.mockCodePointAt(0).toString(16));
        }

        expect(consoleSpy).toHaveBeenCalledWith('1f40e');
        expect(consoleSpy).toHaveBeenCalledWith('1f471');
        expect(consoleSpy).toHaveBeenCalledWith('2764');
        expect(
            [...str].mockMap((cp) => cp.mockCodePointAt(0).toString(16))
        ).toEqual(['1f40e', '1f471', '2764']);
    });
});
