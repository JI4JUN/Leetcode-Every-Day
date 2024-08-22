import { CreateIteratorResultObject } from 'utils/AbstractOperations/OperationsOnIteratorObeject';
import {
    CreateArrayFromList,
    Get
} from 'utils/AbstractOperations/OperationsOnObjects';
import {
    LengthOfArrayLike,
    ToString
} from 'utils/AbstractOperations/TypeConversion';
import { Assert } from 'utils/Assert';
import { NormalCompletion } from 'utils/ECMAScriptDataTypesAndValues/ECMAScriptSpecificationTypes/TheCompletionRecodSpecificationType';
import {
    IsTypedArrayOutOfBounds,
    TypedArrayLength,
    MakeTypedArrayWithBufferWitnessRecord
} from 'utils/OrdinaryAndExoticObjectsBehaviours/Built-inExoticObjectInternalMethodsAndSlots/TypedArrayExoticObjects';

/**
 * https://tc39.es/ecma262/#sec-createarrayiterator
 *
 * The abstract operation CreateArrayIterator is used to create iterator objects for Array methods that return such iterators.
 *
 * ```markdown
 * 1. Let closure be a new Abstract Closure with no parameters that captures kind and array and performs the following steps when called:
 *     a. Let index be 0.
 *     b. Repeat,
 *         i. If array has a [[TypedArrayName]] internal slot, then
 *             1. Let taRecord be MakeTypedArrayWithBufferWitnessRecord(array, SEQ-CST).
 *             2. If IsTypedArrayOutOfBounds(taRecord) is true, throw a TypeError exception.
 *             3. Let len be TypedArrayLength(taRecord).
 *         ii. Else,
 *             1. Let len be ? LengthOfArrayLike(array).
 *         iii. If index ≥ len, return NormalCompletion(undefined).
 *         iv. Let indexNumber be 𝔽(index).
 *         v. If kind is KEY, then
 *             1. Let result be indexNumber.
 *         vi. Else,
 *             1. Let elementKey be ! ToString(indexNumber).
 *             2. Let elementValue be ? Get(array, elementKey).
 *             3. If kind is VALUE, then
 *                 a. Let result be elementValue.
 *             4. Else,
 *                 a. Assert: kind is KEY+VALUE.
 *                 b. Let result be CreateArrayFromList(« indexNumber, elementValue »).
 *         vii. Perform ? GeneratorYield(CreateIteratorResultObject(result, false)).
 *         viii. Set index to index + 1.
 * 2. Return CreateIteratorFromClosure(closure, "%ArrayIteratorPrototype%", %ArrayIteratorPrototype%).
 * ```
 *
 * @param {*} array A array.
 * @param {*} kind KEY+VALUE, KEY, or VALUE.
 * @returns A Generator.
 */
export function CreateArrayIterator(array, kind) {
    const closure = function* closure() {
        let index = 0;

        while (true) {
            let taRecord;
            let len;

            if (ArrayBuffer.isView(array)) {
                taRecord = MakeTypedArrayWithBufferWitnessRecord(
                    array,
                    'SEQ-CST'
                );

                if (IsTypedArrayOutOfBounds(taRecord)) {
                    throw new TypeError('TypedArray is out of bounds');
                }

                len = TypedArrayLength(taRecord);
            } else {
                len = LengthOfArrayLike(array);
            }

            if (index >= len) {
                return NormalCompletion(undefined).Value;
            }

            let indexNumber = index;
            let result;

            if (kind === 'KEY') {
                result = indexNumber;
            } else {
                const elementKey = ToString(indexNumber);
                const elementValue = Get(array, elementKey);

                if (kind === 'VALUE') {
                    result = elementValue;
                } else {
                    Assert(kind === 'KEY+VALUE');

                    result = CreateArrayFromList([indexNumber, elementValue]);
                }
            }

            yield CreateIteratorResultObject(result, false).value;

            index++;
        }
    };

    return closure();
}
