# 装饰器模式

装饰器模式是一种结构型设计模式，它允许在不改变原有对象的基础上，动态地添加新的功能或行为。

## 函数装饰器实现

```js
function addDecorator(func) {
    return function () {
        console.log('装饰前的操作')
        func()
        console.log('装饰后的操作')
    }
}

function originalFunction() {
    console.log('原始函数执行')
}

const decoratedFunction = addDecorator(originalFunction)

decoratedFunction()
```

## ES7（2016） 装饰器

装饰器在 ES7 中被提出，但是目前没有主流浏览器支持，Nodejs 也不支持，但是可以通过 ` @babel/plugin-proposal-decorators` 插件进行转译

```js
// 装饰器函数
function log(target, name, descriptor) {
    const originalMethod = descriptor.value

    descriptor.value = function () {
        console.log(`调用了 ${name} 方法`)
        originalMethod()
    }
}

// 被装饰的类
class Calculator {
    @log
    add(a, b) {
        return a + b
    }
}

const calculator = new Calculator()
calculator.add(2, 3)
```

## Typescript 装饰器

TypeScript 装饰器是一种特殊类型的声明，它能够被附加到**类声明**、**方法**、**访问符**、**属性**或**参数**上，提供一种方式通过元编程语法添加注解和修改它们的行为。装饰器使用 `@expression` 这种形式，expression 求值后必须为一个函数，会在运行时被调用，被装饰的声明信息作为参数传入

TypeScript 5.0 引入了对第三阶段的装饰器提案的官方支持，该提案已较为稳定，不需要对 API 进行重大更改。装饰器函数可以修改或扩展被装饰的类、方法、访问器或属性的行为，并且可以用于添加元数据、执行编码标准或最佳实践等。

要启用装饰器特性，需要在命令行或 `tsconfig.json` 中启用 `experimentalDecorators` 编译器选项 。此外，一些示例使用了 `reflect-metadata` 库来支持实验性的 metadata API，该库目前不是 ECMAScript (JavaScript)标准的一部分，但当装饰器被 ECMAScript 官方标准采纳后，这些扩展也将被推荐给 ECMAScript 以采纳

```ts
function sealed(constructor: Function) {
    return class extends constructor {
        private secret = "I'm sealed!"
        revealSecret() {
            return this.secret
        }
    }
}

@sealed
class MySealedClass {
    public showSecret() {
        console.log(this.revealSecret())
    }
}

const instance = new MySealedClass()
instance.showSecret() // "I'm sealed!"
```
