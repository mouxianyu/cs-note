# any、unknown、never

## `unknown` 可以视为严格的 `any`

### 1. `unknown` 类型不可以直接赋值给其他变量

```ts
let x: unknown = 1
let y: number = x // 报错
let z: string = x // 报错

let a: any = 1
let b: number = a // 可以
let c: string = a // 可以
```

### 2. 直接调用 `unknown` 类型变量的属性和方法，或者直接当作函数执行，都会报错

```ts
let v1: unknown = {foo: 123}
v1.foo // 报错

let v2: unknown = 'str '
v2.trim() // 报错

let v3: unknown = (n: number) => n + 1
v3(1) // 报错
```

### 3. `unknown` 能够进行的运算有限

只能进行比较运算符（`==`、`===`、`!=`、`!==`、`||`、`&&`、`?`）、取反（`!`）、`typeof`、`instanceof`，其他的都会报错

```ts
let n: unknown = 1
n + 1 // 报错
n === 1 // 可以
```

### 4. 只有明确 unknown 变量的实际类型才能使用

```ts
let n: unknown = 1
if (typeof n === 'number') {
    n++ // 可以
}
```

## `never` 类型

表示永远不会出现的值

-   **表示不存在的情况**：当一个函数永远不会有返回值时，其返回类型可以被指定为 never。
-   **用于穷尽性检查**：可以用 never 来确保一个联合类型被完全处理，没有遗漏的情况。

```js
function throwError(message: string): never {
    throw new Error(message)
}

function processValue(value: string | number): void {
    if (typeof value === 'string') {
        // 处理字符串情况
    } else if (typeof value === 'number') {
        // 处理数字情况
    } else {
        // 这里的类型会被推断为 never，因为不存在其他情况
    }
}
```

### never 和 void

-   `void` 表示没有返回值，是函数返回类型的一个正常声明。
-   `never` 表示函数或位置的代码不会被执行到，通常用于错误处理或表示函数会抛出异常。
