# Class 和对象相关

## Class 和对象的区别

-   **定义方式：** class 是通过**类定义**来创建的，对象可以**直接创建**或者**构造函数**创建。
-   **继承机制：** class 支持通过 extends 关键字实现类的继承，对象的继承需要手动处理
-   **方法和属性：** class 中字段、方法可以使用访问修饰符，如私有或者静态字段。

## Class 私有属性

-   **访问限制：** 私有属性只能在类的内部访问，而不能在类外部直接使用
-   **不可继承性：** 子类不能继承父类私有属性。（但是可以通过父类定义公有方法访问，子类继承该方法可以对私有属性进行操作。所以实际上继承是会包括私有属性也一起继承，只不过子类内部无法访问）
-   **封装性：** 有助于隐藏内部细节，只对外暴露必要的公共接口，减少使用者对内部的依赖和可能的误操作。提高代码安全性和可维护性。

```js
class Parent {
    name
    #gender

    setGender(gender) {
        this.#gender = gender
    }
    getGender() {
        return this.#gender
    }
}

class Child extends Parent {}

let child = new Child()
child.setGender('female')

// 打印 female
console.log(child.getGender())
```

## 静态属性

-   **访问：** 静态属性指的是属于类本身的属性，而不是定义在实例对象（`this`）上的属性。因此只能通过类访问，无法通过实例访问或修改。
-   **继承：** 静态属性可以继承。子类继承父类，子类与父类共享父类的静态属性。父类静态属性更新，子类静态属性也会跟着更新。但是如果子类定义了同名静态属性或者直接对静态属性进行复制，那么子类是自己新创建了一个属性，而不是使用的父类的属性，此时不是共享状态而是两个属性。

```js
class Parent {
    static age
}

class Child extends Parent {}

Parent.age = 20
// 打印：20
console.log(Child.age)
// 相当于将Class看成一个对象，给他赋值一个公有属性
Child.age = 30
// 打印：20
console.log(Parent.age)
```

```js
class Parent {
    static age
}

class Child extends Parent {
    // 新创建了一个静态属性，和父类不共享
    static age
}

Parent.age = 20
// 打印：undefined
console.log(Child.age)
```

## 构造函数

### ES5

在 JavaScript 中，构造函数是一种特殊的函数，用于创建和初始化新对象。构造函数通常用于定义对象的模板，允许你通过一种称为“构造”的方式来创建具有相同属性和方法的对象实例。

构造函数是 JavaScript 面向对象编程的基础之一，它们允许开发者定义对象的结构和行为，并创建具有相同结构的多个实例。

#### 特点

-   **命名约定**：构造函数通常以大写字母开头，以区分普通函数。
-   **使用 new 关键字**：调用构造函数时需要使用 new 关键字，这告诉 JavaScript 引擎你想要创建一个新对象。
-   **this 关键字**：在构造函数内部，this 关键字指向新创建的对象，允许你在该对象上设置属性和方法。
-   **原型链**：构造函数创建的对象会继承构造函数的 prototype 属性，这意味着你可以在构造函数的原型上定义方法，这些方法可以被所有实例共享。
-

```js
function Person(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
    this.fullName = function () {
        return this.firstName + ' ' + this.lastName
    }
}

const person1 = new Person('John', 'Doe')
const person2 = new Person('Jane', 'Doe')

console.log(person1.fullName()) // 输出: John Doe
console.log(person2.fullName()) // 输出: Jane Doe
```

### ES6

在 class 中，构造函数是一个特殊的方法，名为 constructor，用于初始化类的对象。当使用 new 关键字创建类的实例时，会自动调用 constructor 方法。

#### 特点

-   **定义方式**：在类中，使用 constructor 关键字定义构造函数。
-   **自动绑定**：与普通函数不同，类中的 constructor 方法的 this 关键字自动绑定到新创建的实例上，不需要使用 bind 或箭头函数。
-   **继承**：子类可以通过 extends 关键字继承父类的构造函数，但需要使用 super 关键字调用父类的构造函数。
-   **原型链**：类的方法定义在类的 prototype 上，这与使用构造函数时相同。类的方法可以通过 this 访问实例的属性。
