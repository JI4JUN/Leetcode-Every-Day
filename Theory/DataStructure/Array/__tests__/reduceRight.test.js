import { mockReduceRight } from 'Array/reduceRight';
import { mockReduce } from 'Array/reduce';

describe('Array.prototype.reduceRight', () => {
    Array.prototype.mockReduceRight = mockReduceRight;
    Array.prototype.mockReduce = mockReduce;

    test('How reduceRight() works without an initial value', () => {
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        [0, 1, 2, 3, 4].mockReduceRight(
            (accumulator, currentValue, index, _array) => {
                const returns = accumulator + currentValue;

                console.log(
                    `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`
                );

                return returns;
            }
        );

        expect(consoleSpy).toHaveBeenCalledWith(
            'accumulator: 4, currentValue: 3, index: 3, returns: 7'
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            'accumulator: 7, currentValue: 2, index: 2, returns: 9'
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            'accumulator: 9, currentValue: 1, index: 1, returns: 10'
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            'accumulator: 10, currentValue: 0, index: 0, returns: 10'
        );
    });

    test('How reduceRight() works with an initial value', () => {
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        [0, 1, 2, 3, 4].mockReduceRight(
            (accumulator, currentValue, index, _array) => {
                const returns = accumulator + currentValue;

                console.log(
                    `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`
                );

                return returns;
            },
            10
        );

        expect(consoleSpy).toHaveBeenCalledWith(
            'accumulator: 10, currentValue: 4, index: 4, returns: 14'
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            'accumulator: 14, currentValue: 3, index: 3, returns: 17'
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            'accumulator: 17, currentValue: 2, index: 2, returns: 19'
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            'accumulator: 19, currentValue: 1, index: 1, returns: 20'
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            'accumulator: 20, currentValue: 0, index: 0, returns: 20'
        );
    });

    test('Sum up all values within an array', () => {
        const sum = [0, 1, 2, 3].mockReduceRight((a, b) => a + b);

        expect(sum).toBe(6);
    });

    test('Run a list of asynchronous functions with callbacks in series each passing their results to the next', () => {
        const waterfall =
            (...functions) =>
            (callback, ...args) =>
                functions.mockReduceRight(
                    (composition, fn) =>
                        (...results) =>
                            fn(composition, ...results),
                    callback
                )(...args);
        const add5 = (callback, x) => {
            callback(x + 5);
        };
        const mult3 = (callback, x) => {
            callback(x * 3);
        };
        const sub2 = (callback, x) => {
            callback(x - 2);
        };
        const split = (callback, x) => {
            callback(x, x);
        };
        const add = (callback, x, y) => {
            callback(x + y);
        };
        const div4 = (callback, x) => {
            callback(x / 4);
        };
        const computation = waterfall(add5, mult3, sub2, split, add, div4);

        computation((res) => expect(res).toBe(14), 5);
    });

    test('Difference between reduce and reduceRight', () => {
        const a = ['1', '2', '3', '4', '5'];
        const left = a.mockReduce((prev, cur) => prev + cur);
        const right = a.mockReduceRight((prev, cur) => prev + cur);

        expect(left).toBe('12345');
        expect(right).toBe('54321');
    });

    /**
     * Function composition is a mechanism for combining functions, in which the output of
     * each function is passed into the next one, and the output of the last function is the
     * final result. In this example we use reduceRight() to implement function composition.
     */
    test('Defining composable functions', () => {
        const compose =
            (...args) =>
            (value) =>
                args.mockReduceRight((acc, fn) => fn(acc), value);
        const inc = (n) => n + 1;
        const double = (n) => n * 2;

        expect(compose(double, inc)(2)).toBe(6);
        expect(compose(inc, double)(2)).toBe(5);
    });

    /**
     * reduceRight() skips missing elements in sparse arrays, but it does not skip undefined values.
     */
    test('Using reduceRight() with sparse arrays', () => {
        expect([1, 2, , 4].mockReduceRight((a, b) => a + b)).toBe(7);
        expect([1, 2, undefined, 4].mockReduceRight((a, b) => a + b)).toBeNaN();
    });

    /**
     * The reduceRight() method reads the length property of this and then accesses each property whose
     * key is a nonnegative integer less than length.
     */
    test('Calling reduceRight() on non-array objects', () => {
        const arrayLike = {
            length: 3,
            0: 2,
            1: 3,
            2: 4,
            3: 99
        };

        expect(
            Array.prototype.mockReduceRight.call(arrayLike, (x, y) => x - y)
        ).toBe(-1);
    });
});
