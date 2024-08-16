# 适配器模式

适配器模式是将一个类的接口转换成客户希望的另一个接口，使原本由于接口不兼容而不能一起工作的两个类能够协同工作。

它主要包含以下几个角色：

-   **目标接口**：客户所期望的接口。
-   **适配者**：需要被适配的类或接口。
-   **适配器**：将适配者的接口转换为目标接口。

适配器模式的优点是提高了系统的灵活性和扩展性，使不兼容的接口能够协同工作。

> 适配器就像一个转换插口，比如电脑上只支持 Type-C 的插口，U 盘使用的是 USB，就需要一个转化插口将两者连接起来传输数据，这个插口就是适配器。

## NestJS 中的适配器模式

HTTP 适配器：NestJS 同样支持使用不同的 HTTP 服务器框架，如 Express 或 Fastify。NestJS 通过抽象的 HTTP 适配器来实现这一点，允许你在不改变应用程序核心逻辑的情况下，切换不同的 HTTP 框架

```ts
const app = await NestFactory.create(AppModule, new FastifyAdapter())
```

## Nodejs 中的 util.promisify

Node.js 中的 `promisefy` 函数可以被视为适配器模式的一个应用。promisefy 是一个工具，它将 Node.js 中常见的回调风格（callback pattern）函数转换成返回 Promise 的函数，从而使得异步代码更容易编写和维护。
