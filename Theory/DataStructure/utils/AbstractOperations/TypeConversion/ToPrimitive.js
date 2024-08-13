import { Get, Call, GetMethod } from '../OperationsOnObjects';
import { IsCallable } from '../TestingAndComparsionOperations';

/**
 * ```markdown
 * The abstract operation converts its input argument to a non-Object type.
 * If an object is capable of converting to more than one primitive type,
 * it may use the oprtional hint perferredType to favour that type.
 *
 * Steps:
 * 1. If input is an Object, then
 *     a. Let exoticToPrim be ? GetMethod(input, %Symbol.toPrimitive%).
 *     b. If exoticToPrim is not undefined, then
 *         i. If preferredType is not present, then
 *             1. Let hint be "default".
 *         ii. Else if preferredType is STRING, then
 *             1. Let hint be "string".
 *         iii. Else,
 *             1. Assert: preferredType is NUMBER.
 *             2. Let hint be "number".
 *         iv. Let result be ? Call(exoticToPrim, input, « hint »).
 *         v. If result is not an Object, return result.
 *         vi. Throw a TypeError exception.
 *     c. If preferredType is not present, let preferredType be NUMBER.
 *     d. Return ? OrdinaryToPrimitive(input, preferredType).
 * 2. Return input.
 * ```
 *
 * @param {*} input An ECMAScript language value.
 * @param {*} preferredType Optional argument preferredType (STRING or NUMBER).
 * @returns A non-Object type.
 */
export function ToPrimitive(input, preferredType) {
    if (typeof input !== 'object' || input === null) {
        return input;
    }

    const exoticToPrim = GetMethod(input, Symbol.toPrimitive);

    if (exoticToPrim !== undefined) {
        let hint =
            preferredType === undefined
                ? 'default'
                : preferredType === 'string'
                ? 'string'
                : 'number';

        const result = Call(exoticToPrim, input, [hint]);

        if (typeof result !== 'object') {
            return result;
        }

        throw new TypeError(
            'TypeError: Cannot convert object to primitive value'
        );
    }

    if (preferredType === undefined) {
        preferredType = 'number';
    }

    return OrdinaryToPrimitive(input, preferredType);
}

/**
 * The abstract operation OrdinaryToPrimitive is responsible for converting objects to primitive values.
 *
 * Steps:
 * 1. If hint is STRING, then
 *     a. Let methodNames be « "toString", "valueOf" ».
 * 2. Else,
 *     a. Let methodNames be « "valueOf", "toString" ».
 * 3. For each element name of methodNames, do
 *     a. Let method be ? Get(O, name).
 *     b. If IsCallable(method) is true, then
 *         i. Let result be ? Call(method, O).
 *         ii. If result is not an Object, return result.
 * 4. Throw a TypeError exception.
 *
 * @param {*} O An Object.
 * @param {*} hint 'string' or 'number'.
 * @returns Either a normal completion containing an ECMAScript language value or a throw completion.
 */
export function OrdinaryToPrimitive(O, hint) {
    if (hint === 'string' || hint === 'number') {
        const methodNames =
            hint === 'string'
                ? ['toString', 'valueOf']
                : ['valueOf', 'toString'];

        for (const name of methodNames) {
            const method = Get(O, name);

            if (IsCallable(method)) {
                const result = Call(method, O);

                if (typeof result !== 'object') {
                    return result;
                }
            }
        }

        throw new TypeError('Cannot convert object to primitive');
    } else {
        throw new TypeError('Invalid hint, it must be a string or number');
    }
}
