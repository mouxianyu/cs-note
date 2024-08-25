# 数据类型

## 动态和弱类型

### 动态类型

Javascript 是一种有着**动态类型**的**动态语言**，Javascript 中的变量与任何特定值类型没有任何关联，任何变量都可以被赋予（或重新赋予）各种类型的值

```javascript
let foo = 42 // foo 现在是一个数值
foo = 'bar' // foo 现在是一个字符串
foo = true // foo 现在是一个布尔值
```

### 弱类型

Javascript 是一种**弱类型**语言，如果操作不匹配的类型，它允许**隐式转换**，而不是抛出类型错误

```javascript
const foo = 42 // foo 现在是一个数值
const result = foo + '1' // JavaScript 将 foo 强制转换为字符串，因此可以将其与另一个操作数连接起来
console.log(result) // 421
```

## 数据类型

Javascript 的数据类型主要分为两大类：**原始值**（Primitive Values）和**对象**（Object）

**主要区别**是：原始值是不可变的，对象是可变的

-   **原始值**：也称为数值类型。存储在**栈内存**中，它们是直接存储了实际值。因为原始值不可变，对原始值的操作实际是在栈创造新的值
-   **对象**：即**引用类型**。引用类型存储在**堆内存**中，它们存储的是指向实际数据的**引用或指针**。在操作引用类型时，实际上是在操作引用所指向的堆内存中的**对象**。

当一个原始类型的变量赋值给另一个变量时，会**创建这个值的一个新副本**；而当一个对象类型的变量赋值给另一个变量时，两个变量实际上都**指向内存中的同一个对象**。

**垃圾回收机制**在堆内存中发挥作用，**自动回收那些不再被引用的对象所占用的内存**。JavaScript 运行时环境（如浏览器或 Node.js）通常使用标记-清除（Mark-and-Sweep）算法来进行垃圾回收

### 栈内存（Stack Memory）

-   **定义**：栈是一种特殊的线性数据结构，只在栈顶进行数据的添加（push）和删除（pop）操作，遵循后进先出（LIFO, Last In First Out）的原则。
-   **用途**：主要用于存储局部变量、函数参数以及返回地址等。每当一个函数被调用时，一个新的“栈帧”（Stack Frame）被创建并推入栈中，函数执行完毕后，其栈帧被销毁。
-   **特点**：
    -   **快速**的存取速度，因为栈的内存分配和回收非常迅速和高效。
    -   **内存大小固定或有上限**，不同系统和编译器可能有不同的栈大小限制。
    -   **自动内存管理**，不需要程序员手动分配和释放内存。

### 堆内存（Heap Memory）

-   **定义**：堆是用于动态内存分配的内存区域，不同于栈，堆中的数据元素不需要遵循特定的顺序。
-   **用途**：用于存储复杂数据结构，如对象、数组等，以及那些需要在程序中长期存在的数据。
-   **特点**：
    -   **存取速度通常比栈慢**，因为内存分配和回收涉及更复杂的管理过程。
    -   **内存大小通常远大于栈**，但受限于系统的物理内存和虚拟内存。
    -   **手动内存管理**，程序员需要使用  `new`  操作符来分配内存，并负责使用相应的方法或操作符来释放内存，否则可能导致内存泄漏。

### JavaScript 中的栈和堆

在 JavaScript 中，栈内存主要用于存储执行上下文，包括变量环境和词法环境。每当一个函数执行时，一个新的执行上下文被创建并推入执行上下文栈。

#### 栈内存

-   存储**基本类型**的数据（**原始值**）
-   函数的参数和局部变量：在函数执行过程中定义的变量。
-   函数的返回地址：记录函数执行完成后要返回的位置。
-   执行上下文信息：如当前执行的函数等

#### 堆内存

-   存储**引用类型**的数据（**对象**）
-   对象实例：通过 new 创建的对象。
-   动态分配的数据：比如通过手动申请的内存空间。
-   复杂的数据结构：如链表、树等结构的节点。

## 原始值

除了  Object  以外，所有类型都定义了表示在语言最低层面的不可变值。我们将这些值称为**原始值**

除了  `null`，所有原始类型都可以使用  `typeof`  运算符进行测试。`typeof null`  返回  `"object"`，因此必须使用  `=== null`  来测试  `null`。

除了  `null`  和  `undefined`，所有原始类型都有它们相应的**对象包装类型**，这为处理原始值提供可用的方法。例如，`Number`  对象提供像  `toExponential()`  这样的方法。当在原始值上访问属性时，JavaScript 会**自动将值包装到相应的包装对象**中，并访问对象上的属性。然而，在  `null`  或  `undefined`  上访问属性时，会抛出  `TypeError`  异常，这需要采用可选链运算符。

| 类型      | `typeof`  返回值 | 对象包装器 |
| --------- | ---------------- | ---------- |
| Null      | `"object"`       | 不适用     |
| Undefined | `"undefined"`    | 不适用     |
| Boolean   | `"boolean"`      | `Boolean`  |
| Number    | `"number"`       | `Number`   |
| BigInt    | `"bigint"`       | `BigInt`   |
| String    | `"string"`       | `String`   |
| Symbol    | `"symbol"`       | `Symbol`   |

原始值是**不可变的（Immutable）**，并且它们**没有属性或方法**。这意味着你不能像访问对象属性那样访问原始值的属性。例如，你不能对一个数字或字符串使用点操作符（`.`）来访问属性，因为它们没有属性。

然而，尽管原始值本身没有属性，JavaScript 通过**包装对象**（Primitive Wrapper Objects）提供了一种机制，使得原始值可以临时拥有属性和方法。当你试图访问原始值的属性或调用方法时，JavaScript 引擎会**自动将原始值转换为对应的包装对象**，然后执行操作，最后再转换回原始值。例如：

```javascript
var num = 10
console.log(num.toString()) // 输出 "10"，尽管数字本身没有 toString 方法

var str = 'Hello'
console.log(str.length) // 输出 5，尽管字符串本身没有 length 属性
```

在上面的例子中，`num` 和 `str` 是原始值，但它们通过**自动装箱**（Autoboxing）机制，临时地拥有了 `toString` 和 `length` 属性。这种机制是 JavaScript 的一个特性，允许原始值模拟对象的行为

### Null 和 Undefined 类型

Null 类型只有一个值：null
Undefined 类型是有一个值：undefined

从概念上讲，`undefined`  表示**值的缺失**，`null`  表示**对象的缺失**（这也可以说明  `typeof null === "object"`  的原因）。当某些东西没有值时，该语言通常默认为  `undefined`：

-   没有值（`return;`）的  `return`  语句，隐式返回  `undefined`。
-   访问不存在的对象属性（`obj.iDontExist`），返回  `undefined`。
-   变量声明时没有初始化（`let x;`），隐式初始化为  `undefined`。
-   许多像  `Array.prototype.find()`  和  `Map.prototype.get()`  的方法，当没有找到元素时，返回  `undefined`。

`null`  是一个关键字，但是  `undefined`  是一个普通的标识符

### String 类型

JavaScript 字符串是**不可变的**。这意味着一旦字符串被创建，就不可能修改它。字符串方法基于当前字符串的内容创建一个新的字符串——例如：

-   使用  `substring()`  获取原始的子字符串。
-   使用串联运算符（`+`）或  `concat()`  将两个字符串串联。

### Symbol 类型

`Symbol`  是**唯一**并且**不可变**的原始值并且可以用来作为对象属性的键。symbol 的目的是去创建一个唯一属性键，保证不会与其他代码中的键产生冲突。

## Object

在计算机科学中，对象（object）是指内存中的可以被标识符引用的一块区域。在 JavaScript 中，对象是**唯一**可变的值。事实上，函数也是具有额外**可调用能力**的对象。

### 基本对象

-   Object
-   Function
-   Boolean
-   Symbol
    Boolean、Symbol 是其原始值的包装对象，同理 Number、String 等等也是

此外还有 Date、Map、Set、Math、Array、JSON 等等对象

## 类型判断

### JS 中常见假值

-   `false`：布尔假值
-   `0`：数值 0
-   `-0`：负数值 0（在 JavaScript 中，0 和-0 是相等的）
-   `""` 或 `''`：空字符串
-   `null`：表示无值的特殊值
-   `undefined`：未定义的变量或未赋值的变量
-   `NaN`：表示“不是一个数字”的特殊值

### 判断假值

1. **使用 if 语句**：直接在 if 条件中判断值是否为假值。
2. **Boolean()函数**：将值传递给 Boolean()函数，它会将值转换为布尔值，从而判断是否为假值。
3. **双非操作符**（`!!variable`）：强制转换变量为布尔值，然后检查结果是否为 false

### 判断是 Object 还是 Array

#### 判断是不是 Object

1. `variable instanceof Object`
2. `typeof variable && variable !== null`(`typeof null` 的值是 `Object`)
3. `Object.prototype.toString.call(variable) ==='[object Object]'`

#### 判断是不是 Array

1. `Array.isArray(variable)`
2. `variable instanceof Array`
3. `Object.prototype.toString.call(variable) ==='[object Array]'`
