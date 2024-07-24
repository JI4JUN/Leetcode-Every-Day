const Array = require('../Array1.js');

test('Using the then() method --- Success', async () => {
    const arr = [1, 2, 3];
    const result = [];
    arr.tinyForEach((num) => result.push(num));

    expect(result).toStrictEqual([1, 2, 3]);
});
