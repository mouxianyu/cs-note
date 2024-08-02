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
