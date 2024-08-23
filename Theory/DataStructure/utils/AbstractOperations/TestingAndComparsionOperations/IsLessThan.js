import { BigIntType } from 'utils/ECMAScriptDataTypesAndValues/ECMAScriptLanguageTypes/NumericType/BigIntType';
import { NumberType } from 'utils/ECMAScriptDataTypesAndValues/ECMAScriptLanguageTypes/NumericType/NumberType';
import { StringToBigInt, ToNumeric, ToPrimitive } from '../TypeConversion';
import { Assert } from 'utils/Assert';
import { R } from 'utils/NotationalConventions/AlgorithmConventions/MathematicalOperations';

/**
 * https://tc39.es/ecma262/#sec-islessthan
 *
 * The abstract operation IsLessThan provides the semantics for the comparison x < y,
 * returning true, false, or undefined (which indicates that at least one operand is NaN).
 *
 * ```markdown
 * Steps:
 * 1. If LeftFirst is true, then
 *     a. Let px be ? ToPrimitive(x, number).
 *     b. Let py be ? ToPrimitive(y, number).
 * 2. Else,
 *     a. NOTE: The order of evaluation needs to be reversed to preserve left to right evaluation.
 *     b. Let py be ? ToPrimitive(y, number).
 *     c. Let px be ? ToPrimitive(x, number).
 * 3. If px is a String and py is a String, then
 *     a. Let lx be the length of px.
 *     b. Let ly be the length of py.
 *     c. For each integer i such that 0 ≤ i < min(lx, ly), in ascending order, do
 *         i. Let cx be the numeric value of the code unit at index i within px.
 *         ii. Let cy be the numeric value of the code unit at index i within py.
 *         iii. If cx < cy, return true.
 *         iv. If cx > cy, return false.
 *     d. If lx < ly, return true. Otherwise, return false.
 * 4. Else,
 *     a. If px is a BigInt and py is a String, then
 *         i. Let ny be StringToBigInt(py).
 *         ii. If ny is undefined, return undefined.
 *         iii. Return BigInt::lessThan(px, ny).
 *     b. If px is a String and py is a BigInt, then
 *         i. Let nx be StringToBigInt(px).
 *         ii. If nx is undefined, return undefined.
 *         iii. Return BigInt::lessThan(nx, py).
 *     c. NOTE: Because px and py are primitive values, evaluation order is not important.
 *     d. Let nx be ? ToNumeric(px).
 *     e. Let ny be ? ToNumeric(py).
 *     f. If Type(nx) is Type(ny), then
 *         i. If nx is a Number, then
 *             1. Return Number::lessThan(nx, ny).
 *         ii. Else,
 *             1. Assert: nx is a BigInt.
 *             2. Return BigInt::lessThan(nx, ny).
 *     g. Assert: nx is a BigInt and ny is a Number, or nx is a Number and ny is a BigInt.
 *     h. If nx or ny is NaN, return undefined.
 *     i. If nx is -∞𝔽 or ny is +∞𝔽, return true.
 *     j. If nx is +∞𝔽 or ny is -∞𝔽, return false.
 *     k. If ℝ(nx) < ℝ(ny), return true; otherwise return false.
 * ```
 *
 * @param {*} x An ECMAScript language value.
 * @param {*} y An ECMAScript language value.
 * @param {*} LeftFirst A Boolean.
 * @returns true, false, or undefined.
 */
export function IsLessThan(x, y, LeftFirst) {
    let px;
    let py;

    if (LeftFirst) {
        px = ToPrimitive(x, 'number');
        py = ToPrimitive(y, 'number');
    } else {
        py = ToPrimitive(y, 'number');
        px = ToPrimitive(x, 'number');
    }

    if (typeof px === 'string' && typeof py === 'string') {
        const lx = px.length;
        const ly = py.length;

        for (let i = 0; i >= 0 && i < Math.min(lx, ly); i++) {
            const cx = px[i];
            const cy = py[i];

            if (cx < cy) {
                return true;
            }

            if (cx > cy) {
                return false;
            }
        }

        if (lx < ly) {
            return true;
        } else {
            return false;
        }
    } else {
        let nx, ny;

        if (typeof px === 'bigint' && typeof py === 'string') {
            ny = StringToBigInt(py);

            if (ny === undefined) {
                return undefined;
            }

            return BigIntType.lessThan(px, ny);
        }

        if (typeof px === 'string' && typeof py === 'bigint') {
            nx = StringToBigInt(px);

            if (nx === undefined) {
                return undefined;
            }

            return BigIntType.lessThan(nx, py);
        }

        nx = ToNumeric(px);
        ny = ToNumeric(py);

        if (typeof nx === typeof ny) {
            if (typeof nx === 'number') {
                return NumberType.lessThan(nx, ny);
            } else {
                Assert(typeof nx === 'bigint');

                return BigIntType.lessThan(nx, ny);
            }
        }

        Assert(
            (typeof nx === 'bigint' && typeof ny === 'number') ||
                (typeof nx === 'number' && typeof ny === 'bigint')
        );

        if (Number.isNaN(nx) || Number.isNaN(ny)) {
            return undefined;
        }

        if (nx === -Infinity || ny === Infinity) {
            return true;
        }

        if (nx === Infinity || ny === -Infinity) {
            return false;
        }

        return R(nx) < R(ny);
    }
}
