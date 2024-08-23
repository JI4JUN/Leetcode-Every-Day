import { RequireObjectCoercible } from '../RequireObjectCoercible';

describe('RequireObjectCoercible function', () => {
    test('Should throw a TypeError if the argument is Undefined or Null', () => {
        const undefinedValue = undefined;
        const nullValue = null;

        expect(() => RequireObjectCoercible(undefinedValue)).toThrow(TypeError);
        expect(() => RequireObjectCoercible(nullValue)).toThrow(TypeError);
    });

    test('Should return argument if the argument is Boolean, Number, String, Symbol, BigInt or Object', () => {
        const booleanValue = true;
        const numberValue = 123;
        const stringValue = 'test';
        const symbolValue = Symbol('symbol');
        const bigintValue = 123n;
        const objectValue = {};

        expect(RequireObjectCoercible(booleanValue)).toBe(booleanValue);
        expect(RequireObjectCoercible(numberValue)).toBe(numberValue);
        expect(RequireObjectCoercible(stringValue)).toBe(stringValue);
        expect(RequireObjectCoercible(symbolValue)).toBe(symbolValue);
        expect(RequireObjectCoercible(bigintValue)).toBe(bigintValue);
        expect(RequireObjectCoercible(objectValue)).toBe(objectValue);
    });
});
