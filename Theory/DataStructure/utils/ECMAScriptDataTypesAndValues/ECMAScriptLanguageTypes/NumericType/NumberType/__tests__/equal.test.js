import { NumberType } from '../NumberType';

describe('equal function', () => {
    test('Should return false if x or y are NaN', () => {
        expect(NumberType.equal(NaN, 42)).toBeFalsy();
        expect(NumberType.equal(42, NaN)).toBeFalsy();
        expect(NumberType.equal(NaN, NaN)).toBeFalsy();
    });

    test('Should return true if x is y', () => {
        const x = 42;
        const y = x;

        expect(NumberType.equal(x, y)).toBeTruthy();
    });

    test('Should return true if x is +0𝔽 and y is -0𝔽 or  x is -0𝔽 and y is +0𝔽', () => {
        expect(NumberType.equal(+0, -0)).toBeTruthy();
        expect(NumberType.equal(-0, +0)).toBeTruthy();
    });
});
