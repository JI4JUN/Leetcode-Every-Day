import { mockReduce } from 'Array/reduce';

describe('Array.prototype.reduce', () => {
    Array.prototype.mockReduce = mockReduce;

    /**
     * The code below shows what happens if we call reduce() with an array and no initial value.
     */
    test('How reduce() works without an initial value', () => {
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});
        const array = [15, 16, 17, 18, 19];

        function reducer(accumulator, currentValue, index) {
            const returns = accumulator + currentValue;

            console.log(
                `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`
            );

            return returns;
        }

        array.mockReduce(reducer);

        expect(consoleSpy).toHaveBeenCalledWith(
            'accumulator: 15, currentValue: 16, index: 1, returns: 31'
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            'accumulator: 31, currentValue: 17, index: 2, returns: 48'
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            'accumulator: 48, currentValue: 18, index: 3, returns: 66'
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            'accumulator: 66, currentValue: 19, index: 4, returns: 85'
        );
    });

    /**
     * Here we reduce the same array using the same algorithm, but with an initialValue of
     * 10 passed as the second argument to reduce().
     */
    test('How reduce() works with an initial value', () => {
        const result = [15, 16, 17, 18, 19].mockReduce(
            (accumulator, currentValue) => accumulator + currentValue,
            10
        );

        expect(result).toBe(95);
    });

    /**
     * To sum up the values contained in an array of objects, you must supply an initialValue,
     * so that each item passes through your function.
     */
    test('Sum of values in an object array', () => {
        const objects = [{ x: 1 }, { x: 2 }, { x: 3 }];
        const sum = objects.mockReduce(
            (accumulator, currentValue) => accumulator + currentValue.x,
            0
        );

        expect(sum).toBe(6);
    });

    /**
     * The pipe function takes a sequence of functions and returns a new function.
     * When the new function is called with an argument, the sequence of functions are
     * called in order, which each one receiving the return value of the previous function.
     */
    test('Function sequential piping', () => {
        const pipe =
            (...functions) =>
            (initialValue) =>
                functions.mockReduce((acc, fn) => fn(acc), initialValue);
        const double = (x) => 2 * x;
        const triple = (x) => 3 * x;
        const quadruple = (x) => 4 * x;
        const multiply6 = pipe(double, triple);
        const multiply9 = pipe(triple, triple);
        const multiply16 = pipe(quadruple, quadruple);
        const multiply24 = pipe(double, triple, quadruple);

        expect(multiply6(6)).toBe(36);
        expect(multiply9(9)).toBe(81);
        expect(multiply16(16)).toBe(256);
        expect(multiply24(10)).toBe(240);
    });

    /**
     * Promise sequencing is essentially function piping demonstrated in the previous section,
     * except done asynchronously.
     */
    test('Running promises in sequence', async () => {
        const asyncPipe1 =
            (...functions) =>
            (initialValue) =>
                functions.mockReduce(
                    (acc, fn) => acc.then(fn),
                    Promise.resolve(initialValue)
                );
        const p1 = async (a) => a * 5;
        const p2 = async (a) => a * 2;
        const f3 = (a) => a * 3;
        const p4 = async (a) => a * 4;

        expect(await asyncPipe1(p1, p2, f3, p4)(10)).toBe(1200);

        const asyncPipe2 =
            (...functions) =>
            (initialValue) =>
                functions.mockReduce(
                    async (acc, fn) => fn(await acc),
                    initialValue
                );

        expect(await asyncPipe2(p1, p2, f3, p4)(10)).toBe(1200);
    });

    /**
     * reduce() skips missing elements in sparse arrays, but it does not skip undefined values.
     */
    test('Using reduce() with sparse arrays', () => {
        expect([1, 2, , 4].mockReduce((a, b) => a + b)).toBe(7);
        expect([1, 2, undefined, 4].mockReduce((a, b) => a + b)).toBe(NaN);
    });

    /**
     * The reduce() method reads the length property of this and then accesses each property whose
     * key is a nonnegative integer less than length.
     */
    test('Calling reduce() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 2,
            1: 3,
            2: 4,
            3: 99
        };

        expect(
            Array.prototype.mockReduce.call(arrayLike, (x, y) => x + y)
        ).toBe(9);
    });
});
