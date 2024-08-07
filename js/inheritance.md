# 继承

## 前置知识

### 原型和对象

-   **原型**：一个模板或蓝图，用于定义对象的公共属性和方法，可以被多个对象共享
-   **对象**：是基于原型创建的具体实例，具有自己独特的属性值和状态

### Object.create() 和 new

`Object.create(xxx)`：以 xxx 为原型创建一个对象

-   `Object.create(obj)`：以对象为原型创造对象
-   `Object.create(XXX.prototype)`：以 XXX 的原型创建对象，不执行 XXX 的构造函数，获得一个空的 XXX 对象
    `new XXX()`：执行构造函数创建一个 XXX 的实例

### Object.create(XXX.prototype) 和 Object.create(普通对象)

#### Object.create(XXX.prototype)

-   创建的新对象的原型链指向 XXX.prototype，但是由于没有执行构造函数，因此新对象没法使用原型的属性和方法，需要调用构造函数后才能使用

#### Object.create(普通对象)

-   新对象会继承普通对象的属性和方法，且可以直接调用

```js
class Parent {
    name = 'Class'
    constructor(name) {
        this.name ??= name
    }
    getName() {
        return this.name
    }
}

const parent = {
    name: 'Object',
    getName() {
        return this.name
    }
}

const p1 = Object.create(Parent.prototype)

const p2 = Object.create(parent)

// Parent {}
console.log(p1)
// undefined
console.log(p1.getName())
// {}
console.log(p2)
// Object
console.log(p2.getName())
```

**使用场景**：

-   `new`  更适合用于传统的面向对象编程，当你需要一个类（构造函数）来创建具有相同属性和方法的对象实例时
-   `Object.create`  更适合用于创建**简单对象**，或者当你需要一个对象具有特定的原型，而不需要执行任何构造函数时。

JS 继承的 7️⃣ 种方式

1. 原型链继承
2. 借用构造函数继承（也称为经典继承）
3. 组合继承（原型链+借用构造函数）
4. 原型式继承
5. 寄生式继承
6. 寄生组合继承
7. ES6 类继承

## 原型链继承

父类的实例作为子类的原型
**优点**：实现简单
**缺点**：

-   被引用的父类实例的属性被修改后，所有子类实例上的该属性也会被修改
-   创建子类实例不能向父类传参(不能调用父类的构造函数)

```js
// !原型链继承：父类的实例作为子类的原型
function Parent(name) {
    if (name === undefined) {
        this.name = 'Parent'
    } else {
        this.name = name
    }
}
Parent.prototype.sayHello = function () {
    console.log('Hello from ' + this.name)
}

function Child() {
    // 没有特别的操作
}

var parent = new Parent()
// !原型链继承
Child.prototype = parent
Child.prototype.constructor = Child

var child = new Child()
// !输出: Hello from undefined , 因为没有执行父类的构造函数
child.sayHello()

// !父类属性发生变化
parent.name = 'new Parent'
// !子类实例都发生变化
// 输出:Hello from new Parent
child.sayHello()

console.log('Parent', Parent)
console.log('Child', Child)
```

## 借用构造函数继承（也称为经典继承）

在子类的构造函数中调用父类的构造函数，以实现属性的继承
**优点**：

-   解决子类实例共享父类引用属性的问题（即父类属性修改，子类不会跟着变化）
-   创建子类可以向父类构造函数传参
-   可以实现多继承（call 多个）
    **缺点**：
-   无法继承父类原型的方法

```js
// !借用构造函数继承：子类构造函数借用父类构造函数
function Parent(name) {
    this.name = name
}

Parent.prototype.say = function () {
    console.log('say: ' + this.name)
}

function Child(name, age) {
    // !借用父类构造函数
    Parent.call(this, name) // 调用Parent的构造函数
    this.age = age
}

var child = new Child('Alice', 10)
// * 输出：Alice
console.log(child.name)
// * 报错，因为不能继承方法
child.say()
```

## 组合继承（原型链+借用构造函数）

结合**原型链继承**和**借用构造函数继承**
**优点**：结合了原型链继承和借用构造函数继承的优点
**缺点**：调用了两次父类构造函数（一次在创建子类原型，一次在子类构造函数中），可能会导致不必要的性能开销

```js
// !组合继承：原型链继承+借用构造函数继承
function Parent(name) {
    if (name === undefined) {
        // 默认值
        this.name = 'default'
    } else {
        this.name = name
    }
}

Parent.prototype.say = function () {
    console.log('say: ' + this.name)
}

function Child(name, age) {
    // !借用构造函数继承
    Parent.call(this, name)
    this.age = age
}

// !原型链继承
Child.prototype = new Parent()

var child = new Child('tom', 11)
// Parent { name: 'tom', age: 11 }
console.log(child)
// say: tom
child.say()
```

## 原型式继承

借助`Object.create()`方法实现。该方法创建一个新对象，并将指定对象作为新对象的原型
这种方式**适合**不需要单独创建构造函数，但仍想在多个对象间共享属性或方法的情况。
**优点**：从已有的对象衍生新对象，不需要创建自定义类型
缺点：

-   父类引用属性会被所有实例共享（因为是用整个父类对象来充当了子类原型对象）
-   无法实现代码复用（新对象是现取的）

```js
// ! 原型式继承：创建一个对象，并制定一个现有的对象作为原型
let parent = {
    name: 'Parent',
    sayName: function () {
        console.log(this.name)
    }
}
// ! 原型式继承：将父对象作为子对象的原型，没有用到构造函数
let child = Object.create(parent)
child.name = 'Child'
child.sayName()
```

## 寄生式继承（基于原型式继承基础上）

在原型式继承的基础上，在函数内部进一步增强对象，为其添加额外的属性或方法

```js
// ! 寄生式继承：在原型式继承的基础上，在函数内部进一步增强对象，为其添加额外的属性或方法
let parent = {
    name: 'Parent',
    friends: ['p1', 'p2', 'p3'],
    getName: function () {
        return this.name
    }
}

function clone(original) {
    // !原型式继承
    let clone = Object.create(original)
    // !增强
    clone.getFriends = function () {
        return this.friends
    }
    return clone
}

let person = clone(parent)
console.log(person.getName())
console.log(person.getFriends())
```

## 寄生组合继承（寄生式继承+组合式继承）

结合组合继承和寄生继承的优点，<mark style="background: #FF5582A6;">优化了组合继承中调用两次父类构造函数的问题</mark>。使用`Object.create()`方法克隆父类原型的副本，并将其设置为子类的原型，避免了额外的父类实例创建

```js
// ! 寄生组合继承：结合寄生式继承和组合式继承
function Parent(name) {
    this.name = name
}

Parent.prototype.getName = function () {
    console.log(this.name)
    return this.name
}

function Child(name, age) {
    // ! 借用构造函数
    Parent.call(this, name)
    this.age = age
}

// ! 原型链继承+原型式继承
// ! 原型链继承这边使用的是new Parent() ，这边换成 Object.create(proto)，即原型式继承
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

// ! 原型式继承增强成寄生式继承
Child.prototype.getAge = function () {
    console.log(this.age)
    return this.age
}

var child = new Child('child', 11)
child.getName()
child.getAge()
```

## ES6 类继承

通过 class 定义类，extends 关键字继承，子类中使用 super()调用父类构造函数

```js
// ! ES6类继承：通过class定义类，extends关键字继承，子类中使用super()调用父类构造函数
class Parent {
    name = 'Parent'
    constructor(name) {
        this.name ??= name
    }
}

class Child extends Parent {
    age = 0
    constructor(name, age) {
        super(name)
        this.age ??= age
    }
}
const parent = new Parent()
console.log(parent)
const child = new Child()
console.log(child)
```
