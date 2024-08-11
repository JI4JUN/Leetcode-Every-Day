import { IsSharedArrayBuffer } from '../IsSharedArrayBuffer';

describe('IsSharedArrayBuffer function', () => {
    test('Should return true if the buffer is shared', () => {
        const buffer = new SharedArrayBuffer(10);

        expect(IsSharedArrayBuffer(buffer)).toBeTruthy();
    });

    test('Should return false if the buffer is not shared', () => {
        const buffer = new ArrayBuffer(10);

        expect(IsSharedArrayBuffer(buffer)).toBeFalsy();
    });
});
