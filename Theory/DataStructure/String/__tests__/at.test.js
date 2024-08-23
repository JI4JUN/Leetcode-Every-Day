import { mockAt } from 'String/at';

describe('String.prototype.at', () => {
    String.prototype.mockAt = mockAt;

    /**
     * The following example provides a function which returns the last character found in a specified string.
     */
    test('Return the last character of a string', () => {
        function returnLast(arr) {
            return arr.mockAt(-1);
        }

        let invoiceRef = 'myinvoice01';

        expect(returnLast(invoiceRef)).toBe('1');

        invoiceRef = 'myinvoice02';

        expect(returnLast(invoiceRef)).toBe('2');
    });

    /**
     * Here we compare different ways to select the penultimate (last but one) character of a String.
     * Whilst all below methods are valid, it highlights the succinctness and readability of the at() method.
     */
    test('Comparing methods', () => {
        const myString = 'Every green bus drives fast.';
        // note: Should implement my own charAt method in the future.
        const lenghtWay = myString.charAt(myString.length - 2);

        expect(lenghtWay).toBe('t');

        // note: Should implement my own slice method in the future.
        const sliceWay = myString.slice(-2, -1);

        expect(sliceWay).toBe('t');

        const atWay = myString.mockAt(-2);

        expect(atWay).toBe('t');
    });
});
