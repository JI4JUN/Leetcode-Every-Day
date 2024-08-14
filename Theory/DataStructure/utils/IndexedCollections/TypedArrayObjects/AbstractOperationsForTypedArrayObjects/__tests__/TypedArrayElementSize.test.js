import { TypedArrayElementSize } from '../TypedArrayElementSize';

describe('TypedArrayElementSize function', () => {
    test('Handle all the typed arrays correctly', () => {
        const int8Array = new Int8Array();
        const uint8Array = new Uint8Array();
        const uint8ClampedArray = new Uint8ClampedArray();
        const int16Array = new Int16Array();
        const uint16Array = new Uint16Array();
        const int32Array = new Int32Array();
        const uint32Array = new Uint32Array();
        const bigInt64Array = new BigInt64Array();
        const bigUint64Array = new BigUint64Array();
        const float32Array = new Float32Array();
        const float64Array = new Float64Array();

        expect(TypedArrayElementSize(int8Array)).toBe(1);
        expect(TypedArrayElementSize(uint8Array)).toBe(1);
        expect(TypedArrayElementSize(uint8ClampedArray)).toBe(1);
        expect(TypedArrayElementSize(int16Array)).toBe(2);
        expect(TypedArrayElementSize(uint16Array)).toBe(2);
        expect(TypedArrayElementSize(int32Array)).toBe(4);
        expect(TypedArrayElementSize(uint32Array)).toBe(4);
        expect(TypedArrayElementSize(bigInt64Array)).toBe(8);
        expect(TypedArrayElementSize(bigUint64Array)).toBe(8);
        expect(TypedArrayElementSize(float32Array)).toBe(4);
        expect(TypedArrayElementSize(float64Array)).toBe(8);
    });
});
