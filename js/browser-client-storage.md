# 浏览器客户端存储

1. **Cookies**：是最早的客户端存储技术之一，用于存储少量数据，如用户会话信息。每次用户访问网站时，浏览器都会发送存储在 Cookies 中的信息给服务器。
2. **Web Storage**：
    - **LocalStorage**：提供了一个简单的存储机制，允许存储数据直到手动清除。LocalStorage 的数据没有过期时间，适合存储不经常变动的数据。
    - **SessionStorage**：与 LocalStorage 类似，但数据只在浏览器会话期间有效，一旦浏览器窗口或标签页关闭，数据就会被清除。
3. **IndexedDB**：是一个低等级的 API，用于存储大量结构化数据。它支持事务，可以处理更复杂的数据存储需求。
4. **Cache API**：是 Service Workers 的一部分，用于缓存网络请求和响应，从而提高网页加载速度和离线访问能力
5. **File System API**：允许 Web 应用程序访问特定的文件系统，进行文件读写操作。

## Cookies 与 Web Storage 的区别：

-   Cookies 通常与服务器交互，而 Web Storage 仅在客户端使用。
-   Cookies 有大小限制（一般为 4KB），而 Web Storage 可以存储更多的数据（一般为 5MB 或更多）。
-   Cookies 会自动随 HTTP 请求发送，可能会影响性能；Web Storage 则不会。

## Web Storage

### LocalStorage

-   容量：通常提供至少 5MB 的存储空间。
-   生命周期：数据在浏览器中是持久的，即使关闭浏览器窗口或标签页，数据依然存在，直到被显式删除。
-   作用域：数据在同一个源（协议、域名、端口）的所有页面之间共享。

### SessionStorage

-   容量：与 LocalStorage 相同，通常至少 5MB。
-   生命周期：数据只在浏览器的当前会话（session）中有效。当用户关闭浏览器窗口或标签页时，存储的数据会被清除。
-   作用域：与 LocalStorage 类似，数据在同一个源的所有页面之间共享，但仅限于当前会话。

### 特点

-   简单易用：通过 JavaScript 的 API 进行读写操作，不需要像 Cookies 那样每次请求都发送给服务器。
-   数据类型：存储的数据类型是**字符串**，如果需要存储其他类型的数据，需要先将其转换为字符串（例如使用 JSON.stringify）。
-   安全性：与 Cookies 相比，Web Storage 不通过 HTTP 请求发送数据，减少了数据泄露的风险。
-   性能：由于数据存储在本地，可以提高页面加载速度和减少服务器负载。

### 使用方法

-   localStorage.setItem('key', 'value')：设置键值对。
-   localStorage.getItem('key')：根据键名获取值。
-   localStorage.removeItem('key')：根据键名删除数据项。
-   localStorage.clear()：清除所有数据。
-   sessionStorage 的 API 与 localStorage 类似，只是作用域和生命周期不同。

```js
// 存储数据到LocalStorage
localStorage.setItem('username', 'JohnDoe')

// 从LocalStorage获取数据
const username = localStorage.getItem('username')

// 删除LocalStorage中的一个键值对
localStorage.removeItem('username')

// 清除LocalStorage中的所有数据
localStorage.clear()

// SessionStorage的使用方式与LocalStorage相同，只是作用域和生命周期不同
```
