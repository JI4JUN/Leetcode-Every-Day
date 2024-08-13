import { ArrayBufferByteLength } from '../ArrayBufferByteLength';

describe('ArrayBufferByteLength function', () => {
    test('should return byte length for a regular ArrayBuffer', () => {
        const buffer = new ArrayBuffer(8);

        expect(ArrayBufferByteLength(buffer, 'SEQ-CST')).toBe(8);
    });

    test('Should return byteLength from [[ArrayBufferByteLengthData]] for SharedArrayBuffer', () => {
        const sharedBuffer = new SharedArrayBuffer(16);
        const byteLengthData = new ArrayBuffer(8);
        const view = new DataView(byteLengthData);

        view.setBigUint64(0, BigInt(32), true);

        sharedBuffer._ArrayBufferByteLengthData = byteLengthData;

        expect(ArrayBufferByteLength(sharedBuffer, 'SEQ-CST').toString()).toBe(
            '32'
        );
    });
});
