import { AssertError } from 'utils/Assert';
import { Completion } from '../Completion';

describe('Completion function', () => {
    test('Should return a completion record if the argument is a completion record', () => {
        const completionRecord = {
            Type: 'normal',
            Value: 'hello',
            Target: undefined
        };

        expect(Completion(completionRecord)).toEqual(completionRecord);
    });

    test('Should throw an error if the argument is not a completion record', () => {
        const nonCompletionRecord = {
            name: 'John'
        };

        expect(() => Completion(nonCompletionRecord)).toThrow(AssertError);
    });
});
