import { ToPrimitive } from 'utils/AbstractOperations/TypeConversion';
import { Assert } from 'utils/Assert';

/**
 * https://tc39.es/ecma262/#sec-tonumber
 *
 * ```markdown
 * The abstract operation ToNumber converts argument to a value of type Number.
 *
 * Steps:
 * 1. If argument is a Number, return argument.
 * 2. If argument is either a Symbol or a BigInt, throw a TypeError exception.
 * 3. If argument is undefined, return NaN.
 * 4. If argument is either null or false, return +0𝔽.
 * 5. If argument is true, return 1𝔽.
 * 6. If argument is a String, return StringToNumber(argument).
 * 7. Assert: argument is an Object.
 * 8. Let primValue be ? ToPrimitive(argument, NUMBER).
 * 9. Assert: primValue is not an Object.
 * 10. Return ? ToNumber(primValue).
 * ```
 *
 * @param {*} argument An ECMAScript language value.
 * @returns A value of type Number.
 */
export function ToNumber(argument) {
    if (argument === null) {
        return +0;
    }

    const typeHandlers = {
        number: (arg) => arg,
        symbol: () => {
            throw new TypeError('Cannot convert a Symbol to a Number');
        },
        bigint: () => {
            throw new TypeError('Cannot convert a BigInt to a Number');
        },
        undefined: () => NaN,
        boolean: (arg) => {
            return arg ? 1 : +0;
        },
        string: (arg) => Number(arg)
    };

    const type = typeof argument;
    const handler = typeHandlers[type];

    if (handler) {
        return handler(argument);
    }

    Assert(type === 'object');

    const primValue = ToPrimitive(argument, 'number');

    Assert(typeof primValue !== 'object');

    return ToNumber(primValue);
}
