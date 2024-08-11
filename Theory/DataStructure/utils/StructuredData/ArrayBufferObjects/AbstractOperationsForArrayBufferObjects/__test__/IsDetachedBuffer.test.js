import { IsDetachedBuffer } from '../IsDetachedBuffer';

describe('IsDetachedBuffer function', () => {
    test('Should return true if the buffer is detached', () => {
        const buffer = new ArrayBuffer(8);

        expect(IsDetachedBuffer(buffer)).toBeFalsy();
    });

    test('Should return false if the buffer is not detached', () => {
        const buffer = new ArrayBuffer(8);
        const newBuffer = buffer.transfer();

        expect(IsDetachedBuffer(buffer)).toBeTruthy();
        expect(IsDetachedBuffer(newBuffer)).toBeFalsy();
    });
});
