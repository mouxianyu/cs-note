# 工厂模式

工厂模式（Factory Pattern）是一种创建型设计模式，其核心思想是通过使用工厂类来封装对象的创建过程。在工厂模式中，不直接创建对象实例，而是通过一个公共的接口将对象的创建委托给子类或者专门的工厂类来实现。这样做的主要好处是将对象的创建和使用分离，提高了系统的灵活性和可扩展性。

## 特点

-   **将对象的创建封装**：将对象的创建过程集中到一个工厂类中，而不是在使用对象的地方直接创建。
-   **提供创建接口**：客户端通过工厂提供的接口来获取对象，而不需要关心对象的具体创建过程。

## 优点

-   **解耦对象的创建和使用**：使得系统更加灵活，易于扩展和维护。
-   **便于统一管理对象的创建逻辑**：可以在工厂中进行一些优化或定制。

## 常见的工厂模式

### 简单工厂模式（Simple Factory Pattern）：

-   通过一个单一的工厂类来创建所有的对象实例。
-   工厂类拥有一个或多个方法，根据传入的参数来决定实例化哪个类。

### 工厂方法模式（Factory Method Pattern）：

-   定义一个用于创建对象的接口，让子类决定实例化哪一个类。
-   每个类在一个专门的工厂类中实例化。

### 抽象工厂模式（Abstract Factory Pattern）：

-   解决一系列相关或依赖对象的创建问题。
-   提供一个接口以创建相关或依赖对象的家族，而不需要明确指定具体类。

## 现实业务中的实现

官网有多个表单，提交的内容需要到不同的数据库表中，但是他们主要的业务逻辑是相同，只不过在字段内容、数据库表、请求校验方式有所不同。在与数据库的操作中需要关联的 `Model` 不同，但是对不同 Model 的操作基本是相同的，因此定义一个 `getModel` 方法，通过传入 `formType` 来判断是使用那个 `Model` 进行数据的交互。

> "Model"一词通常是指与数据库交互的 Mongoose 模型。Mongoose 是一个流行的 MongoDB 对象模型工具，它为 Node.js 提供了一个直白的 API 来与 MongoDB 数据库进行交互.

```ts
private getModel(formType: FormType): Model<BaseFrom> {
    switch (formType) {
        case FormType.BecomeTechnologyPartner:
            return this.becomeTechnologyPartnerModel
        case FormType.DevelopmentPlatform:
            return this.developmentPlatformModel
        case FormType.AiLicense:
            return this.aiLicenseModel
        case FormType.Event:
            return this.eventModel
        case FormType.Newsletter:
            return this.newsletterModel
        default:
            throw new BadRequestException('Invalid form type.')
    }
}
```
