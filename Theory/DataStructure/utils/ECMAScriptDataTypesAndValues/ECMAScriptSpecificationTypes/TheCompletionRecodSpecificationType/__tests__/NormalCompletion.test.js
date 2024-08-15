import { NormalCompletion } from '../NormalCompletion';

describe('NormalCompletion function', () => {
    test('Return correct normal completion with the given value', () => {
        const value = 42;
        const completion = NormalCompletion(value);

        expect(completion).toEqual({
            type: 'NORMAL',
            value: 42,
            target: 'EMPTY'
        });
    });
});
