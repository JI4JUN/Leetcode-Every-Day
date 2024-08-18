import { ToNumber } from './ToNumber';
import { ToPrimitive } from './ToPrimitive';

/**
 * https://tc39.es/ecma262/#sec-tonumeric
 *
 * The abstract operation ToNumeric returns value converted to a Number or a BigInt.
 *
 * ```markdown
 * Steps:
 * 1. Let primValue be ? ToPrimitive(value, number).
 * 2. If primValue is a BigInt, return primValue.
 * 3. Return ? ToNumber(primValue).
 * ```
 *
 * @param {*} value An ECMAScript language value.
 * @returns Either a normal completion containing either a Number or a BigInt, or a throw completion.
 */
export function ToNumeric(value) {
    try {
        const primValue = ToPrimitive(value, 'number');

        if (typeof primValue === 'bigint') {
            return primValue;
        }

        return ToNumber(primValue);
    } catch (e) {
        throw new TypeError(
            'TypeError: Cannot convert object to Numeric value'
        );
    }
}
