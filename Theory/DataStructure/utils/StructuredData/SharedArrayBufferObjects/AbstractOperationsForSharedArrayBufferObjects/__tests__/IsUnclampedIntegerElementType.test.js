import { IsUnclampedIntegerElementType } from '../IsUnclampedIntegerElementType ';

describe('IsUnclampedIntegerElementType function', () => {
    test('Should return true if element type is an Integer TypedArray element type not including UINT8CLAMPED.', () => {
        expect(IsUnclampedIntegerElementType('INT8')).toBeTruthy();
        expect(IsUnclampedIntegerElementType('UINT8')).toBeTruthy();
        expect(IsUnclampedIntegerElementType('INT16')).toBeTruthy();
        expect(IsUnclampedIntegerElementType('UINT16')).toBeTruthy();
        expect(IsUnclampedIntegerElementType('INT32')).toBeTruthy();
        expect(IsUnclampedIntegerElementType('UINT32')).toBeTruthy();
        expect(IsUnclampedIntegerElementType('UINT8CLAMPED')).toBeFalsy();
        expect(IsUnclampedIntegerElementType('FLOAT32')).toBeFalsy();
    });
});
