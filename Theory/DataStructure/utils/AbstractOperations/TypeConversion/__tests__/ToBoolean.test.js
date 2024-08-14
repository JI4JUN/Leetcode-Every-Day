import { ToBoolean } from '../ToBoolean';

describe('ToBoolean function', () => {
    test('should return true for boolean true', () => {
        expect(ToBoolean(true)).toBe(true);
    });

    test('should return false for boolean false', () => {
        expect(ToBoolean(false)).toBe(false);
    });

    test('should return false for undefined', () => {
        expect(ToBoolean(undefined)).toBe(false);
    });

    test('should return false for null', () => {
        expect(ToBoolean(null)).toBe(false);
    });

    test('should return false for +0 and -0', () => {
        expect(ToBoolean(+0)).toBe(false);
        expect(ToBoolean(-0)).toBe(false);
    });

    test('should return false for NaN', () => {
        expect(ToBoolean(NaN)).toBe(false);
    });

    test('should return false for 0', () => {
        expect(ToBoolean(0)).toBe(false);
    });

    test('should return false for an empty string', () => {
        expect(ToBoolean('')).toBe(false);
    });

    test('should return true for non-empty strings', () => {
        expect(ToBoolean('Hello')).toBe(true);
    });

    test('should return true for non-empty objects', () => {
        expect(ToBoolean({})).toBe(true);
    });

    test('should return true for non-empty arrays', () => {
        expect(ToBoolean([])).toBe(true);
    });

    test('should return true for symbols', () => {
        expect(ToBoolean(Symbol())).toBe(true);
    });
});
