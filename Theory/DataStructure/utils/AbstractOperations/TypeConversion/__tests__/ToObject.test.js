import { ToObject } from '../ToObject';

describe('ToObject function', () => {
    test('Should convert argument to an Object', () => {
        expect(ToObject({})).toEqual({});
        expect(ToObject([])).toEqual([]);
        expect(ToObject('test')).toEqual(new String('test'));
        expect(ToObject(123)).toEqual(new Number(123));
        expect(ToObject(true)).toEqual(new Boolean(true));
    });

    test('Should throw TypeError for null or undefined arguments', () => {
        expect(() => ToObject(null)).toThrow(TypeError);
        expect(() => ToObject(undefined)).toThrow(TypeError);
    });

    test('Should return the argument itself if it is already an object', () => {
        const obj = {};
        expect(ToObject(obj)).toBe(obj);

        const arr = [];
        expect(ToObject(arr)).toBe(arr);

        const strObj = new String('test');
        expect(ToObject(strObj)).toBe(strObj);

        const numObj = new Number(123);
        expect(ToObject(numObj)).toBe(numObj);

        const boolObj = new Boolean(true);
        expect(ToObject(boolObj)).toBe(boolObj);
    });
});
