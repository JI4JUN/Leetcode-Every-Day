import { IsNoTearConfiguration } from '../IsNoTearConfiguration';

describe('IsNoTearConfiguration function', () => {
    test('Return true for unclamped integer types', () => {
        expect(IsNoTearConfiguration('INT8', 'SEQ-CST')).toBeTruthy();
        expect(IsNoTearConfiguration('UINT8', 'SEQ-CST')).toBeTruthy();
        expect(IsNoTearConfiguration('INT16', 'UNORDERED')).toBeTruthy();
        expect(IsNoTearConfiguration('UINT16', 'INIT')).toBeTruthy();
        expect(IsNoTearConfiguration('INT32', 'SEQ-CST')).toBeTruthy();
        expect(IsNoTearConfiguration('UINT32', 'SEQ-CST')).toBeTruthy();
    });

    test('Return true for BigInt types with SEQ-CST order', () => {
        expect(IsNoTearConfiguration('BIGINT64', 'SEQ-CST')).toBeTruthy();
        expect(IsNoTearConfiguration('BIGUINT64', 'SEQ-CST')).toBeTruthy();
    });

    test('Return false for BigInt types with INIT or UNORDERED order', () => {
        expect(IsNoTearConfiguration('BIGINT64', 'INIT')).toBeFalsy();
        expect(IsNoTearConfiguration('BIGUINT64', 'UNORDERED')).toBeFalsy();
    });

    test('Return false for other types', () => {
        expect(IsNoTearConfiguration('FLOAT32', 'SEQ-CST')).toBeFalsy();
        expect(IsNoTearConfiguration('FLOAT64', 'SEQ-CST')).toBeFalsy();
        expect(IsNoTearConfiguration('UINT8CLAMPED', 'SEQ-CST')).toBeFalsy();
    });
});
