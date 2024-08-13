# 原生 JS 的一些操作

> -   在原生 JavaScript 中，如果变量名以 window 开头，通常可以省略 window。
> -   这是因为 window 对象在全局作用域中是默认存在的，许多与浏览器窗口相关的属性和方法都可以直接通过简短的名称来访问。
> -   但为了代码的清晰性和可读性，在一些情况下，明确写出 window 可能更好

## DOM

### 创建元素

-   `document.createElement(tagName)` : 创建一个新的元素节点

### 获取元素

-   `document.getElementById(id)`：通过元素的 ID 获取元素。
-   `document.getElementsByTagName(tagName)`：通过标签名获取元素集合，返回一个 HTMLCollection。
-   `document.getElementsByClassName(className)`：通过类名获取元素集合，返回一个 HTMLCollection。
-   `document.querySelector(selector)`：通过 CSS 选择器获取第一个匹配的元素。
-   `document.querySelectorAll(selector)`：通过 CSS 选择器获取所有匹配的元素集合，返回一个 NodeList。

### 修改元素

-   `element.innerHTML`：获取或设置元素内部的 HTML 内容。
-   `element.textContent`：获取或设置元素内部的文本内容。
-   `element.setAttribute(name, value)`：设置元素的属性。
-   `element.getAttribute(name)`：获取元素的属性值。
-   `element.removeAttribute(name)`：删除元素的属性。

### 添加和删除子元素

-   `element.appendChild(childNode)`：将一个节点添加到元素的子节点列表末尾。
-   `element.removeChild(childNode)`：移除元素的指定子节点。
-   `element.replaceChild(newNode, oldNode)`：用新节点替换元素的旧子节点。

### 添加和删除类

-   `element.classList.add(className)`：给元素添加一个或多个类。
-   `element.classList.remove(className)`：从元素删除一个或多个类。
-   `element.classList.toggle(className)`：如果元素包含指定的类，则删除它；否则，添加它。

### 样式操作

-   `element.style.property`：直接设置元素的内联样式。
-   `window.getComputedStyle(element)`：获取元素的所有计算后的样式，包括那些通过 CSS 规则设置的样式。

### 插入节点

-   `element.insertBefore(newNode, referenceNode)`：在参考节点前插入一个新节点。

### 克隆节点

-   `element.cloneNode(deep)`：克隆一个元素节点，deep 参数为 true 时，会递归克隆所有子节点。

### 遍历 DOM 树

-   `element.parentNode`：获取元素的父节点。
-   `element.childNodes`：获取元素的所有子节点集合。
-   `element.firstChild` 和 `element.lastChild`：获取元素的第一个和最后一个子节点。
-   `element.nextSibling` 和 `element.previousSibling`：获取元素的下一个和上一个同级节点。

### 滚动操作

-   `window.scroll(xCoord, yCoord)` 或 `element.scrollIntoView(options)`：滚动页面或元素到指定位置。

## 事件监听

-   `element.addEventListener(type, listener[, options])`：在元素上注册事件监听器。
-   `element.removeEventListener(type, listener[, options])`：从元素上移除事件监听器。

### 事件冒泡

-   **定义**： 当一个元素上的事件被触发时，该事件会沿着 DOM 树向上传播，直到到达根节点，这一过程就称为事件冒泡
-   **父子组件事件触发顺序**：通常情况下，子组件的事件会先被触发，然后才是父组件的事件
-   **阻止冒泡的方法**： `event.stopPropagation()`
-   **阻止默认事件**：`event.preventDefault()`

> propagation n. 传播，传递，繁殖

### 移动端 Touch 事件

-   `touchstart`：手指触摸屏幕时触发。
-   `touchmove`：手指在屏幕上移动时触发。
-   `touchend`：手指离开屏幕时触发。
-   `touchcancel`：触摸事件被中断时触发（如系统来电等情况）。

### 获取鼠标横纵坐标轴

```js
document.addEventListener('mousemove', function (event) {
    const x = event.clientX
    const y = event.clientY
    console.log(`鼠标横坐标：${x}，纵坐标：${y}`)
})
```
