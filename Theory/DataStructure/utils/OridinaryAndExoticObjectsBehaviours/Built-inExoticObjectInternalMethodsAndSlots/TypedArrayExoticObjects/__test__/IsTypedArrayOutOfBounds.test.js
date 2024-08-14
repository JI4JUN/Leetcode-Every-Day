import { IsTypedArrayOutOfBounds } from '../IsTypedArrayOutOfBounds';

describe('IsTypedArrayOutOfBounds function', () => {
    test('Should return true if buffer is detached', () => {
        const taRecord = {
            object: new Int8Array(10),
            cachedBufferByteLength: 'DETACHED'
        };

        expect(IsTypedArrayOutOfBounds(taRecord)).toBe(true);
    });

    test('Should return false for in-bounds TypedArray', () => {
        const buffer = new ArrayBuffer(10);
        const int8Array = new Int8Array(buffer, 0, 5);
        const taRecord = {
            object: int8Array,
            cachedBufferByteLength: buffer.byteLength
        };

        expect(IsTypedArrayOutOfBounds(taRecord)).toBe(false);
    });

    test('Should return true for out-of-bounds TypedArray', () => {
        const buffer = new ArrayBuffer(10);
        const int8Array = new Int8Array(buffer, 8, 2);

        Object.defineProperty(int8Array, 'length', { value: 5 });

        const taRecord = {
            object: int8Array,
            cachedBufferByteLength: buffer.byteLength
        };

        expect(IsTypedArrayOutOfBounds(taRecord)).toBe(true);
    });

    test('Should return false for 0-length TypedArray', () => {
        const buffer = new ArrayBuffer(10);
        const int8Array = new Int8Array(buffer, 0, 0);
        const taRecord = {
            object: int8Array,
            cachedBufferByteLength: buffer.byteLength
        };

        expect(IsTypedArrayOutOfBounds(taRecord)).toBe(false);
    });
});
