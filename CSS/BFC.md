BFC，全称为“Block Formatting Context”（块级格式化上下文），是CSS布局中的一个概念。BFC是一个独立的渲染区域，拥有自己的渲染规则，**内部元素的布局不会影响外部元素，也不会受到外部元素的影响**。

## BFC触发条件
1. 根元素（`<html>`）
2. 浮动元素（`float`不为`none`）
3. 绝对定位或固定定位元素（`position`为`absolute`或`fixed`）
4. 行内块元素（`display`为`inline-block`）
5. 表格单元格（`display`为`table-cell`，包括`<td>`和`<th>`元素）
6. 表格标题（`display`为`table-caption`，包括`<caption>`元素）
7. 块级表格容器（`display`为`table`、`table-row`、`table-row-group`、`table-header-group`、`table-footer-group`、`table-column`、`table-column-group`）
8. `overflow`属性不为`visible`的块元素
9. `display: flow-root`

## BFC特性
### 1. BFC内部的块级盒子会在垂直方向，从上往下一个接一个地放置
   ![[image-20240624162622340.png]]
   

### 2. 同一个BFC中的两个相邻块级盒子的上下margin会发生重叠，取最大的margin
   ![[image-20240624162903305.png]]


### 3. BFC的区域不会与浮动盒子重叠
![](CSS/assets/BFC/image-20240624165056767.png)




### 4. BFC是一个独立的容器，容器内的子元素不会影响到外面的元素，反之亦然。
### 5. 计算BFC的高度时，浮动子元素也会被计算在内。

## BFC的应用场景
### 清除浮动
当一个元素的子元素浮动时，父元素可能会高度塌陷。可以通过触发BFC来解决这个问题。
```css
.clearfix {
  overflow: hidden; /* 触发BFC */
}
```

### 防止外边距重叠
相邻元素的垂直外边距会发生折叠。通过触发BFC，可以防止这种情况。
```css
.element {
  overflow: hidden; /* 触发BFC */
}

```
### 自适应多列布局
在浮动布局中，BFC可以用来创建自适应的多列布局。
```css
.column {
  float: left;
  width: 50%; /* 假设两列布局 */
}
.container {
  overflow: hidden; /* 触发BFC */
}

```
### 避免浮动元素影响
当你不希望一个容器内的元素受外部浮动元素影响时，可以使用BFC。
```css
.bfc-container {
  overflow: auto; /* 触发BFC */
}

```
