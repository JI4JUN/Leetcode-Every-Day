import { IsLessThan } from '../IsLessThan';

describe('isLessThan function', () => {
    test('Basic number comparison', () => {
        expect(IsLessThan(2, 3, true)).toBeTruthy();
        expect(IsLessThan(3, 2, true)).toBeFalsy();
        expect(IsLessThan(3, 3, true)).toBeFalsy();
    });

    test('String comparison', () => {
        expect(IsLessThan('abc', 'abcd', true)).toBeTruthy();
        expect(IsLessThan('abc', 'abb', true)).toBeFalsy();
        expect(IsLessThan('abc', 'abc', true)).toBeFalsy();
    });

    test('Mixed type comparison: Number and String', () => {
        expect(IsLessThan(123, '124', true)).toBeTruthy();
        expect(IsLessThan('125', 124, true)).toBeFalsy();
        expect(IsLessThan('123', 123, true)).toBeFalsy();
    });

    test('Comparison with BigInt and String', () => {
        expect(IsLessThan(123n, '124', true)).toBeTruthy();
        expect(IsLessThan('125', 124n, true)).toBeFalsy();
        expect(IsLessThan('123', 123n, true)).toBeFalsy();
    });

    test('NaN comparison should return undefined', () => {
        expect(IsLessThan(NaN, 1, true)).toBeUndefined();
        expect(IsLessThan(1, NaN, true)).toBeUndefined();
        expect(IsLessThan(NaN, NaN, true)).toBeUndefined();
    });

    test('Infinity and -Infinity', () => {
        expect(IsLessThan(-Infinity, Infinity, true)).toBeTruthy();
        expect(IsLessThan(Infinity, -Infinity, true)).toBeFalsy();
        expect(IsLessThan(Infinity, 1, true)).toBeFalsy();
        expect(IsLessThan(1, -Infinity, true)).toBeFalsy();
        expect(IsLessThan(-Infinity, 1, true)).toBeTruthy();
    });

    test('LeftFirst flag', () => {
        let log = [];

        const a = {
            valueOf() {
                log.push('a');

                return 1;
            }
        };
        const b = {
            valueOf() {
                log.push('b');

                return 2;
            }
        };

        IsLessThan(a, b, true);

        expect(log).toEqual(['a', 'b']);

        log = [];

        IsLessThan(a, b, false);

        expect(log).toEqual(['b', 'a']);
    });
});
