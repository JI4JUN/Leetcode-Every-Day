import { mockConcat } from 'String/concat';

describe('String.prototype.concat', () => {
    String.prototype.mockConcat = mockConcat;

    /**
     * The following example combines strings into a new string.
     */
    test('Using concat()', () => {
        const hello = 'Hello, ';

        expect(hello.mockConcat('Kevin', '. Have a nice day.')).toBe(
            'Hello, Kevin. Have a nice day.'
        );

        const greetList = ['Hello', ' ', 'Venkat', '!'];

        expect(''.mockConcat(...greetList)).toBe('Hello Venkat!');
        expect(''.mockConcat({})).toBe('[object Object]');
        expect(''.mockConcat([])).toBe('');
        expect(''.mockConcat(null)).toBe('null');
        expect(''.mockConcat(true)).toBe('true');
        expect(''.mockConcat(4, 5)).toBe('45');
    });
});
