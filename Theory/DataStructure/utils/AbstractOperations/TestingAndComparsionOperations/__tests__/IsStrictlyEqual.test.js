import { IsStrictlyEqual } from '../IsStrictlyEqual';

describe('IsStrictlyEqual function', () => {
    test('Should return false if the type of x is not the type of y', () => {
        const x = 42;
        const y = '42';

        expect(IsStrictlyEqual(x, y)).toBeFalsy();
    });

    test('Can handle Number types correctly', () => {
        const x = 42;
        const y1 = 42;
        const y2 = 0;

        expect(IsStrictlyEqual(x, y1)).toBeTruthy();
        expect(IsStrictlyEqual(x, y2)).toBeFalsy();
    });

    test('Can handle types other than Number', () => {
        const stringX = '42';
        const stringY1 = '42';
        const stringY2 = '43';

        expect(IsStrictlyEqual(stringX, stringY1)).toBeTruthy();
        expect(IsStrictlyEqual(stringX, stringY2)).toBeFalsy();

        const booleanX = true;
        const booleanY1 = true;
        const booleanY2 = false;

        expect(IsStrictlyEqual(booleanX, booleanY1)).toBeTruthy();
        expect(IsStrictlyEqual(booleanX, booleanY2)).toBeFalsy();

        const bigintX = 12345678901234567891n;
        const bigintY1 = 12345678901234567891n;
        const bigintY2 = 12345678901234567890n;

        expect(IsStrictlyEqual(bigintX, bigintY1)).toBeTruthy();
        expect(IsStrictlyEqual(bigintX, bigintY2)).toBeFalsy();

        const objectX = { prop: 1 };
        const objectY1 = objectX;
        const objectY2 = { prop: 1 };

        expect(IsStrictlyEqual(objectX, objectY1)).toBeTruthy();
        expect(IsStrictlyEqual(objectX, objectY2)).toBeFalsy();
    });
});
