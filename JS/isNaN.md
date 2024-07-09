## NaN和Number.NaN
NaN代表不是一个数字的特殊值，与Number.NaN相同

以下操作会返回NaN
- 失败的数字转换（例如，显式转换，如 `parseInt("blabla")`、`Number(undefined)`，或隐式转换，如 `Math.abs(undefined)`）
- 计算结果不是实数的数学运算（例如，`Math.sqrt(-1)`）
- 不定式（例如，`0 * Infinity`、`1 ** Infinity`、`Infinity / Infinity`、`Infinity - Infinity`、`0/0`）
- 一个操作数被强制转换为 `NaN` 的方法或表达式（例如，`7 ** NaN`、`7 * "blabla"`）——这意味着 `NaN` 具有传染性
- 将无效值表示为数字的其他情况（例如，无效的 [Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) `new Date("blabla").getTime()`、`"".charCodeAt(1)`）

## isNaN() 和 Number.isNaN()

**全局的isNaN()** 会自动封装参数为Number，所以如果参数不是Number类型都会转化成NaN，所以isNaN都会返回true

**Number.isNaN()** 只会判断某个值是否等于NaN，不会做自动封装

```js
isNaN("hello world"); // true
Number.isNaN("hello world"); // false
```