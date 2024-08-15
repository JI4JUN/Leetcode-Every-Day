import { CreateArrayFromList } from '../CreateArrayFromList';

describe('CreateArrayFromList function', () => {
    test('Should return an empty array when given an empty list', () => {
        const result = CreateArrayFromList([]);

        expect(result).toEqual([]);
    });

    test('Should create an array with one element', () => {
        const result = CreateArrayFromList([42]);

        expect(result).toEqual([42]);
    });

    test('Should create an array with multiple elements', () => {
        const result = CreateArrayFromList([1, 2, 3, 4, 5]);

        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('Should create an array with mixed types', () => {
        const result = CreateArrayFromList([
            1,
            'two',
            true,
            null,
            undefined,
            { key: 'value' },
            [1, 2, 3]
        ]);

        expect(result).toEqual([
            1,
            'two',
            true,
            null,
            undefined,
            { key: 'value' },
            [1, 2, 3]
        ]);
    });

    test('Should create an array with nested arrays', () => {
        const result = CreateArrayFromList([
            [1, 2],
            [3, 4],
            [5, 6]
        ]);

        expect(result).toEqual([
            [1, 2],
            [3, 4],
            [5, 6]
        ]);
    });

    test('Should handle array-like objects', () => {
        const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
        const result = CreateArrayFromList(Array.from(arrayLike));

        expect(result).toEqual(['a', 'b', 'c']);
    });

    test('Should create an array with complex objects', () => {
        const complexObject = { a: 1, b: { c: 2, d: [3, 4] } };
        const result = CreateArrayFromList([complexObject]);

        expect(result).toEqual([complexObject]);
    });
});
