import { tinyPush } from '../index';

describe('Array.prototype.push', () => {
    Array.prototype.tinyPush = tinyPush;

    /**
     * The following code creates the sports array containing two elements,
     * then appends two elements to it. The total variable contains the
     * new length of the array.
     */
    test('Adding elements to an array', () => {
        const sports = ['soccer', 'baseball'];
        const total = sports.tinyPush('football', 'swimming');

        expect(sports).toStrictEqual([
            'soccer',
            'baseball',
            'football',
            'swimming'
        ]);
        expect(total).toBe(4);
    });

    /**
     * This example uses spread syntax to push all elements from a second array
     * into the first one.
     */
    test('Merging two arrays', () => {
        const vegetables = ['parsnip', 'potato'];
        const moreVegs = ['celery', 'beetroot'];

        vegetables.tinyPush(...moreVegs);

        expect(vegetables).toStrictEqual([
            'parsnip',
            'potato',
            'celery',
            'beetroot'
        ]);
    });

    /**
     * The push() method reads the length property of this. It then sets each index of
     * this starting at length with the arguments passed to push(). Finally, it sets
     * the length to the previous length plus the number of pushed elements.
     */
    test('Calling push() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            unrelated: 'foo',
            2: 4
        };
        const plainObj = {};

        Array.prototype.tinyPush.call(arrayLike, 1, 2);
        Array.prototype.tinyPush.call(plainObj, 1, 2);

        expect(arrayLike).toStrictEqual({
            2: 4,
            3: 1,
            4: 2,
            length: 5,
            unrelated: 'foo'
        });
        expect(plainObj).toStrictEqual({ 0: 1, 1: 2, length: 2 });
    });

    /**
     * As mentioned above, push is intentionally generic, and we can use that to our advantage.
     * Array.prototype.push can work on an object just fine, as this example shows.
     */
    test('Using an object in an array-like fashions', () => {
        const obj = {
            length: 0,

            addElem(elem) {
                [].tinyPush.call(this, elem);
            }
        };

        obj.addElem({});
        obj.addElem({});

        expect(obj.length).toBe(2);
    });
});
