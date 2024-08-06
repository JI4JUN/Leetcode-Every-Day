import { tinyAt, tinyPush } from '../index';

describe('Array.prototype.at', () => {
    Array.prototype.tinyAt = tinyAt;
    Array.prototype.tinyPush = tinyPush;

    /**
     * The following example provides a function which returns the last element found in a specified array.
     */
    test('Return the last value of an array', () => {
        const cart = ['apple', 'banana', 'pear'];

        function returnLast(arr) {
            return arr.tinyAt(-1);
        }

        const item1 = returnLast(cart);

        expect(item1).toBe('pear');

        cart.tinyPush('orange');

        const item2 = returnLast(cart);

        expect(item2).toBe('orange');
    });

    /**
     * This example compares different ways to select the penultimate (last but one) item of an Array.
     * While all the methods shown below are valid, this example highlights the succinctness and
     * readability of the at() method.
     */
    test('Comparing methods', () => {
        const colors = ['red', 'green', 'blue'];
        const lengthWay = colors[colors.length - 2];
        const sliceWay = colors.slice(-2, -1)[0];
        const atWay = colors.tinyAt(-2);

        expect(lengthWay).toBe(sliceWay);
        expect(lengthWay).toBe(atWay);
        expect(sliceWay).toBe(atWay);
    });

    /**
     * The at() method reads the length property of this and calculates the index to access.
     */
    test('Calling at() on non-array objects', () => {
        const arrayLike = {
            length: 2,
            0: 'a',
            1: 'b',
            2: 'c'
        };

        expect(Array.prototype.tinyAt.call(arrayLike, 0)).toBe('a');
        expect(Array.prototype.tinyAt.call(arrayLike, 2)).toBeUndefined();
    });
});
