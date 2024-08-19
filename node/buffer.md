# Buffer

## Buffer 和 ArrayBuffer

### Buffer：

Buffer 是 Node.js 中的一个全局对象，它提供了一个特殊的数组类型，用于处理二进制数据。Buffer 类型的对象类似于普通的 JavaScript 数组，但它们包含的不是常规的数值或对象引用，而是原始的字节数据。

-   主要用于 Node.js 环境：是 Node.js 提供的一种用于操作二进制数据的类。
-   支持多种编码：可以方便地进行字符串与二进制数据的转换。
-   具有特定的方法和属性：用于读写、拼接、复制等操作。

### ArrayBuffer：

ArrayBuffer 是一种在 Web 浏览器中定义的 JavaScript 对象，用于表示通用的、固定长度的原始二进制数据缓冲区。它被用来存储数据，但本身并不提供对数据的直接访问。要操作 ArrayBuffer 中的数据，你需要使用类型化数组（Typed Arrays）或者 DataView 对象。

-   浏览器中的概念：是一种底层的二进制数据存储区域。
-   通常与视图（如 DataView）配合使用：以更具体的方式访问和操作其中的数据。
