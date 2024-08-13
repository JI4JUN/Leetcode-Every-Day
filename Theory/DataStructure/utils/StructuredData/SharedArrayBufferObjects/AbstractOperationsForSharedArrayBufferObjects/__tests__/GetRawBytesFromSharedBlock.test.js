import { GetRawBytesFromSharedBlock } from '../GetRawBytesFromSharedBlock';

describe('GetRawBytesFromSharedBlock function', () => {
    let sharedBuffer;
    let sharedBlock;

    beforeEach(() => {
        sharedBuffer = new SharedArrayBuffer(1024);
        sharedBlock = new Uint8Array(sharedBuffer);
    });

    test('Read raw bytes correctly for Int8Array with SEQ-CST order', () => {
        sharedBlock[0] = 42;
        sharedBlock[1] = 43;

        expect(
            GetRawBytesFromSharedBlock(sharedBuffer, 0, 'INT8', true, 'SEQ-CST')
        ).toEqual([42]);
        expect(
            GetRawBytesFromSharedBlock(sharedBuffer, 1, 'INT8', true, 'SEQ-CST')
        ).toEqual([43]);
    });

    test('Read raw bytes correctly for Uint8Array with UNORDERED order', () => {
        sharedBlock[2] = 100;
        sharedBlock[3] = 101;

        expect(
            GetRawBytesFromSharedBlock(
                sharedBuffer,
                2,
                'UINT8',
                true,
                'UNORDERED'
            )
        ).toEqual([100]);
        expect(
            GetRawBytesFromSharedBlock(
                sharedBuffer,
                3,
                'UINT8',
                true,
                'UNORDERED'
            )
        ).toEqual([101]);
    });

    test('Handle INT16 type', () => {
        const int16View = new Int16Array(sharedBuffer);
        int16View[2] = 0x1234;
        const result = GetRawBytesFromSharedBlock(
            sharedBuffer,
            4,
            'INT16',
            true,
            'SEQ-CST'
        );

        expect(result).toEqual([0x34, 0x12]);
    });

    test('Handle UINT16 type', () => {
        const uint16View = new Uint16Array(sharedBuffer);
        uint16View[3] = 0xabcd;
        const result = GetRawBytesFromSharedBlock(
            sharedBuffer,
            6,
            'UINT16',
            true,
            'SEQ-CST'
        );

        expect(result).toEqual([0xcd, 0xab]);
    });

    test('Handle INT32 type', () => {
        const int32View = new Int32Array(sharedBuffer);
        int32View[2] = 0x12345678;
        const result = GetRawBytesFromSharedBlock(
            sharedBuffer,
            8,
            'INT32',
            true,
            'SEQ-CST'
        );

        expect(result).toEqual([0x78, 0x56, 0x34, 0x12]);
    });

    test('Handle UINT32 type', () => {
        const uint32View = new Uint32Array(sharedBuffer);
        uint32View[3] = 0xabcdef12;
        const result = GetRawBytesFromSharedBlock(
            sharedBuffer,
            12,
            'UINT32',
            true,
            'SEQ-CST'
        );

        expect(result).toEqual([0x12, 0xef, 0xcd, 0xab]);
    });

    test('Handle BIGINT64 type', () => {
        const bigInt64View = new BigInt64Array(sharedBuffer);
        bigInt64View[2] = 0x1234567890abcdefn;
        const result = GetRawBytesFromSharedBlock(
            sharedBuffer,
            16,
            'BIGINT64',
            true,
            'SEQ-CST'
        );

        expect(result).toEqual([
            0xef, 0xcd, 0xab, 0x90, 0x78, 0x56, 0x34, 0x12
        ]);
    });

    test('Handle BIGUINT64 type', () => {
        const bigUint64View = new BigUint64Array(sharedBuffer);
        bigUint64View[3] = 0xfedcba9876543210n;
        const result = GetRawBytesFromSharedBlock(
            sharedBuffer,
            24,
            'BIGUINT64',
            true,
            'SEQ-CST'
        );

        expect(result).toEqual([
            0x10, 0x32, 0x54, 0x76, 0x98, 0xba, 0xdc, 0xfe
        ]);
    });

    test('Handle FLOAT32 type', () => {
        const float32View = new Float32Array(sharedBuffer);
        float32View[8] = 3.14;
        const result = GetRawBytesFromSharedBlock(
            sharedBuffer,
            32,
            'FLOAT32',
            true,
            'SEQ-CST'
        );
        const expected = new Uint8Array(new Float32Array([3.14]).buffer);

        expect(result).toEqual(Array.from(expected));
    });

    test('Handle FLOAT64 type', () => {
        const float64View = new Float64Array(sharedBuffer);
        float64View[5] = 3.141592653589793;
        const result = GetRawBytesFromSharedBlock(
            sharedBuffer,
            40,
            'FLOAT64',
            true,
            'SEQ-CST'
        );
        const expected = new Uint8Array(
            new Float64Array([3.141592653589793]).buffer
        );

        expect(result).toEqual(Array.from(expected));
    });
});
