/**
 * Array.prototype.forEach(callbackfn [, thisArg])
 * https://tc39.es/ecma262/#sec-array.prototype.foreach
 */

const {
    ToObject,
    LengthOfArrayLike,
    IsCallable,
    ToString,
    HasProperty,
    Get,
    Call,
    F
} = require('../utils/utils.js');

Array.prototype.tinyForEach = function (callbackfn, thisArg) {
    // 1. 将 this 值转换为对象
    const O = ToObject(this);
    // 2. 获取数组长度
    const len = LengthOfArrayLike(O);

    // 3. 检查回调函数是否可调用
    if (IsCallable(callbackfn) === false) {
        throw TypeError(
            `${typeof callbackfn} ${
                Object.is(callbackfn, undefined) ? '' : callbackfn
            } is not a function`
        );
    }

    // 4. 初始化索引 k 为 0
    let k = 0;

    // 5. 循环遍历数组
    while (k < len) {
        // a. 获取属性名
        const Pk = ToString(k);

        // b. 检查属性是否存在
        const kPresent = HasProperty(O, Pk);

        // c. kPresent 是 true
        if (kPresent === true) {
            // i. 获取属性值
            const kValue = Get(O, Pk);
            // ii. 执行 Call 方法
            Call(callbackfn, thisArg, [kValue, F(k), O]);
        }

        // d. 增加索引
        k++;
    }

    // 6. 返回 undefined
    return undefined;
};

module.exports = Array;
