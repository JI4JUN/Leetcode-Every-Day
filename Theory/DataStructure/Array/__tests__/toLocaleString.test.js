import { mockToLocaleString } from 'Array/toLocaleString';

describe('Array.prototype.toLocaleString', () => {
    Array.prototype.mockToLocaleString = mockToLocaleString;

    /**
     * Always display the currency for the strings and numbers in the prices array.
     */
    test('Using locales and options', () => {
        const prices = ['￥7', 500, 8123, 12];

        expect(
            prices.mockToLocaleString('ja-JP', {
                style: 'currency',
                currency: 'JPY'
            })
        ).toBe('￥7,￥500,￥8,123,￥12');
    });

    /**
     * toLocaleString() treats empty slots the same as undefined and produces an extra separator.
     */
    test('Using toLocaleString() on sparse arrays', () => {
        expect([1, , 3].mockToLocaleString()).toBe('1,,3');
    });

    test('Calling toLocaleString() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 1,
            1: 2,
            2: 3,
            3: 4
        };

        expect(Array.prototype.mockToLocaleString.call(arrayLike)).toBe(
            '1,2,3'
        );
    });
});
