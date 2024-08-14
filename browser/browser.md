# 浏览器

## 主流浏览器内核

-   **Trident**：也称为 IE 内核，是微软开发的浏览器内核，曾用于 Internet Explorer 浏览器。一些双核浏览器也会采用 Trident 内核，并美其名曰“兼容模式”。不过微软官方已停止更新该内核，新版 Microsoft Edge 浏览器已不再使用。
-   **Gecko**：由 Mozilla 基金会开发的开源内核，用于 Mozilla Firefox 浏览器。其特点是代码完全公开，可开发程度高。
-   **WebKit**：这是一个开源的浏览器引擎，最初的代码来自 KDE 的 KHTML 和 KJS。除了苹果公司的 Safari 浏览器，一些其他浏览器也会使用 WebKit 内核。此外，WebKit 内核在手机上的应用也较为广泛，例如 Google 的 Android 平台浏览器、Apple 的 iPhone 浏览器等。
-   **Blink**：由 Google 开发的浏览器引擎，它是在 WebKit 内核的基础上经过修改和优化而来。Google Chrome 浏览器使用 Blink 内核，新版 Microsoft Edge 浏览器也采用了 Chromium 内核（基于 Blink 内核）。此外，Opera、360 极速浏览器、QQ 浏览器等也使用 Blink 内核。
-   **Presto**：早期 Opera 浏览器使用的内核，后来 Opera 也转向了 Blink 内核

### 浏览器使用的内核

-   Blink： Chrome、新版 Opera、Edge
-   WebKit： Safari、移动端使用比较广泛
-   Gecko：Firefox
-   Trident：IE 浏览器
-   Presto：早期 Opera

### Blink 和 WebKit

-   WebKit 是苹果开源的项目
-   Blink 基于 WebKit 进行优化，使用 V8 引擎替代了原来的 JavascriptCore，并在其他地方进行修改优化

## 主流 Javascript 引擎

-   **V8**：由 Google 开发，最初用于 Google Chrome 浏览器，并且也是 Node.js 的 JavaScript 引擎。V8 以其高性能著称，使用即时编译（JIT）技术将 JavaScript 代码编译为机器代码以提高执行效率
-   **SpiderMonkey**：由 Mozilla 开发，用于 Firefox 浏览器的 JavaScript 引擎。它是最早的 JavaScript 引擎之一，以其可扩展性和安全性而知名
-   **JavaScriptCore**：由苹果公司开发，用于 Safari 浏览器的 JavaScript 引擎。它也被称为 Nitro，是 WebKit 的一部分
-   **Chakra**：由 Microsoft 开发，最初用于 Internet Explorer 浏览器。Chakra 引擎以其 JIT 编译技术而知名，它允许脚本在单独的 CPU 核心上编译，与网页浏览并行
-   **Carakan**：之前在 Opera 浏览器中使用，是一个高性能的 JavaScript 引擎
-   **Hermes**：由 Facebook 开发，专为 React Native 优化的 JavaScript 引擎，以提高在移动设备上的性能
-   **GraalVM**：由 Oracle Labs 开发，是一个高性能的 JavaScript 实现，构建在 GraalVM 上
-   **QuickJS**：一个轻量级和可嵌入的 JavaScript 引擎，适用于需要快速解析和执行 JavaScript 代码的场景

### V8 和 JSCore

#### V8 引擎：

-   由 Google 开发，专为 Chrome 浏览器设计，后用于 Node.js 环境
-   用 C++ 编写，具备高度优化的即时编译器 (JIT)，提供快速执行性能
-   支持 ECMAScript 标准，包括较新的语法特性
-   拥有高效的垃圾收集器，是其高性能的关键之一
-   V8 允许 C++ 应用程序将自己的对象和函数公开给 JavaScript 代码
-   可在 iOS 上使用，但需注意 Apple 的政策限制

#### JavaScriptCore 引擎：

-   由苹果公司开发，最初是 WebKit 的一部分，现在作为独立的系统级 Framework 提供给开发者
-   同样用 C++ 编写，具有高度的可移植性，并使用 LLVM 作为 JIT 编译器的一部分
-   支持 ECMAScript 标准，包括 ES6 及更高版本的特性
-   在 iOS 和 macOS 上有主场优势，特别是 Safari 和 WKWebView 中
-   由于 Apple 的安全考虑，iOS 上的第三方应用默认禁用 JIT 功能

在性能方面，V8 以其快速执行性能而闻名，特别是在启用 JIT 编译的情况下。而 JavaScriptCore 虽然在 iOS 上性能可能略逊一筹，但提供了优秀的跨平台兼容性和稳定性。V8 的内存占用相对较高，而 JavaScriptCore 在内存使用上更为节省

在选择 JavaScript 引擎时，开发者应根据目标平台、性能需求、内存使用和开发环境来做出决策。例如，在苹果生态系统中开发，JavaScriptCore 是一个优化性能和兼容性的选择；而在需要高性能和跨平台支持的 Web 应用中，V8 可能是更合适的选择

#### 对比

-   V8 具备高度优化的即时编译器（JIT），以及垃圾收集器，性能强。
-   JSCore 因为安全考虑，IOS 上的第三方应用默认禁止 JIT。
