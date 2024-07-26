import { IsCallable } from '../index';

describe('IsCallable function', () => {
    test('Should return true for function object', () => {
        const func = () => {};

        expect(IsCallable(func)).toBe(true);
    });

    test('Should return true for function-like object', () => {
        const obj = { call: () => {} };

        expect(IsCallable(obj)).toBe(true);
    });

    test('Should return false for non-function object', () => {
        const obj = { prop: 'value' };

        expect(IsCallable(obj)).toBe(false);
    });

    test('Should return false for plain object', () => {
        const plainObj = {};

        expect(IsCallable(plainObj)).toBe(false);
    });

    test('Should return false for string', () => {
        expect(IsCallable('test')).toBe(false);
    });

    test('Should return false for undefined', () => {
        expect(IsCallable(undefined)).toBe(false);
    });

    test('Should return false for null', () => {
        expect(IsCallable(null)).toBe(false);
    });

    test('Should return false for symbol', () => {
        const sym = Symbol('test');

        expect(IsCallable(sym)).toBe(false);
    });

    test('Should return false for boolean', () => {
        expect(IsCallable(true)).toBe(false);
        expect(IsCallable(false)).toBe(false);
    });
});
