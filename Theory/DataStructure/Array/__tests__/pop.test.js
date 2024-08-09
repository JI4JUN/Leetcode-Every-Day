import { tinyPop } from '../pop';

describe('Array.prototype.pop', () => {
    Array.prototype.tinyPop = tinyPop;

    /**
     * The following code creates the myFish array containing four elements,
     * then removes its last element.
     */
    test('Removing the last element of an array', () => {
        const myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
        const popped = myFish.tinyPop();

        expect(myFish).toStrictEqual(['angel', 'clown', 'mandarin']);
        expect(popped).toBe('sturgeon');
    });

    /**
     * The pop() method reads the length property of this. If the normalized length is 0,
     * length is set to 0 again (whereas it may be negative or undefined before). Otherwise,
     * the property at length - 1 is returned and deleted.
     *
     */
    test('Calling pop() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            unrelated: 'foo',
            2: 4
        };
        const plainObj = {};

        const res = Array.prototype.tinyPop.call(arrayLike);
        Array.prototype.tinyPop.call(plainObj);

        expect(res).toBe(4);
        expect(arrayLike).toStrictEqual({ length: 2, unrelated: 'foo' });
        expect(plainObj).toStrictEqual({ length: 0 });
    });

    /**
     * We don't create an array to store a collection of objects. Instead, we store the
     * collection on the object itself and use call on Array.prototype.push and
     * Array.prototype.pop to trick those methods into thinking we're dealing with an array.
     */
    test('Using an object in an array-like fashion', () => {
        const collection = {
            length: 0,
            addElements(...elements) {
                return [].push.call(this, ...elements);
            },
            removeElement() {
                return [].tinyPop.call(this);
            }
        };

        collection.addElements(10, 20, 30);
        expect(collection.length).toBe(3);

        collection.removeElement();
        expect(collection.length).toBe(2);
    });
});
