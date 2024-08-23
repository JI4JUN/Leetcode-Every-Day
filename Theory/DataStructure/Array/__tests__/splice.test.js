import { mockSplice } from '../splice';

describe('Array.prototype.splice', () => {
    Array.prototype.mockSplice = mockSplice;

    test('Remove 0 (zero) elements before index 2, and insert "drum"', () => {
        const myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
        const removed = myFish.mockSplice(2, 0, 'drum');

        expect(myFish).toEqual([
            'angel',
            'clown',
            'drum',
            'mandarin',
            'sturgeon'
        ]);
        expect(removed).toEqual([]);
    });

    test('Remove 0 (zero) elements before index 2, and insert "drum" and "guitar"', () => {
        const myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
        const removed = myFish.mockSplice(2, 0, 'drum', 'guitar');

        expect(myFish).toEqual([
            'angel',
            'clown',
            'drum',
            'guitar',
            'mandarin',
            'sturgeon'
        ]);
        expect(removed).toEqual([]);
    });

    /**
     * splice(0, 0, ...elements) inserts elements at the start of the array like unshift().
     */
    test('Remove 0 (zero) elements at index 0, and insert "angel"', () => {
        const myFish = ['clown', 'mandarin', 'sturgeon'];
        const removed = myFish.mockSplice(0, 0, 'angel');

        expect(myFish).toEqual(['angel', 'clown', 'mandarin', 'sturgeon']);
        expect(removed).toEqual([]);
    });

    /**
     * splice(array.length, 0, ...elements) inserts elements at the end of the array like push().
     */
    test('Remove 0 (zero) elements at last index, and insert "sturgeon"', () => {
        const myFish = ['angel', 'clown', 'mandarin'];
        const removed = myFish.mockSplice(myFish.length, 0, 'sturgeon');

        expect(myFish).toEqual(['angel', 'clown', 'mandarin', 'sturgeon']);
        expect(removed).toEqual([]);
    });

    test('Remove 1 element at index 3', () => {
        const myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
        const removed = myFish.mockSplice(3, 1);

        expect(myFish).toEqual(['angel', 'clown', 'drum', 'sturgeon']);
        expect(removed).toEqual(['mandarin']);
    });

    test('Remove 1 element at index 2, and insert "trumpet"', () => {
        const myFish = ['angel', 'clown', 'drum', 'sturgeon'];
        const removed = myFish.mockSplice(2, 1, 'trumpet');

        expect(myFish).toEqual(['angel', 'clown', 'trumpet', 'sturgeon']);
        expect(removed).toEqual(['drum']);
    });

    test('Remove 2 elements from index 0, and insert "parrot", "anemone" and "blue"', () => {
        const myFish = ['angel', 'clown', 'trumpet', 'sturgeon'];
        const removed = myFish.mockSplice(0, 2, 'parrot', 'anemone', 'blue');

        expect(myFish).toEqual([
            'parrot',
            'anemone',
            'blue',
            'trumpet',
            'sturgeon'
        ]);
        expect(removed).toEqual(['angel', 'clown']);
    });

    test('Remove 2 elements, starting from index 2', () => {
        const myFish = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'];
        const removed = myFish.mockSplice(2, 2);

        expect(myFish).toEqual(['parrot', 'anemone', 'sturgeon']);
        expect(removed).toEqual(['blue', 'trumpet']);
    });

    test('Remove 1 element from index -2', () => {
        const myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
        const removed = myFish.mockSplice(-2, 1);

        expect(myFish).toEqual(['angel', 'clown', 'sturgeon']);
        expect(removed).toEqual(['mandarin']);
    });

    test('Remove all elements, starting from index 2', () => {
        const myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
        const removed = myFish.mockSplice(2);

        expect(myFish).toEqual(['angel', 'clown']);
        expect(removed).toEqual(['mandarin', 'sturgeon']);
    });

    /**
     * The splice() method preserves the array's sparseness.
     */
    test('Using splice() on sparse arrays', () => {
        const arr = [1, , 3, 4, , 6];

        expect(arr.mockSplice(1, 2)).toEqual([, 3]);
        expect(arr).toEqual([1, 4, , 6]);
    });

    /**
     * The splice() method reads the length property of this. It then updates the integer-keyed properties and
     * the length property as needed.
     */
    test('Calling splice() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            unrelated: 'foo',
            0: 5,
            2: 4
        };

        expect(Array.prototype.mockSplice.call(arrayLike, 0, 1, 2, 3)).toEqual([
            5
        ]);
        expect(arrayLike).toEqual({
            0: 2,
            1: 3,
            3: 4,
            length: 4,
            unrelated: 'foo'
        });
    });
});
