import { LengthOfArrayLike } from 'utils/AbstractOperations/TypeConversion';
import { MakeTypedArrayWithBufferWitnessRecord } from 'utils/OridinaryAndExoticObjectsBehaviours/Built-inExoticObjectInternalMethodsAndSlots/TypedArrayExoticObjects/MakeTypedArrayWithBufferWithessRecord';

export function CreateArrayIterator(array, kind) {
    return function* () {
        let index = 0;

        while (1) {
            let taRecord;
            let len;

            if (ArrayBuffer.isView(array)) {
                taRecord = MakeTypedArrayWithBufferWitnessRecord(
                    array,
                    'SEQ-CST'
                );
            } else {
                len = LengthOfArrayLike(array);
            }
        }
    };
}
