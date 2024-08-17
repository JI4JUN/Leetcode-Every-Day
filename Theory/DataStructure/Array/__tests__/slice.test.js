import { tinySlice } from 'Array/slice';

describe('Array.prototype.slice', () => {
    Array.prototype.tinySlice = tinySlice;

    test('Return a portion of an existing array', () => {
        const fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
        const citrus = fruits.tinySlice(1, 3);

        expect(citrus).toEqual(['Orange', 'Lemon']);
    });

    test('Omitting the end parameter', () => {
        const fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'];
        const tropical = fruits.tinySlice(2);

        expect(tropical).toEqual(['Orange', 'Mango', 'Pineapple']);
    });

    test('Using negative indices', () => {
        const fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'];
        const lastTwo = fruits.tinySlice(-2);

        expect(lastTwo).toEqual(['Mango', 'Pineapple']);
    });

    test('Using a positive start index and a negative end index', () => {
        const fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'];
        const sliceExample = fruits.tinySlice(1, -1);

        expect(sliceExample).toEqual(['Banana', 'Orange', 'Mango']);
    });

    /**
     * In the following example, slice creates a new array, newCar, from myCar.
     * Both include a reference to the object myHonda. When the color of myHonda
     * is changed to purple, both arrays reflect the change.
     */
    test('Using slice with arrays of objects', () => {
        const myHonda = {
            color: 'red',
            wheels: 4,
            engine: { cylinders: 4, size: 2.2 }
        };
        const myCar = [myHonda, 2, 'cherry condition', 'purchased 1997'];
        const newCar = myCar.tinySlice(0, 2);

        expect(myCar).toEqual([
            { color: 'red', wheels: 4, engine: { cylinders: 4, size: 2.2 } },
            2,
            'cherry condition',
            'purchased 1997'
        ]);
        expect(newCar).toEqual([
            { color: 'red', wheels: 4, engine: { cylinders: 4, size: 2.2 } },
            2
        ]);
        expect(myCar[0].color).toBe('red');
        expect(newCar[0].color).toBe('red');

        myHonda.color = 'purple';

        expect(myCar[0].color).toBe('purple');
        expect(newCar[0].color).toBe('purple');
    });

    /**
     * The slice() method reads the length property of this. It then reads the integer-keyed
     * properties from start to end and defines them on a newly created array.
     */
    test('Calling slice() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 2,
            1: 3,
            2: 4,
            3: 33
        };

        expect(Array.prototype.tinySlice.call(arrayLike, 1, 3)).toEqual([3, 4]);
    });

    /**
     * The slice() method is often used with bind() and call() to create a utility method
     * that converts an array-like object into an array.
     */
    test('Using slice() to convert array-like objects to arrays', () => {
        const slice = Function.prototype.call.bind(Array.prototype.tinySlice);

        function list() {
            return slice(arguments);
        }

        const list1 = list(1, 2, 3);

        expect(list1).toEqual([1, 2, 3]);
    });

    test('Using slice() on sparse arrays', () => {
        expect([1, 2, , 4, 5].tinySlice(1, 4)).toEqual([2, , 4]);
    });
});
