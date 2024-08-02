# 回流和重绘

**回流 (Reflow)** 是指网页渲染引擎根据元素的**尺寸、位置和显示属性**来重新计算页面的排版和布局，是网页渲染过程中的一个重要步骤。

**重绘 (Repaint)** 是指网页渲染引擎根据**显示属性** (如颜色、文字大小等) 重新绘制页面元素，不影响元素的位置和尺寸。

回流必将引起重绘，重绘不一定会导致回流

## 回流

回流是指浏览器在需要重新计算元素的**几何属性**（比如宽度、高度、位置等）时，对 DOM 树进行结构调整的过程。

回流是一个**相对耗时**的过程，因为它需要浏览器重新计算并**重新布局整个或部分页面的元素**。

### 会导致回流的操作

-   页面首次渲染
-   浏览器窗口**大小**发生变化
-   元素**位置**发生变化
-   元素**尺寸**发生变化（`width` , `height` , `margin` , `padding` , `border` , `font-size` 等）
-   元素内容发生变化（文本变化或图片替换）
-   元素的显示或隐藏（`display: none` 会，`visibility: hidden`, `opacity:0 `不会）
-   添加或者删除**可见的**DOM 元素

### 会导致回流的方法

-   `clientWidth` , `clientHeight` , `clientTop` , `clientLeft`
-   `offsetWidth` , `offsetHeight` , `offsetTop` , `offsetLeft`
-   `scrollWidth` , `scrollHeight` , `scrollTop` , `scrollLeft`
-   `scrollIntoView()` , `scrollIntoViewIfNeed()`
-   `getComputedStyle()`
-   `getBoundingClientRect()`
-   `scrollTo()`

### 如何减少回流

1. **减少影响布局的样式修改**：避免修改那些会影响元素尺寸和布局的属性，如`width`、`height`、`margin`、`padding`、`border`等。
2. **使用`absolute`或`fixed`定位**：这些定位方式可以使元素脱离文档流，其尺寸变化不会影响到其他元素。
3. **使用`min-width`和`max-width`**：通过设置最小宽度和最大宽度，可以限制元素尺寸的变化范围，减少回流。
4. **使用`flex`和`grid`容器的属性**：这些属性可以更有效地处理元素尺寸的变化，减少对整个布局的影响。
5. **优化 JavaScript 操作**：在修改 DOM 之前，先在内存中构建好元素的集合，然后一次性应用样式变化。
6. **使用`display: none`代替`visibility: hidden`**：当需要隐藏元素时，`display: none`会从文档流中移除元素，而`visibility: hidden`只是使其不可见，但元素仍占据空间。
7. **避免使用  `table`  布局**：`table`  中每个元素的大小以及内容的改动，都会导致整个  `table`  的重新计算

## 重绘

重绘是指当元素的**外观发生改变**，但**不影响其几何属性**时，浏览器需要重新绘制元素的过程。

### 会导致重绘的操作

-   颜色修改
-   文本方向修改
-   文本样式（`font-family`、`font-weight`、`font-style`、`text-decoration`）
-   投影修改
-   透明度修改
-   背景图修改（`background-image` , `background-position` , `background-size`）
-   轮廓（`outline-color`、`outline-style`、`outline-width`）
-   动画和过渡

### 如何减少重绘

1. **优化动画效果**：使用`transform`和`opacity`属性来实现动画效果，因为它们通常不会引起重绘。
2. **避免频繁修改样式**：减少对颜色、背景、边框等属性的频繁修改，尤其是在动画或交互过程中。
3. **使用 CSS 类而不是内联样式**：通过类来统一管理样式，可以减少对单个元素的直接样式修改。
4. **使用`will-change`属性**：适当使用`will-change`来告知浏览器哪些属性可能会变化，但不要过度使用，因为它可能导致性能问题。
5. **避免使用性能成本高的 CSS 属性**：某些属性如`box-shadow`、`border-radius`等可能会引起更复杂的重绘。
6. **优化伪元素的使用**：使用`:before`和`:after`伪元素时，注意它们的样式变化也会引起重绘。
7. **合理使用`outline`属性**：`outline`属性的变化会引起重绘，如果不需要，可以避免使用。
8. **避免在重绘区域内部进行 DOM 操作**：如果可能，尽量在重绘区域外部进行 DOM 操作，以减少对重绘区域的影响。
9. **使用硬件加速**：某些浏览器支持硬件加速，可以通过特定的属性或技术来利用 GPU 加速渲染过程。
