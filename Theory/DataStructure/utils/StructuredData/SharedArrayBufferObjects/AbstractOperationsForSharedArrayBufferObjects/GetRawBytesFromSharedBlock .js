import { IsNoTearConfiguration } from './IsNoTearConfiguration';
/**
 * The abstract operation GetRawBytesFromSharedBlock is designed to read a sequence of bytes from a shared data block,
 * considering the memory consistency model and atomicity requirements.
 *
 * ```markdown
 * Steps:
 * 1. Let elementSize be the Element Size value specified in Table 69 for Element Type type.
 * 2. Let execution be the [[CandidateExecution]] field of the surrounding agent's Agent Record.
 * 3. Let eventsRecord be the Agent Events Record of execution.[[EventsRecords]] whose [[AgentSignifier]] is AgentSignifier().
 * 4. If isTypedArray is true and IsNoTearConfiguration(type, order) is true, let noTear be true; otherwise let noTear be false.
 * 5. Let rawValue be a List of length elementSize whose elements are nondeterministically chosen byte values.
 * 6. NOTE: In implementations, rawValue is the result of a non-atomic or atomic read instruction on the underlying hardware. The nondeterminism is a semantic prescription of the memory model to describe observable behaviour of hardware with weak consistency.
 * 7. Let readEvent be ReadSharedMemory { [[Order]]: order, [[NoTear]]: noTear, [[Block]]: block, [[ByteIndex]]: byteIndex, [[ElementSize]]: elementSize }.
 * 8. Append readEvent to eventsRecord.[[EventList]].
 * 9. Append Chosen Value Record { [[Event]]: readEvent, [[ChosenValue]]: rawValue } to execution.[[ChosenValues]].
 * 10. Return rawValue.
 * ```
 *
 * @param {*} block A Shared Data Block.
 * @param {*} byteIndex A non-negative integer.
 * @param {*} type A TypedArray element type.
 * @param {*} isTypedArray A Boolean.
 * @param {*} order SEQ-CST or UNORDERED.
 * @returns A List of byte values.
 *
 * https://tc39.es/ecma262/#sec-getrawbytesfromsharedblock
 */
export function GetRawBytesFromSharedBlock(
    block,
    byteIndex,
    type,
    isTypedArray,
    order
) {
    const elementSizeTable = {
        INT8: 1,
        UINT8: 1,
        UINT8CLAMPED: 1,
        INT16: 2,
        UINT16: 2,
        INT32: 4,
        UINT32: 4,
        BIGINT64: 8,
        BIGUINT64: 8,
        FLOAT32: 4,
        FLOAT64: 8
    };

    const elementSize = elementSizeTable[type] || 0;
    const noTear = isTypedArray && IsNoTearConfiguration(type, order);
    const rawValue = new Uint8Array(elementSize);

    for (let i = 0; i < elementSize; i++) {
        rawValue[i] = noTear
            ? Atomics.load(new Uint8Array(block, byteIndex + i, 1), 0)
            : new Uint8Array(block, byteIndex + i, 1)[0];
    }

    return Array.from(rawValue);
}
