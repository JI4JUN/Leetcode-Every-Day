import { AssertError } from 'utils/Assert';
import { Completion } from '../Completion';
import { ReturnIfAbrupt } from '../ReturnIfAbrupt';

describe('ReturnIfAbrupt function', () => {
    test('Should return a comletion record if the argument is an abrupt completion', () => {
        const abruptCompletion = {
            Type: 'break',
            Value: 'break',
            Target: undefined
        };
        const completionRecord = Completion(abruptCompletion);

        expect(ReturnIfAbrupt(abruptCompletion)).toEqual(completionRecord);
    });

    test('Should return the internal slot [[Value]] of argument if the argument is a normal completion', () => {
        const normalCompletion = {
            Type: 'normal',
            Value: 'normal',
            Target: undefined
        };
        const internalSlotValue = normalCompletion.Value;

        expect(ReturnIfAbrupt(normalCompletion)).toBe(internalSlotValue);
    });

    test('Should thorw an error if the argument is not a completion', () => {
        const nonCompletion = {
            name: 'John'
        };

        expect(() => {
            ReturnIfAbrupt(nonCompletion);
        }).toThrow(AssertError);
    });
});
