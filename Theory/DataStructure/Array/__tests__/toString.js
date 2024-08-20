import { tinyToString } from '../toString';

describe('Array.prototype.toString', () => {
    Array.prototype.tinyToString = tinyToString;

    test('Using toString()', () => {
        const array1 = [1, 2, 'a', '1a'];

        expect(array1.tinyToString()).toBe('1,2,a,1a');
    });

    /**
     * Following the behavior of join(), toString() treats empty slots the same as undefined
     * and produces an extra separator.
     */
    test('Using toString() on sparse arrays', () => {
        expect([1, , 3].tinyToString()).toBe('1,,3');
    });

    /**
     * toString() is generic. It expects this to have a join() method; or, failing that, uses
     * Object.prototype.toString() instead.
     */
    test('Calling toString() on non-array objects', () => {
        expect(Array.prototype.tinyToString.call({ join: () => 1 })).toBe(1);
        expect(
            Array.prototype.tinyToString.call({ join: () => undefined })
        ).toBe(undefined);
        expect(
            Array.prototype.tinyToString.call({ join: 'not function' })
        ).toBe('[object Object]');
    });
});
