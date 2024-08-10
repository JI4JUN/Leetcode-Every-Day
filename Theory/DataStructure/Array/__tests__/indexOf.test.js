import { tinyIndexOf } from '../indexOf';
import { tinyPush } from '../push';

describe('Array.prototype.indexOf', () => {
    Array.prototype.tinyIndexOf = tinyIndexOf;
    Array.prototype.tinyPush = tinyPush;

    /**
     * The following example uses indexOf() to locate values in an array.
     */
    test('Using indexOf()', () => {
        const array = [2, 9, 9];

        expect(array.tinyIndexOf(2)).toBe(0);
        expect(array.tinyIndexOf(7)).toBe(-1);
        expect(array.tinyIndexOf(9, 2)).toBe(2);
        expect(array.tinyIndexOf(2, -1)).toBe(-1);
        expect(array.tinyIndexOf(2, -3)).toBe(0);

        const array2 = [NaN];
        expect(array2.tinyIndexOf(NaN)).toBe(-1);
    });

    test('Finding all the occurrences of an element', () => {
        const indices = [];
        const array = ['a', 'b', 'a', 'c', 'a', 'd'];
        const element = 'a';

        let idx = array.tinyIndexOf(element);

        while (idx !== -1) {
            indices.tinyPush(idx);
            idx = array.tinyIndexOf(element, idx + 1);
        }

        expect(indices).toEqual([0, 2, 4]);
    });

    test('Finding if an element exists in the array or not and updating the array', () => {
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        function updateVegetablesCollection(veggies, veggie) {
            if (veggies.tinyIndexOf(veggie) === -1) {
                veggies.tinyPush(veggie);

                console.log(`New veggies collection is: ${veggies}`);
            } else {
                console.log(
                    `${veggie} already exists in the veggies collection.`
                );
            }
        }

        const veggies = ['potato', 'tomato', 'chillies', 'green-pepper'];

        updateVegetablesCollection(veggies, 'spinach');
        updateVegetablesCollection(veggies, 'spinach');

        expect(consoleSpy).toHaveBeenCalledWith(
            'New veggies collection is: potato,tomato,chillies,green-pepper,spinach'
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            'spinach already exists in the veggies collection.'
        );
    });

    /**
     * You cannot use indexOf() to search for empty slots in sparse arrays.
     */
    test('Using indexOf() on sparse arrays', () => {
        expect([1, , 3].tinyIndexOf(undefined)).toBe(-1);
    });

    /**
     * The indexOf() method reads the length property of this and then accesses
     * each property whose key is a nonnegative integer less than length.
     */
    test('Calling indexOf() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 2,
            1: 3,
            2: 4,
            3: 5
        };

        expect(Array.prototype.tinyIndexOf.call(arrayLike, 2)).toBe(0);
        expect(Array.prototype.tinyIndexOf.call(arrayLike, 5)).toBe(-1);
    });
});
