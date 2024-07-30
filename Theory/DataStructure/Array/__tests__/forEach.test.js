import { tinyforEach } from '../forEach.js';

describe('Array.prototype.forEach', () => {
    Array.prototype.tinyForEach = tinyforEach;

    test('Converting a for loop to forEach', () => {
        const items = ['item1', 'item2', 'item3'];
        const copyItems1 = [];
        const copyItems2 = [];

        for (let i = 0; i < items.length; i++) {
            copyItems1.push(items[i]);
        }

        items.tinyForEach((item) => copyItems2.push(item));

        expect(copyItems1).toStrictEqual(copyItems2);
    });

    test('Using thisArg', () => {
        class Counter {
            constructor() {
                this.sum = 0;
                this.count = 0;
            }

            add(array) {
                array.tinyForEach(function countEntry(entry) {
                    this.sum += entry;
                    ++this.count;
                }, this);
            }
        }

        const obj = new Counter();
        obj.add([2, 5, 9]);

        expect(obj.sum).toBe(16);
        expect(obj.count).toBe(3);
    });

    test('An object copy function', () => {
        const copy = (obj) => {
            const copy = Object.create(Object.getPrototypeOf(obj));
            const propNames = Object.getOwnPropertyNames(obj);

            propNames.tinyForEach((name) => {
                const desc = Object.getOwnPropertyDescriptor(obj, name);
                Object.defineProperty(copy, name, desc);
            });

            return copy;
        };

        const obj1 = { a: 1, b: 2 };
        const obj2 = copy(obj1);

        expect(obj1).not.toBe(obj2);
        expect(obj1).toStrictEqual(obj2);
    });

    test('Flatten an array', () => {
        const flatten = (arr) => {
            const result = [];

            arr.tinyForEach((item) => {
                if (Array.isArray(item)) {
                    result.push(...flatten(item));
                } else {
                    result.push(item);
                }
            });

            return result;
        };

        const nested = [1, 2, 3, [4, 5, [6, 7], 8, 9]];

        expect(flatten(nested)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    test('Using the third argument of callbackFn', () => {
        const processArray = (numbers) => {
            return numbers
                .filter((num) => num > 0)
                .tinyForEach((num, idx, arr) => {
                    console.log(arr[idx - 1], num, arr[idx + 1]);
                });
        };
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});
        const numbers = [3, -1, 1, 4, 1, 5];

        processArray(numbers);

        expect(consoleSpy).toHaveBeenCalledWith(3, 1, 4);
        expect(consoleSpy).toHaveBeenCalledWith(1, 4, 1);
        expect(consoleSpy).toHaveBeenCalledWith(4, 1, 5);
        expect(consoleSpy).toHaveBeenCalledWith(1, 5, undefined);

        consoleSpy.mockRestore();
    });

    test('Using forEach() on sparse arrays', () => {
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});
        const arraySparse = [1, 3, , 7];

        let numCallbackRuns = 0;

        arraySparse.tinyForEach((element) => {
            console.log({ element });

            numCallbackRuns++;
        });

        expect(consoleSpy).toHaveBeenCalledWith({ element: 1 });
        expect(consoleSpy).toHaveBeenCalledWith({ element: 3 });
        expect(consoleSpy).toHaveBeenCalledWith({ element: 7 });
        expect(numCallbackRuns).toBe(3);

        consoleSpy.mockRestore();
    });

    test('Calling forEach() on non-array objects', () => {
        const consoleSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(() => {});
        const arrayLike = {
            length: 3,
            0: 2,
            1: 3,
            2: 4,
            3: 5
        };

        Array.prototype.tinyForEach.call(arrayLike, (x) => console.log(x));

        expect(consoleSpy).toHaveBeenCalledTimes(3);
        expect(consoleSpy).toHaveBeenCalledWith(2);
        expect(consoleSpy).toHaveBeenCalledWith(3);
        expect(consoleSpy).toHaveBeenCalledWith(4);

        consoleSpy.mockRestore();
    });
});
