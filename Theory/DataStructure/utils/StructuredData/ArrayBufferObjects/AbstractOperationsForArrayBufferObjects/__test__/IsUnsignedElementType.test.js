import { IsUnsignedElementType } from '../IsUnsignedElementType';

describe('IsUnsignedElementType function', () => {
    test('Handle element type which is one of the UINT8, UINT8CLAMPED, UINT16, UINT32, or BIGUINT64 correctly', () => {
        expect(IsUnsignedElementType('UINT8')).toBeTruthy();
        expect(IsUnsignedElementType('UINT8CLAMPED')).toBeTruthy();
        expect(IsUnsignedElementType('UINT16')).toBeTruthy();
        expect(IsUnsignedElementType('UINT32')).toBeTruthy();
        expect(IsUnsignedElementType('BIGUINT64')).toBeTruthy();
    });

    test('Handle other element types', () => {
        expect(IsUnsignedElementType('INT8')).toBeFalsy();
        expect(IsUnsignedElementType('INT16')).toBeFalsy();
        expect(IsUnsignedElementType('INT32')).toBeFalsy();
        expect(IsUnsignedElementType('INT64')).toBeFalsy();
        expect(IsUnsignedElementType('FLOAT32')).toBeFalsy();
        expect(IsUnsignedElementType('FLOAT64')).toBeFalsy();
    });
});
