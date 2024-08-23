import { OutOfRange } from 'utils/helpers';

/**
 * https://tc39.es/ecma262/#sec-requireobjectcoercible
 *
 * The abstract operation RequireObjectCoercible throws an error if argument is a value
 * that cannot be converted to an Object using ToObject.
 *
 * ```markdown
 * Undefined --- Throw a TypeError exception.
 * Null --- Throw a TypeError exception.
 * Boolean --- Return argument.
 * Number --- Return argument.
 * String --- Return argument.
 * Symbol --- Return argument.
 * BigInt --- Return argument.
 * Object --- Return argument.
 * ```
 *
 * @param {*} argument An ECMAScript language value.
 * @returns Either a normal completion containing an ECMAScript language value or a throw completion.
 */
export function RequireObjectCoercible(argument) {
    if (argument === undefined || argument === null) {
        throw new TypeError(
            `The arugment is ${argument}, requires Object Coercible`
        );
    }

    const type = typeof argument;

    switch (type) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'symbol':
        case 'bigint':
        case 'object':
            return argument;
        default:
            throw new OutOfRange('RequireObjectCoercible', { type, argument });
    }
}
