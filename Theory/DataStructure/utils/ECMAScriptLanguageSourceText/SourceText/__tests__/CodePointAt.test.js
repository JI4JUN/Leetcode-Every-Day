import { AssertError } from 'utils/Assert';
import { CodePointAt } from '../CodePointAt';

describe('CodePointAt function', () => {
    test('Should handle empty string input', () => {
        const inputString = '';
        const position = 0;

        expect(() => CodePointAt(inputString, position)).toThrow(AssertError);
    });

    test('Should return correct result for single code unit character', () => {
        const inputString = 'a';
        const position = 0;
        const expectedResult = {
            CodePoint: 97,
            CodeUnitCount: 1,
            IsUnpairedSurrogate: false
        };
        const result = CodePointAt(inputString, position);

        expect(result).toEqual(expectedResult);
    });

    test('Should return correct result for a string', () => {
        const inputString = 'abc';
        const position = 1;
        const expectedResult = {
            CodePoint: 98,
            CodeUnitCount: 1,
            IsUnpairedSurrogate: false
        };
        const result = CodePointAt(inputString, position);

        expect(result).toEqual(expectedResult);
    });
});
