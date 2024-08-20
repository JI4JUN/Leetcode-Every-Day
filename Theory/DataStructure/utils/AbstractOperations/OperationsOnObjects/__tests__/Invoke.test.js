import { Invoke } from '../Invoke';

describe('Invoke function', () => {
    test('Should call a method on an object with the correct arguments', () => {
        const obj = {
            greet(name) {
                return `Hello, ${name}!`;
            }
        };
        const result = Invoke(obj, 'greet', ['World']);

        expect(result).toBe('Hello, World!');
    });

    test('Should return a method result when called with no argumentsList', () => {
        const obj = {
            greet() {
                return 'Hello!';
            }
        };
        const result = Invoke(obj, 'greet');

        expect(result).toBe('Hello!');
    });

    test('Should throw an error when method is not a function', () => {
        const obj = {
            notAFunction: 'This is not a function'
        };

        expect(() => Invoke(obj, 'notAFunction')).toThrow(TypeError);
    });

    test('Should throw an error when property does not exist', () => {
        const obj = {
            greet() {
                return 'Hello!';
            }
        };

        expect(() => Invoke(obj, 'nonExistentMethod')).toThrow(TypeError);
    });

    test('Should work with array methods', () => {
        const arr = [1, 2, 3];
        const result = Invoke(arr, 'reduce', [(acc, curr) => acc + curr, 0]);

        expect(result).toBe(6);
    });

    test('Should work with string methods', () => {
        const str = 'hello';
        const result = Invoke(str, 'toUpperCase');

        expect(result).toBe('HELLO');
    });

    test('Should work with number methods', () => {
        const num = 123.456;
        const result = Invoke(num, 'toFixed', [2]);

        expect(result).toBe('123.46');
    });

    test('Should throw an error if V is null or undefined', () => {
        expect(() => Invoke(null, 'toString')).toThrow(TypeError);
        expect(() => Invoke(undefined, 'toString')).toThrow(TypeError);
    });

    test('Should use the correct "this" value when invoking a method', () => {
        const obj = {
            value: 42,
            getValue() {
                return this.value;
            }
        };
        const result = Invoke(obj, 'getValue');

        expect(result).toBe(42);
    });

    test('Should call inherited methods from the prototype chain', () => {
        const parent = {
            sayHello() {
                return 'Hello from parent!';
            }
        };

        const child = Object.create(parent);
        const result = Invoke(child, 'sayHello');

        expect(result).toBe('Hello from parent!');
    });

    test('Should throw an error if the property key is a symbol and the method is not found', () => {
        const symbolKey = Symbol('myMethod');
        const obj = {
            [symbolKey]() {
                return 'Method called';
            }
        };

        expect(() => Invoke(obj, Symbol('nonExistentMethod'))).toThrow(
            TypeError
        );
    });

    test('Should correctly invoke a method using a symbol as a property key', () => {
        const symbolKey = Symbol('myMethod');
        const obj = {
            [symbolKey]() {
                return 'Method called';
            }
        };
        const result = Invoke(obj, symbolKey);

        expect(result).toBe('Method called');
    });
});
