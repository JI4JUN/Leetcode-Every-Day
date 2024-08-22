import { NormalCompletion } from '../NormalCompletion';

describe('NormalCompletion function', () => {
    test('Return correct normal completion with the given value', () => {
        const value = 42;
        const completion = NormalCompletion(value);

        expect(completion.Type).toBe('normal');
        expect(completion.Value).toBe(42);
        expect(completion.Target).toBe(undefined);
    });
});
