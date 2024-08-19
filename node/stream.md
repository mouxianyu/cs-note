# Stream

流（Stream），是一个数据传输手段，是端到端信息交换的一种方式，而且是**有顺序的,是逐块读取数据、处理内容**，用于顺序读取输入或写入输出

它的独特之处在于，它不像传统的程序那样一次将一个文件读入内存，而是逐块读取数据、处理其内容，**而不是将其全部保存在内存中**

## 流的组成

流可以分成三部分：`source`、`dest`、`pipe`

在`source`和`dest`之间有一个连接的管道`pipe`,它的基本语法是`source.pipe(dest)`，`source`和`dest`就是通过`pipe`连接，让数据从`source`流向了`dest`

### 步骤

1. 从源（`source`）读取数据，每次读取一定量的数据到一个缓冲区（`buffer`）中。
2. 将缓冲区（`buffer`）按照顺序通过管道传输给目的地。
3. 在目的地接收缓冲区（`buffer`），并根据需要进行处理，例如将缓冲区中的数据写入文件或显示在用户界面。

## 流种类

-   **Readable Stream**（可读流）：允许数据从数据源流向应用程序。例如，从文件读取内容或从网络接收数据。
-   **Writable Stream**（可写流）：允许数据从应用程序流向数据接收器。例如，向文件写入内容或通过网络发送数据。
-   **Duplex Stream**（双工流）：既可以读取也可以写入的流，例如，用于两个方向的数据交换，如 TCP/IP 网络通信。
-   **Transform Stream**（转换流）：是双工流的一种特殊形式，它在读取数据的同时对数据进行某种形式的处理，并将处理后的数据写入。

> `Readable` 流可以从数据源读取数据到缓冲区（`Buffer）`，然后将这个 `Buffer` 通过管道（`pipe`）传输到一个 `Writable` 流，最终写入到目的地

1. 从 Readable 流读取数据：
    - 当你创建了一个可读流（例如，使用 Node.js 中的 fs.createReadStream()从文件读取数据），流会从数据源（在这个例子中是文件）读取数据。
    - 这些数据被暂存在内存中的 Buffer 对象里。Buffer 是 V8 引擎中用于处理二进制数据的一个类。
2. 通过管道传输：
    - 你可以使用 pipe()方法将 Readable 流的输出直接传输到一个 Writable 流。这个方法会在内部处理数据的流动，你不需要手动从可读流读取数据并写入到可写流。
    - pipe()方法会在源流（Readable）的 data 事件触发时自动读取数据块，并将它们传输给目标流（Writable）。
3. 向 Writable 流写入数据：
    - Writable 流接收从 Readable 流通过管道传输过来的 Buffer 数据，并将其写入到目的地。这个目的地可以是文件系统、网络连接或其他任何可写的地方。
    - 一旦 Buffer 中的数据被写入，Writable 流会确认数据已经被消费，并可能触发自身的 drain 事件，表示它已准备好接收更多的数据。
4. 处理流的结束和错误：
    - 当 Readable 流读取完所有数据后，它会触发 end 事件（如果流是可暂停的，这表示流已经没有更多数据可读），随后触发 close 事件。
    - 如果在写入过程中发生错误，Writable 流会触发 error 事件，你可以监听这个事件来处理错误情况。

## 常见的流类型

-   **文件流**：用于文件的读写操作。
-   **网络流**：用于网络通信，如 TCP/IP 协议的数据传输。
-   **数据流**：用于处理数据集合，如数据库查询结果。

## gulp 和 stream

### gulp 流程

-   `gulp.src()`： 返回一个 Readable Stream
-   `readable.pipe(writable|duplex|transform)`： pipe 参数可以是可读流、双工流、转化流。返回类型和参数类型相同
-   `gulp.dest()`： 返回一个 Writable Stream

1. **调用 gulp.src()**：当你调用 gulp.src() 并传递给它一个文件路径或 glob 模式时，Gulp 会创建一个 Readable Stream。这个流会按照给定的模式查找文件，并准备读取它们的内容。
2. **链式调用 pipe()**：Readable Stream 通过 pipe() 方法连接到一个或多个 Gulp 插件。这些插件可以是可写的（Writable Stream），也可以是转换的（Transform Stream），它们对数据进行处理，比如压缩、编译或合并文件。
3. **处理数据**：当数据流通过管道时，每个插件都会接收到数据，执行相应的操作，然后将结果传递给管道中的下一个插件。
4. **写入文件系统**：在管道的末端，通常会使用 gulp.dest() 方法将处理后的数据写回到文件系统中。gulp.dest() 也返回一个 Writable Stream，它接收来自前一个插件的数据并将它们写入到指定的目录。

```js
const {src, dest} = require('gulp')
const uglify = require('gulp-uglify') // 一个 JavaScript 压缩插件

// 定义一个 Gulp 任务
exports.default = function () {
    return src('src/*.js') // 读取 'src' 目录下的所有 JavaScript 文件
        .pipe(uglify()) // 使用 uglify 插件压缩 JavaScript
        .pipe(dest('dist')) // 将压缩后的文件输出到 'dist' 目录
}
```

## through2

through2 是 stream.transform 的简单封装，方便对 transform 进行处理

`through2([ options, ] [ transformFunction ] [, flushFunction ])`
