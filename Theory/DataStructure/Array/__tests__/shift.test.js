import { mockShift } from 'Array/shift';

describe('Array.prototype.shift', () => {
    Array.prototype.mockShift = mockShift;

    /**
     * The following code displays the myFish array before and after removing its first element.
     * It also displays the removed element.
     */
    test('Removing an element from an array', () => {
        const myFish = ['angel', 'clown', 'mandarin', 'surgeon'];
        const shifted = myFish.mockShift();

        expect(myFish).toEqual(['clown', 'mandarin', 'surgeon']);
        expect(shifted).toEqual('angel');
    });

    /**
     * The shift() method is often used in condition inside while loop. In the following example
     * every iteration will remove the next element from an array, until it is empty.
     */
    test('Using shift() method in while loop', () => {
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});
        const names = ['Andrew', 'Tyrone', 'Paul', 'Maria', 'Gayatri'];

        let i;

        while (typeof (i = names.mockShift()) !== 'undefined') {
            console.log(i);
        }

        expect(consoleSpy).toHaveBeenCalledWith('Andrew');
        expect(consoleSpy).toHaveBeenCalledWith('Tyrone');
        expect(consoleSpy).toHaveBeenCalledWith('Paul');
        expect(consoleSpy).toHaveBeenCalledWith('Maria');
        expect(consoleSpy).toHaveBeenCalledWith('Gayatri');
    });

    /**
     * The shift() method reads the length property of this. If the normalized length is 0,
     * length is set to 0 again (whereas it may be negative or undefined before). Otherwise,
     * the property at 0 is returned, and the rest of the properties are shifted left by one.
     * The length property is decremented by one.
     */
    test('Calling shift() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            unrelated: 'foo',
            2: 4
        };

        expect(Array.prototype.mockShift.call(arrayLike)).toBeUndefined();
        expect(arrayLike).toEqual({
            length: 2,
            1: 4,
            unrelated: 'foo'
        });

        const plainObj = {};

        Array.prototype.mockShift.call(plainObj);

        expect(plainObj).toEqual({ length: 0 });
    });
});
