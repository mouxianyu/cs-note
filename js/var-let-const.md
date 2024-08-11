# var let const

## var 和 let 的区别

1. **变量提升**：var 存在变量提升，let 没有
2. **块级作用域**：var 不存在块级作用域，let 存在
3. **重复声明**：var 允许变量重复声明，let 不允许

> 在 use strict 模式下，var 还是可以变量提升、重复声明、不存在块级作用域
>
> 如果在函数中不声明 var，那么这个变量就是全局的

```js
var a = 10
function change() {
    a = 20
}
change()
console.log(a) // 20
```

### 变量提升

-   在代码执行之前，JavaScript 会将变量和函数声明提升到当前作用域的顶部。
-   这意味着在代码中，你可以在声明之前使用变量或调用函数，好像它们已经被提前声明和定义了一样。

#### var

```js
// 打印 undefined
console.log(a)
var a = 2
```

可以看成

```js
var a
console.log(a)
a = 2
```

#### let

```js
// Uncaught ReferenceError: a is not defined
console.log(a)
let a = 2
```

### 块级作用域

块级作用域指的是在代码中由花括号 `{}` 包围的区域，在这个区域内定义的变量和函数等仅在该区域内有效

#### var

```js
{
    var a = 10
}
// 打印10
console.log(a)

for (var i = 0; i < 3; i++) {
    // 一些操作
}
// 可以访问到i，打印3
console.log(i) // 可以访问到 i
```

#### let

```js
{
    let a = 10
}
// Uncaught ReferenceError: a is not defined
console.log(a)
```

```js
for (let j = 0; j < 3; j++) {
    // 一些操作
}
// 报错，j 无法在此处访问
console.log(j)
```

### 重复声明

#### var

```js
var a = 10
// 可以执行
var a = 2
```

#### let

```js
let a = 10
// Uncaught SyntaxError: Identifier 'a' has already been declared
let a = 2
```

## let 和 const

**可变性**：let 声明的变量可以被重新赋值；而 const 声明的变量是常量，一旦赋值后不能再更改。
**初始值**：const 必须在声明时初始化赋值，否则会报错；而 let 可以先声明后赋值。

> 除此之外，const 拥有其他 let 拥有的特性
