import { CreateIteratorResultObject } from '../CreateIteratorResultObject';

describe('CreateIteratorResultObject function', () => {
    test('Should create an iterator result object with given value and done flag', () => {
        const result = CreateIteratorResultObject(42, true);

        expect(result).toEqual({ value: 42, done: true });
    });

    test('Should create an iterator result object with value as null', () => {
        const result = CreateIteratorResultObject(null, false);

        expect(result).toEqual({ value: null, done: false });
    });

    test('Should create an iterator result object with undefined value', () => {
        const result = CreateIteratorResultObject(undefined, true);

        expect(result).toEqual({ value: undefined, done: true });
    });

    test('Should create an iterator result object with a string value', () => {
        const result = CreateIteratorResultObject('test', false);

        expect(result).toEqual({ value: 'test', done: false });
    });

    test('Should create an iterator result object with an object as value', () => {
        const valueObj = { a: 1, b: 2 };
        const result = CreateIteratorResultObject(valueObj, true);

        expect(result).toEqual({ value: valueObj, done: true });
    });

    test('Should create an iterator result object with an array as value', () => {
        const valueArray = [1, 2, 3];
        const result = CreateIteratorResultObject(valueArray, false);

        expect(result).toEqual({ value: valueArray, done: false });
    });

    test('Should ensure that value property is writable, enumerable, and configurable', () => {
        const result = CreateIteratorResultObject(42, true);

        result.value = 100;
        expect(result.value).toBe(100);

        expect(Object.keys(result)).toContain('value');

        delete result.value;
        expect(result.value).toBeUndefined();
    });

    test('Should ensure that done property is writable, enumerable, and configurable', () => {
        const result = CreateIteratorResultObject(42, true);

        result.done = false;
        expect(result.done).toBe(false);

        expect(Object.keys(result)).toContain('done');

        delete result.done;
        expect(result.done).toBeUndefined();
    });
});
