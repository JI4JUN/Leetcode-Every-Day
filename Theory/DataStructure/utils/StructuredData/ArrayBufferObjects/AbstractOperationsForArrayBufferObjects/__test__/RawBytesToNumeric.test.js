import { RawBytesToNumeric } from '../RawBytesToNumeric';

describe('RawBytesToNumeric function', () => {
    test('Should correctly interpret FLOAT32 values', () => {
        expect(
            RawBytesToNumeric('FLOAT32', [0x00, 0x00, 0x80, 0x3f], true)
        ).toBe(1);
    });

    test('Should correctly interpret INT32 values', () => {
        expect(RawBytesToNumeric('INT32', [0xff, 0xff, 0xff, 0xff], true)).toBe(
            -1
        );
        expect(RawBytesToNumeric('INT32', [0x00, 0x00, 0x00, 0x00], true)).toBe(
            0
        );
    });

    test('Should correctly interpret UINT32 values', () => {
        expect(
            RawBytesToNumeric('UINT32', [0xff, 0xff, 0xff, 0xff], true)
        ).toBe(4294967295);
        expect(
            RawBytesToNumeric('UINT32', [0x00, 0x00, 0x00, 0x00], true)
        ).toBe(0);
    });

    test('Should correctly interpret BIGINT64 values', () => {
        expect(
            RawBytesToNumeric(
                'BIGINT64',
                [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
                true
            )
        ).toBe(BigInt(-1));
        expect(
            RawBytesToNumeric(
                'BIGINT64',
                [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
                true
            )
        ).toBe(BigInt(0));
    });

    test('Should correctly interpret BIGUINT64 values', () => {
        expect(
            RawBytesToNumeric(
                'BIGUINT64',
                [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
                true
            ).toString()
        ).toBe('18446744073709551615');
        expect(
            RawBytesToNumeric(
                'BIGUINT64',
                [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
                true
            )
        ).toBe(BigInt(0));
    });

    test('Should handle endianness correctly', () => {
        expect(
            RawBytesToNumeric('FLOAT32', [0x3f, 0x80, 0x00, 0x00], false)
        ).toBe(1);
        expect(
            RawBytesToNumeric('INT32', [0xff, 0xff, 0xff, 0xff], false)
        ).toBe(-1);
    });
});
