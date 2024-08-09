import { ToPrimitive } from './ToPrimitive';

/**
 * ```markdown
 * The abstract operation ToString converts argument to a value of type string.
 *
 * Steps:
 * 1. If argument is a String, return argument.
 * 2. If argument is a Symbol, throw a TypeError exception.
 * 3. If argument is undefined, return "undefined".
 * 4. If argument is null, return "null".
 * 5. If argument is true, return "true".
 * 6. If argument is false, return "false".
 * 7. If argument is a Number, return Number::toString(argument, 10).
 * 8. If argument is a BigInt, return BigInt::toString(argument, 10).
 * 9. Assert: argument is an Object.
 * 10. Let primValue be ? ToPrimitive(argument, STRING).
 * 11. Assert: primValue is not an Object.
 * 12. Return ? ToString(primValue).
 * ```
 *
 * @param {*} argument An ECMAScript language value
 * @returns A value of type String.
 */
export function ToString(argument) {
    if (argument === null) {
        return 'null';
    }

    const typeHandlers = {
        string: (arg) => arg,
        symbol: () => {
            throw new TypeError('Cannot convert a Symbol to a String');
        },
        undefined: () => 'undefined',
        boolean: (arg) => (arg ? 'true' : 'false'),
        number: (arg) => Number.prototype.toString.call(arg, 10),
        bigint: (arg) => BigInt.prototype.toString.call(arg, 10),
        object: (arg) => {
            const primValue = ToPrimitive(arg, 'string');

            return ToString(primValue);
        }
    };

    const type = typeof argument;
    const handler = typeHandlers[type];
    if (handler) {
        return handler(argument);
    }

    throw new TypeError('Cannot convert argument to a String');
}
