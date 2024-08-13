import { BigIntType } from '../../ECMAScriptDataTypesAndValues';

/**
 * https://tc39.es/ecma262/#sec-samevaluenonnumber
 *
 * The abstract operation SameValueNonNumber determines whether the non-number value
 * is equal to the another.
 *
 * ```markdown
 * Steps:
 * 1. Assert: Type(x) is Type(y).
 * 2. If x is either null or undefined, return true.
 * 3. If x is a BigInt, then
 *     a. Return BigInt::equal(x, y).
 * 4. If x is a String, then
 *     a. If x and y have the same length and the same code units in the same positions, return true; otherwise, return false.
 * 5. If x is a Boolean, then
 *     a. If x and y are both true or both false, return true; otherwise, return false.
 * 6. NOTE: All other ECMAScript language values are compared by identity.
 * 7. If x is y, return true; otherwise, return false.
 * ```
 *
 * @param {*} x An ECMAScript language value, but not a Number.
 * @param {*} y An ECMAScript language value, but not a Number.
 * @returns A Boolean.
 */
export function SameValueNonNumber(x, y) {
    if (typeof x !== typeof y) {
        return false;
    }

    if (x === null || x === undefined) {
        return true;
    }

    const typeHandlers = {
        bigint: (arg1, arg2) => BigIntType.equal(arg1, arg2),
        string: (arg1, arg2) => {
            if (arg1.length !== arg2.length) {
                return false;
            }

            for (let i = 0; i < arg1.length; i++) {
                if (arg1[i] !== arg2[i]) {
                    return false;
                }
            }

            return true;
        },
        boolean: (arg1, arg2) => arg1 === arg2
    };

    const type = typeof x;
    const handler = typeHandlers[type] ?? ((arg1, arg2) => arg1 === arg2);

    return handler(x, y);
}
