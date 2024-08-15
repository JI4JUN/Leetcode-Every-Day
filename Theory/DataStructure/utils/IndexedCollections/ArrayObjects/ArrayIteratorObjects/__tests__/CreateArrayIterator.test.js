import { CreateArrayIterator } from '../CreateArrayIterator';

describe('CreateArrayIterator function', () => {
    const testArray = [10, 20, 30, 40];
    let int8Array;

    beforeEach(() => {
        int8Array = new Int8Array([5, 10, 15, 20]);
    });

    test('Should iterate over keys only', () => {
        const iterator = CreateArrayIterator(testArray, 'KEY');
        const result = Array.from(iterator, (value) => value);

        expect(result).toEqual([0, 1, 2, 3]);
    });

    test('Should iterate over values only', () => {
        const iterator = CreateArrayIterator(testArray, 'VALUE');
        const result = Array.from(iterator, (value) => value);

        expect(result).toEqual([10, 20, 30, 40]);
    });

    test('Should iterate over entries (key+value)', () => {
        const iterator = CreateArrayIterator(testArray, 'KEY+VALUE');
        const result = Array.from(iterator, (value) => value);

        expect(result).toEqual([
            [0, 10],
            [1, 20],
            [2, 30],
            [3, 40]
        ]);
    });

    test('Should iterate over TypedArray keys only', () => {
        const iterator = CreateArrayIterator(int8Array, 'KEY');
        const result = Array.from(iterator, (value) => value);

        expect(result).toEqual([0, 1, 2, 3]);
    });

    test('Should iterate over TypedArray values only', () => {
        const iterator = CreateArrayIterator(int8Array, 'VALUE');
        const result = Array.from(iterator, (value) => value);

        expect(result).toEqual([5, 10, 15, 20]);
    });

    test('Should iterate over TypedArray entries (key+value)', () => {
        const iterator = CreateArrayIterator(int8Array, 'KEY+VALUE');
        const result = Array.from(iterator, (value) => value);

        expect(result).toEqual([
            [0, 5],
            [1, 10],
            [2, 15],
            [3, 20]
        ]);
    });

    test('Should handle empty arrays', () => {
        const iterator = CreateArrayIterator([], 'VALUE');
        const result = Array.from(iterator, (value) => value);

        expect(result).toEqual([]);
    });

    test('Should handle empty TypedArrays', () => {
        const emptyTypedArray = new Int8Array(0);
        const iterator = CreateArrayIterator(emptyTypedArray, 'VALUE');
        const result = Array.from(iterator, (value) => value);

        expect(result).toEqual([]);
    });
});
