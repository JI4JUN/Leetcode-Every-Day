// import { callable } from 'utils/helpers';
// import {
//     Completion,
//     CompletionImpl
// } from 'utils/NotationalConventions/AlgorithmConventions/RuntimeSemantics';

// export let createNormalCompletion;

// @callable((_target, _thisArg, [value]) => {
//     return new Completion({ Type: 'normal', Value: value, Target: undefined });
// })
// export class NormalCompletionImpl extends CompletionImpl {
//     constructor(init) {
//         super(init);
//     }

//     static {
//         Object.defineProperty(this, 'name', { value: 'NormalCompletion' });
//         Object.defineProperty(this.prototype, 'Type', { value: 'normal' });

//         createNormalCompletion = (init) => new NormalCompletionImpl(init);
//     }
// }

// export const NormalCompletion = NormalCompletionImpl;

/**
 * https://tc39.es/ecma262/#sec-normalcompletion
 *
 * The abstract operation NormalCompletion is used to return a normal completion with the
 * value of the given value.
 *
 * ```markdown
 * Steps:
 * 1. Return Completion Record { [[Type]]: NORMAL, [[Value]]: value, [[Target]]: EMPTY }.
 * ```
 *
 * @param {*} value Any value except a Completion Record.
 * @returns A normal completion.
 */
export function NormalCompletion(value) {
    return { Type: 'normal', Value: value, Target: undefined };
}
