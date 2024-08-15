import { MakeBasicObject } from 'utils/AbstractOperations/OperationsOnObjects';
import { tinyPush } from 'Array';

Array.prototype.tinyPush = tinyPush;

/**
 * https://tc39.es/ecma262/#sec-ordinaryobjectcreate
 *
 * The abstract operation OrdinaryObjectCreate is used to specify the runtime creation of new ordinary objects.
 *
 * ```markdonw
 * Steps:
 * 1. Let internalSlotsList be « [[Prototype]], [[Extensible]] ».
 * 2. If additionalInternalSlotsList is present, set internalSlotsList to the list-concatenation of internalSlotsList and additionalInternalSlotsList.
 * 3. Let O be MakeBasicObject(internalSlotsList).
 * 4. Set O.[[Prototype]] to proto.
 * 5. Return O.
 * ```
 *
 * @param {*} proto An Object or null.
 * @param {*} additionalInternalSlotsList A List of names of internal slots.
 * @returns An Object.
 */
export function OrdinaryObjectCreate(proto, additionalInternalSlotsList) {
    const internalSlotsList = ['Prototype', 'Extensible'];

    if (additionalInternalSlotsList !== undefined) {
        internalSlotsList.tinyPush(...additionalInternalSlotsList);
    }

    const O = MakeBasicObject(internalSlotsList);

    O.Prototype = proto;

    return O;
}
