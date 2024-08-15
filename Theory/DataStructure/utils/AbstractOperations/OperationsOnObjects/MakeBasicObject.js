import { tinyForEach, tinyIncludes } from 'Array';

Array.prototype.tinyForEach = tinyForEach;
Array.prototype.tinyIncludes = tinyIncludes;

/**
 * https://tc39.es/ecma262/#sec-makebasicobject
 *
 * The abstract operation MakeBasicObject factors out common steps used in creating all objects,
 * and centralizes object creation.
 *
 * ```markdown
 * Steps:
 * 1. Set internalSlotsList to the list-concatenation of internalSlotsList and « [[PrivateElements]] ».
 * 2. Let obj be a newly created object with an internal slot for each name in internalSlotsList.
 * 3. Set obj.[[PrivateElements]] to a new empty List.
 * 4. Set obj's essential internal methods to the default ordinary object definitions specified in 10.1.
 * 5. Assert: If the caller will not be overriding both obj's [[GetPrototypeOf]] and [[SetPrototypeOf]] essential internal methods, then internalSlotsList contains [[Prototype]].
 * 6. Assert: If the caller will not be overriding all of obj's [[SetPrototypeOf]], [[IsExtensible]], and [[PreventExtensions]] essential internal methods, then internalSlotsList contains [[Extensible]].
 * 7. If internalSlotsList contains [[Extensible]], set obj.[[Extensible]] to true.
 * 8. Return obj.
 * ```
 * @param {*} internalSlotsList A List of internal slot names.
 * @returns An Object.
 */
export function MakeBasicObject(internalSlotsList) {
    internalSlotsList = [...internalSlotsList, 'PrivateElements'];

    const obj = new Object();

    internalSlotsList.tinyForEach((slot) => {
        obj[slot] = undefined;
    });

    obj['PrivateElements'] = [];
    obj['Extensible'] = internalSlotsList.includes('Extensible');
    obj['GetPrototypeOf'] = Object.getPrototypeOf;
    obj['SetPrototypeOf'] = Object.setPrototypeOf;
    obj['IsExtensible'] = Object.isExtensible;
    obj['PreventExtensions'] = Object.preventExtensions;

    return obj;
}
