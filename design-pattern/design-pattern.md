# 设计模式

-   创建型模式
    1.  工厂模式（Factory Pattern）
    2.  抽象工厂模式（Abstract Factory Pattern）
    3.  单例模式（Singleton Pattern）
    4.  建造者模式（Builder Pattern）
    5.  原型模式（Prototype Pattern）
-   结构型模式
    1.  适配器模式（Adapter Pattern）
    2.  桥接模式（Bridge Pattern）
    3.  过滤器模式（Filter、Criteria Pattern）
    4.  组合模式（Composite Pattern）
    5.  装饰器模式（Decorator Pattern）
    6.  外观模式（Facade Pattern）
    7.  享元模式（Flyweight Pattern）
    8.  代理模式（Proxy Pattern）
-   行为型模式
    1.  责任链模式（Chain of Responsibility Pattern）
    2.  命令模式（Command Pattern）
    3.  解释器模式（Interpreter Pattern）
    4.  迭代器模式（Iterator Pattern）
    5.  中介者模式（Mediator Pattern）
    6.  备忘录模式（Memento Pattern）
    7.  观察者模式（Observer Pattern）
    8.  状态模式（State Pattern）
    9.  空对象模式（Null Object Pattern）
    10. 策略模式（Strategy Pattern）
    11. 模板模式（Template Pattern）
    12. 访问者模式（Visitor Pattern）
-   J2EE 模式
    1.  MVC 模式（MVC Pattern）
    2.  业务代表模式（Business Delegate Pattern）
    3.  组合实体模式（Composite Entity Pattern）
    4.  数据访问对象模式（Data Access Object Pattern）
    5.  前端控制器模式（Front Controller Pattern）
    6.  拦截过滤器模式（Intercepting Filter Pattern）
    7.  服务定位器模式（Service Locator Pattern）
    8.  传输对象模式（Transfer Object Pattern）

## Vue 中的设计模式

-   **观察者模式**：Vue 通过数据劫持和发布 / 订阅机制实现了数据与视图的自动同步更新。
-   **单例模式**：Vue 实例通常是以单例的形式存在。
-   **工厂模式**：创建组件实例时可以看作是一种工厂模式的应用。
-   **装饰者模式**：一些插件和功能扩展可能会使用装饰者模式。

例如，当数据发生变化时，**观察者模式**会通知相关的视图进行更新；通过**单例模式**确保只有一个根实例来管理应用的状态和行为；在创建组件时，**工厂模式**负责生成具体的组件实例。

## NestJS 中的设计模式

-   **装饰器模式**：NestJS 广泛使用装饰器来为类、方法等添加功能和特性。
-   **管道模式（责任链模式）**：用于在数据处理流程中进行一系列的转换和验证。
-   **适配器模式**：在不同模块或组件之间进行适配和转换。

例如，使用**装饰器**可以为控制器、服务等添加路由、拦截器等功能；**依赖注入**使得不同组件之间的依赖关系更加清晰和灵活；**管道**可以对输入的数据进行预处理和验证。

## Gulp 中的设计模式

-   **责任链模式**：任务之间形成一条执行链，一个任务完成后传递给下一个任务。
-   **命令模式**：每个任务可以看作是一个命令，被执行时产生相应的效果。
-   **观察者模式**：Gulp 通过 gulp.watch()方法来监听文件系统的变化，当指定的文件发生变化时，Gulp 会自动执行预定义的任务
