import { MakeTypedArrayWithBufferWitnessRecord } from '../MakeTypedArrayWithBufferWithessRecord';

describe('MakeTypedArrayWithBufferWitnessRecord function', () => {
    let sharedBuffer;
    let int8Array;
    let int16Array;
    let float32Array;

    beforeEach(() => {
        sharedBuffer = new SharedArrayBuffer(16);
        int8Array = new Int8Array(sharedBuffer);
        int16Array = new Int16Array(sharedBuffer);
        float32Array = new Float32Array(sharedBuffer);
    });

    test('Should return the correct witness record for an Int8Array with SEQ-CST order', () => {
        const result = MakeTypedArrayWithBufferWitnessRecord(
            int8Array,
            'SEQ-CST'
        );

        expect(result.object).toBe(int8Array);
        expect(result.cachedBufferByteLength).toBe(16);
    });

    test('Should return the correct witness record for an Int16Array with UNORDERED order', () => {
        const result = MakeTypedArrayWithBufferWitnessRecord(
            int16Array,
            'UNORDERED'
        );

        expect(result.object).toBe(int16Array);
        expect(result.cachedBufferByteLength).toBe(16);
    });

    test('Should return the correct witness record for a Float32Array with SEQ-CST order', () => {
        const result = MakeTypedArrayWithBufferWitnessRecord(
            float32Array,
            'SEQ-CST'
        );

        expect(result.object).toBe(float32Array);
        expect(result.cachedBufferByteLength).toBe(16);
    });

    test('Should return "DETACHED" when the buffer is detached', () => {
        const buffer = new ArrayBuffer(8);
        const int8Array = new Int8Array(buffer);

        buffer.transfer();

        const result = MakeTypedArrayWithBufferWitnessRecord(
            int8Array,
            'SEQ-CST'
        );

        expect(result.object).toBe(int8Array);
        expect(result.cachedBufferByteLength).toBe('DETACHED');
    });

    test('Should handle empty buffers correctly', () => {
        const emptyBuffer = new SharedArrayBuffer(0);
        const emptyArray = new Int8Array(emptyBuffer);
        const result = MakeTypedArrayWithBufferWitnessRecord(
            emptyArray,
            'SEQ-CST'
        );

        expect(result.object).toBe(emptyArray);
        expect(result.cachedBufferByteLength).toBe(0);
    });

    test('Should handle large buffers correctly', () => {
        const largeBuffer = new SharedArrayBuffer(1024 * 1024);
        const largeArray = new Int8Array(largeBuffer);
        const result = MakeTypedArrayWithBufferWitnessRecord(
            largeArray,
            'SEQ-CST'
        );

        expect(result.cachedBufferByteLength).toBe(1024 * 1024);
    });
});
