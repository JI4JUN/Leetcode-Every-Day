import { IsBigIntElementType } from '../IsBigIntElementType';

describe('IsBigIntElementType function', () => {
    test('Should return true if the element is a BigInt TypedArray element type', () => {
        expect(IsBigIntElementType('BIGUINT64')).toBeTruthy();
        expect(IsBigIntElementType('BIGINT64')).toBeTruthy();
        expect(IsBigIntElementType('FLOAT32')).toBeFalsy();
    });
});
