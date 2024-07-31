# symbol

Symbol 是 ES6 开始有的基本数据类型，表示独一无二的值

语法：`Symbol([description])`

Symbol，即使 `description` 相同，但是仍然时唯一的、不同的值

```js
// 创建两个 Symbol
const sym1 = Symbol('description')
const sym2 = Symbol('description')

console.log(sym1 === sym2) // false

// 使用 Symbol 作为对象属性的键
const obj = {
    [sym1]: 'value1',
    [sym2]: 'value2'
}

console.log(obj[sym1]) // 'value1'
console.log(obj[sym2]) // 'value2'
```

## 特点

1. **唯一性**：每个通过 `Symbol()` 创建的符号都是唯一的，即使是使用相同的描述符。
2. **不可变性**：`Symbol` 值一旦创建，其值就不能被更改。
3. **不可仿造**：`Symbol` 值不能被仿造，即不能通过 `new Symbol()` 来创建 `Symbol` 对象。
4. **属性名**：`Symbol` 常用作对象属性的键，可以避免属性名冲突。
5. **内置符号**：JavaScript 还提供了一些内置的 `Symbol`，例如 `Symbol.iterator`，用于实现迭代器。
6. **检测**：可以使用 `typeof` 操作符来检测一个值是否为 `Symbol` 类型。

## 方法

### Symbol.for(key)

**根据 key 找 symbol**

**`Symbol.for(key)`**  方法会根据给定的键  `key`，来从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中。

### Symbol.keyFor(sym)

**根据 symbol 找 key**

**`Symbol.keyFor(sym)`**  方法用来获取全局 symbol 注册表中与某个 symbol 关联的键。
