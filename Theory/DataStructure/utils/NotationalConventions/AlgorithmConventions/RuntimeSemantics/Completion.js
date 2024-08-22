import { Assert } from 'utils/Assert';
// import { createNormalCompletion } from 'utils/ECMAScriptDataTypesAndValues/ECMAScriptSpecificationTypes/TheCompletionRecodSpecificationType';
// import { OutOfRange, callable } from 'utils/helpers';

// @callable((_target, _thisArg, [completionRecord]) => {
//     Assert(completionRecord instanceof Completion);

//     return completionRecord;
// })
// export class CompletionImpl {
//     constructor(init) {
//         if (new.target === CompletionImpl) {
//             switch (init.Type) {
//                 case 'normal':
//                     return createNormalCompletion(init);
//                 case 'break':
//                     return createBreakCompletion(init);
//                 case 'continue':
//                     return createContinueCompletion(init);
//                 case 'return':
//                     return createReturnCompletion(init);
//                 case 'throw':
//                     return createThrowCompletion(init);
//                 default:
//                     throw new OutOfRange('new Completion', init);
//             }
//         }

//         const { Type, Value, Target } = init;

//         Assert(new.target.prototype.Type === Type);

//         this.Value = Value;
//         this.Target = Target;
//     }

//     static {
//         Object.defineProperty(this, 'name', { value: 'Completion' });
//     }
// }

// export const Completion = CompletionImpl;

/**
 * https://tc39.es/ecma262/#sec-completion-ao
 *
 * The abstract operation Completion checks whether the given completionRecord is a valid completionRecord.
 *
 * ```markdown
 * Steps:
 * 1. Assert: completionRecord is a Completion Record.
 * 2. Return completionRecord.
 * ```
 *
 * @param {*} completionRecord A Completion Record.
 * @returns A Completion Record.
 */
export function Completion(completionRecord) {
    Assert(
        completionRecord.hasOwnProperty('Type') &&
            completionRecord.hasOwnProperty('Value') &&
            completionRecord.hasOwnProperty('Target')
    );

    return completionRecord;
}
