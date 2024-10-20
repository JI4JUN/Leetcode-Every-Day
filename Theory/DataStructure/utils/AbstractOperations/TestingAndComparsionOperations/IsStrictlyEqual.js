import { NumberType } from 'utils/ECMAScriptDataTypesAndValues/ECMAScriptLanguageTypes/NumericType/NumberType';
import { SameValueNonNumber } from 'utils/AbstractOperations/TestingAndComparsionOperations';

/**
 * https://tc39.es/ecma262/#sec-isstrictlyequal
 *
 * The abstract operation IsStrictlyEqual provides the semantics for the === operator.
 *
 * ```markdown
 * Steps:
 * 1. If Type(x) is not Type(y), return false.
 * 2. If x is a Number, then
 *     a. Return Number::equal(x, y).
 * 3. Return SameValueNonNumber(x, y).
 * ```
 *
 * @param {*} x An ECMAScript language value.
 * @param {*} y An ECMAScript language value.
 * @returns A Boolean.
 */
export function IsStrictlyEqual(x, y) {
    if (typeof x !== typeof y) {
        return false;
    }

    if (typeof x === 'number') {
        return NumberType.equal(x, y);
    }

    return SameValueNonNumber(x, y);
}
