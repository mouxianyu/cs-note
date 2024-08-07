# CSS 定位方式

-   static： 正常布局
-   relative： 先放在原先的位置，在不改变原本布局下调整位置
-   absolute： 移出正常文档流，并不为元素预留空间，相对于非 static 的最近祖先元素定位
-   fixed： 移出正常文档流，相对于屏幕视口（viewport）定位
-   sticky： 元素根据正常文档流进行定位，然后相对它的最近滚动祖先进行偏移。偏移值不会影响任何其他元素的位置

## 定位类型

-   相对定位：relative
-   绝对定位：absolute、fixed
-   粘性定位：sticky

## sticky

[Sticky Demo](/code/css/position/sticky.html)

粘性定位可以被认为是 relative 和 absolute 的结合。元素在跨越特定阈值前为相对定位，之后为固定定位。但是一直不影响原本布局

sticky 元素会固定在离它最近的一个拥有“**滚动机制**”的祖先上。滚动机制不仅仅指的可以滚动的元素，还包括 overflow 是 hidden、scroll、auto、overlay 的时候。这也就是为什么当祖先元素有 overflow:hidden 的时候，sticky 看起来好像失效了。

比如我们想让 sticky 相对于 viewport 来定位，但是 sticky 元素的祖先元素有一个是 overflow:hidden，那么此时 sticky 就是相对于这个 overflow:hidden 的元素定位，而不是 viewport 定位。所以看起来像是失效了

```css
#sticky {
    position: sticky;
    top: 10px;
}
```

在祖先滚动到元素 top 距离小于 10px 之前，元素为相对定位。之后，元素将固定在与顶部距离 10px 的位置，直到祖先回滚到阈值以下。
