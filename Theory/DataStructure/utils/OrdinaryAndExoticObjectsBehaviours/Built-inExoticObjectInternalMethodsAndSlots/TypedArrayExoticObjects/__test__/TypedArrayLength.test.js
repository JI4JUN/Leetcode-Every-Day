import { TypedArrayLength } from '../TypedArrayLength';

describe('TypedArrayLength function', () => {
    test('Should return the length directly when not AUTO', () => {
        const buffer = new ArrayBuffer(16);
        const int8Array = new Int8Array(buffer, 0, 8);
        const taRecord = {
            object: int8Array,
            cachedBufferByteLength: buffer.byteLength
        };

        expect(TypedArrayLength(taRecord)).toBe(8);
    });

    test('Should calculate length when length is AUTO', () => {
        const buffer = new ArrayBuffer(16);
        const int8Array = new Int8Array(buffer, 4);

        const taRecord = {
            object: int8Array,
            cachedBufferByteLength: buffer.byteLength
        };

        Object.defineProperty(buffer, 'resizable', { value: true });
        Object.defineProperty(int8Array, 'length', { value: undefined });

        expect(TypedArrayLength(taRecord)).toBe(12);
    });

    test('Should throw an TypeError if TypedArray is out of bounds', () => {
        const buffer = new ArrayBuffer(10);
        const int8Array = new Int8Array(buffer, 8, 2);

        Object.defineProperty(int8Array, 'length', { value: 5 });

        const taRecord = {
            object: int8Array,
            cachedBufferByteLength: buffer.byteLength
        };

        expect(() => TypedArrayLength(taRecord)).toThrow(Error);
    });

    test('Should throw an TypeError if the buffer is detached', () => {
        const buffer = new ArrayBuffer(16);
        const int8Array = new Int8Array(buffer, 4);

        const taRecord = {
            object: int8Array,
            cachedBufferByteLength: 'DETACHED'
        };

        expect(() => TypedArrayLength(taRecord)).toThrow(Error);
    });
});
