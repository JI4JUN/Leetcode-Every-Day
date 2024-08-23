export class AssertError extends Error {}

/**
 * https://tc39.es/ecma262/#assert
 *
 * A step that begins with “Assert:” asserts an invariant condition of its algorithm. Such assertions
 * are used to make explicit algorithmic invariants that would otherwise be implicit.
 *
 * @param {*} invariant An invariant condition of its algorithm.
 * @param {*} source Error source.
 */
export function Assert(invariant, source) {
    if (!invariant) {
        throw new AssertError(source ?? '');
    }
}
