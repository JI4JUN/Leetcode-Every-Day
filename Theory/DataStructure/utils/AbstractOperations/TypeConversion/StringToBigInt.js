import { Z } from 'utils/NotationalConventions/AlgorithmConventions/MathematicalOperations';

/**
 * https://tc39.es/ecma262/#sec-stringtobigint
 *
 * The abstract operation StringToBigInt is used to convert a string to a BigInteger.
 *
 * ```markdown
 * Steps:
 * 1. Let literal be ParseText(str, StringIntegerLiteral).
 * 2. If literal is a List of errors, return undefined.
 * 3. Let mv be the MV of literal.
 * 4. Assert: mv is an integer.
 * 5. Return ℤ(mv).
 * ```
 *
 * @param {*} str A String.
 * @returns A BigInt or undefined.
 */
export function StringToBigInt(str) {
    try {
        const literal = BigInt(str.trim());

        if (literal === NaN) {
            return undefined;
        }

        return Z(literal);
    } catch (e) {
        return undefined;
    }
}
