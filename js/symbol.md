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
4. **不可枚举**：无法用`Object.key()`或`Object.getOwnPropertyNames()`来获得
5. **用作属性名**：`Symbol` 常用作对象属性的键，可以避免属性名冲突。
6. **用作内置符号**：JavaScript 还提供了一些内置的 `Symbol`，例如 `Symbol.iterator`，用于实现迭代器。
7. **检测 Symbol**：可以使用 `typeof` 操作符来检测一个值是否为 `Symbol` 类型。

## 方法

### Symbol.for(key)

**根据 key 找 symbol**

**`Symbol.for(key)`**  方法会根据给定的键  `key`，来从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中。

### Symbol.keyFor(sym)

**根据 symbol 找 key**

**`Symbol.keyFor(sym)`**  方法用来获取全局 symbol 注册表中与某个 symbol 关联的键。

## 用 Symbol 作为私有属性相比用#作为私有属性有什么优势

1. 唯一性更强：Symbol 是全局唯一的
2. 难以猜测：Symbol 的名称通常难以猜测，增加破解私有属性的难度
3. 更加灵活方便拓展：

```js
const privatePropertySymbol1 = Symbol('privateProperty1')
const privatePropertySymbol2 = Symbol('privateProperty2')

class MyClass {
    [privatePropertySymbol1] = 'value1'

    privateMethod() {
        console.log('Private method called')
    }

    extend() {
        // 如果使用字符串的话可能会产生命名冲突，而且不够隐蔽，容易被发现
        this[privatePropertySymbol2] = 'value2'
    }
}

const myObject = new MyClass()
myObject.extend()

// 访问私有属性和方法
console.log(myObject[privatePropertySymbol1])
console.log(myObject[privatePropertySymbol2])
myObject.privateMethod()
```

## 使用 Symbol 中可能产生的异常

在使用 Symbol 时，可能会遇到以下几种异常或问题：

1. **重复使用 Symbol 作为属性名**：由于 Symbol 是唯一的，尝试使用两个看似相同的 Symbol 作为同一个对象的属性名实际上会创建两个不同的属性。例如：

    ```javascript
    let sym = Symbol('mySymbol')
    let obj = {
        [sym]: 'value1',
        [sym]: 'value2' // 这里会覆盖第一个属性，因为这两个Symbol是不同的
    }
    ```

2. **尝试将 Symbol 作为构造函数**：由于 Symbol 是一个原始数据类型，不能使用`new`关键字来创建 Symbol 的实例，这会导致`TypeError`：

    ```javascript
    let sym = new Symbol() // TypeError
    ```

3. **尝试修改 Symbol 的值**：Symbol 是不可变的，尝试修改 Symbol 的值会引发错误或无效操作：

    ```javascript
    let sym = Symbol('mySymbol')
    sym = Symbol('anotherSymbol') // 无效操作，不能重新赋值
    ```

4. **尝试获取 Symbol 的属性**：由于 Symbol 是不可变的，尝试获取其属性（如`.description`）会导致`undefined`：

    ```javascript
    let sym = Symbol('mySymbol')
    console.log(sym.description) // undefined
    ```

5. **全局 Symbol 的冲突**：使用`Symbol.for()`创建全局 Symbol 时，如果在不同的地方使用相同的字符串作为键，可能会得到相同的 Symbol，这在某些情况下可能导致意外的全局状态共享。

6. **Symbol 属性的访问**：由于 Symbol 属性不会出现在`for...in`、`Object.keys()`等迭代中，如果忘记使用 Symbol 的确切引用，可能会找不到这些属性：

    ```javascript
    let sym = Symbol('myProperty')
    let obj = {
        [sym]: 'value'
    }
    console.log(Object.keys(obj)) // []
    console.log(obj[sym]) // 'value'
    ```

7. **JSON 序列化问题**：尝试将包含 Symbol 属性的对象序列化为 JSON 时，这些属性会被忽略：

    ```javascript
    let sym = Symbol('myProperty')
    let obj = {
        [sym]: 'value',
        normal: 'prop'
    }
    console.log(JSON.stringify(obj)) // '{"normal":"prop"}'
    ```

8. **反射 API 的限制**：在使用某些反射 API（如`Reflect.ownKeys()`）时，需要特别注意它们会返回包括 Symbol 在内的所有类型的键。

9. **跨框架或库的兼容性问题**：如果使用的 JavaScript 环境或第三方库不支持 ES6 的 Symbol，可能会导致运行时错误或意外行为。
