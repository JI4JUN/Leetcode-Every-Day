import { mockToString } from '../toString';

describe('Array.prototype.toString', () => {
    Array.prototype.mockToString = mockToString;

    test('Using toString()', () => {
        const array1 = [1, 2, 'a', '1a'];

        expect(array1.mockToString()).toBe('1,2,a,1a');
    });

    /**
     * Following the behavior of join(), toString() treats empty slots the same as undefined
     * and produces an extra separator.
     */
    test('Using toString() on sparse arrays', () => {
        expect([1, , 3].mockToString()).toBe('1,,3');
    });

    /**
     * toString() is generic. It expects this to have a join() method; or, failing that, uses
     * Object.prototype.toString() instead.
     */
    test('Calling toString() on non-array objects', () => {
        expect(Array.prototype.mockToString.call({ join: () => 1 })).toBe(1);
        expect(
            Array.prototype.mockToString.call({ join: () => undefined })
        ).toBe(undefined);
        expect(
            Array.prototype.mockToString.call({ join: 'not function' })
        ).toBe('[object Object]');
    });
});
