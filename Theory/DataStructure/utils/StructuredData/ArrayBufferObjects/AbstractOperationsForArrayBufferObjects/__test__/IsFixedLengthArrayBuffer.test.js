import { IsFixedLengthArrayBuffer } from '../IsFixedLengthArrayBuffer';

describe('IsFixedLengthArrayBuffer function', () => {
    test('Should return true if the length of the array buffer is fixed', () => {
        const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
        const fixedBuffer = buffer.transferToFixedLength();

        expect(IsFixedLengthArrayBuffer(fixedBuffer)).toBeTruthy();
    });

    test('Should return false if the length of the array buffer is non-fixed', () => {
        const buffer = new ArrayBuffer(8, { maxByteLength: 16 });

        expect(IsFixedLengthArrayBuffer(buffer)).toBeFalsy();
    });
});
