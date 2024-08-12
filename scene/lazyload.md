# 懒加载

## 图片懒加载

### Loading 属性

HTML 提供了一个 loading 属性，可以添加到`<img>`标签中，值为"lazy"，指示浏览器延迟加载图片直到它进入视口。

-   Baseline 2023 Newly available across major browsers
-   功能在 2023 年被主流浏览器所支持，并且这个支持达到了一个基本的、普遍认可的水平。
-   caniuse 大概有 92%+ 用户使用支持

```html
<img src="image.jpg" alt="..." loading="lazy" />

<iframe src="video-player.html" title="..." loading="lazy"></iframe>
```

### 懒加载插件或者库

-   [lazysizes](https://github.com/aFarkas/lazysizes)
-   [lozad.js](https://github.com/ApoorvSaxena/lozad.js/)

### 自己实现

> 在实际应用中，Intersection Observer API 通常是更推荐的方式，因为它性能较好，并且能更准确地判断元素是否进入视口，同时减少了滚动事件频繁触发带来的性能开销

#### 使用 Intersection Observer API

使用原生的 Intersection Observer API 来检测元素是否进入视口，并在适当的时候加载图片

```js
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src
            observer.unobserve(img)
        }
    })
})

const imgs = document.querySelectorAll('img[data-src]')
imgs.forEach(img => observer.observe(img))
```

#### 监听滚动事件

通过监听页面的滚动事件，判断图片是否进入视口来决定是否加载

```js
window.addEventListener('scroll', () => {
    const imgs = document.querySelectorAll('img[data-src]')
    imgs.forEach(img => {
        const rect = img.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            img.src = img.dataset.src
        }
    })
})
```

## CSS 懒加载

-   默认情况下，CSS 被视为渲染阻塞资源，因此，在 CSSOM 构造完成之前，浏览器不会渲染任何已处理的内容。
-   CSS 必须尽量小，才能尽快送达，建议使用媒体类型和查询实现非阻塞渲染。

```html
<!-- 始终会加载 -->
<!-- 加载和解析 styles.css 会阻塞渲染 -->
<link rel="stylesheet" href="styles.css" />

<!-- 只有在打印文档时才会加载 -->
<!-- 加载和解析 print.css 不会阻塞渲染 -->
<link rel="stylesheet" href="print.css" media="print" />

<!-- 只有在小于等于480px屏幕下才会加载 -->
<!-- 在大屏幕上，加载和解析 mobile.css 不会阻塞渲染 -->
<link rel="stylesheet" href="mobile.css" media="screen and (max-width: 480px)" />

<!-- onload 表示在资源加载完后就会被调用 -->
<!-- 这边css不会阻塞渲染，但是等css加载完后会执行onload将该css应用到所有而不是打印的时候 -->
<!-- 可以将css分割成首屏加载和非首屏加载，非首屏加载设置成非阻塞，等加载完后再应用到页面上 -->
<link rel="stylesheet" href="style.css" media="print" onload="this.media='all'" />
```

-   默认情况下，浏览器会假设每个指定的样式表都会**阻塞渲染**。
-   你可以通过添加包含媒体查询的 **media** 属性来告诉浏览器何时应用样式表。
-   当浏览器看到只需要在特定情况下应用的样式表时，它**仍然会下载样式表，但不会阻塞渲染**。
-   通过**将 CSS 拆分为多个文件**，主要的渲染阻塞文件（在本例中为 styles.css）会小得多，从而减少渲染阻塞的时间

## JS 懒加载

任何类型为 `type="module"` 的脚本标签都被视为一个 JavaScript 模块，并且默认情况下会被延迟。

## 字体

默认情况下，字体请求会延迟到构造渲染树之前，这可能会导致文本渲染延迟。

可以使用 `<link rel="preload">`、CSS `font-display` 属性和字体加载 API 来覆盖默认行为并预加载网络字体资源。
