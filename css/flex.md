# 弹性盒子

弹性盒子是一种按行或按列的布局方式，元素可以膨胀以填充额外的空间，收缩以适应更小的空间。

## flex 模型说明

flex 容器内的元素沿着两个轴来布局：

-   主轴（main axis）： 沿着 flex 元素放置方向延伸的轴
-   交叉轴（cross axis）： 垂直于主轴方向的轴

## 主轴方向和换行

### 主轴方向 flex-direction

```css
 {
    /* 按行布局（默认） */
    flex-direction: row;
    /* 按照列布局 */
    flex-direction: column;
}
```

### 换行 flex-wrap

```css
 {
    flex-wrap: warp;
}
```

### flex-flow 简写

```css
 {
    /* flex-flow：<'flex-direction'> */
    flex-flow: row;
    flex-flow: row-reverse;
    flex-flow: column;
    flex-flow: column-reverse;

    /* flex-flow：<'flex-wrap'> */
    flex-flow: nowrap;
    flex-flow: wrap;
    flex-flow: wrap-reverse;

    /* flex-flow：<'flex-direction'> 和 <'flex-wrap'> */
    flex-flow: row nowrap;
    flex-flow: column wrap;
    flex-flow: column-reverse wrap-reverse;

    /* 全局值 */
    flex-flow: inherit;
    flex-flow: initial;
    flex-flow: revert;
    flex-flow: revert-layer;
    flex-flow: unset;
}
```

## 动态尺寸

[flex-grow、flex-shrink 计算示例.html](/code/css/flex/flex.html)

### flex-grow 扩张

-   **作用：** 定义元素扩张能力，当容器有额外空间的时候，元素可以增长的比例
-   **默认值：** 0，表示元素不会扩张
-   **取值：** 一个无单位的数值（0、1、2 等），数值越大，在容器中占据的空间比例越大
-   **计算方式：** 每个增长量 = (flex-grow 的值 / 总 flex-grow 的值) \* 额外空间

    ![flex-grow compute](/css/assets/flex/flex-grow-compute.png)

### flex-shrink 收缩

-   **作用：** 定义元素收缩能力，容器空间不足的时候，元素可以缩小的比例
-   **默认值：** 1，表示项目可以缩小以适应容器尺寸
-   **取值：** 一个无单位数值，0 表示不会缩小，其他数值表示项目可以按比例缩小
-   **计算方式：** 每个收缩量= ( [flex-shrink \* flex-basic] 的值 / 总 [flex-shrink\*flex-basic] 的值) \* 超出的空间

    ![flex-shrink compute](/css/assets/flex/flex-shrink-compute.png)

### flex-basic 基础尺寸

-   **作用：** 定义元素在分配空间之前的基础尺寸
-   **默认值：** auto，表示项目的基础此次是其内容的尺寸（如 width，或者其容器内部元素的宽度）,如果没有就是 0
-   **取值：** 可以是具体的长度（100px）、百分比（10%）、auto，百分比是基于容器的宽度来算的

### flex 简写

#### 三值

flex: \<flex-grow\> \<flex-shrink\> \<flex-basic\>

默认值： flex: 0 1 auto;

> 单值或双值，三个属性没有特别设置的情况下，flex-grow 为 1，flex-shrink 为 1，flex-basic 为 0

#### 单值

单独一个值，根据值的类型来判断时 flex-grow 还是 flex-basic。

-   值为 flex-grow： flex: \<flex-grow\> 1 0
-   值为 flex-basic： flex: 1 1 \<flex-basic\>

```css
/* flex */
 {
    /* 值类型为flex-grow有效值 */
    /* 等价于 flex: 1 1 0; */
    flex: 1;

    /* 值类型为flex-basic有效值 */
    /* 等价于 flex: 1 1 auto; */
    flex: auto;
    /* 等价于 flex: 1 1 100px; */
    flex: 100px;
    /* 等价于 flex: 1 1 10%; */
    flex: 10%;
}
```

#### 双值

flex: \<flex-grow\> \<flex-shrink | flex-basic\>

第一个值默认为 flex-grow，第二个值根据类型判断是 flex-shrink 还是 flex-basic

-   第二个值为 flex-shrink： flex: \<flex-grow\> \<flex-shrink\> 0
-   第二个值为 flex-basic： flex: \<flex-grow\> 1 \<flex-basic\>

```css
 {
    /* 相当于 flex: 1 1 30%; */
    flex: 1 30%;
    /* 相当于 flex: 1 1 0; */
    flex: 1 1;
}
```

## 水平垂直对齐

### 控制主轴 justify-content

1. flex-start: 默认值。所有 flex 项向行的起始边对齐。
2. flex-end: 所有 flex 项向行的结束边对齐。
3. center: 所有 flex 项在行的中心对齐。
4. space-between: 所有 flex 项在容器中平均分布，首尾两个项目分别贴靠在容器的起始边和结束边。
5. space-around: 所有 flex 项在容器中平均分布，但项目之间的间隙相等。注意，项目与容器边缘的间隙是项目之间间隙的一半。
6. space-evenly: 所有 flex 项在容器中平均分布，项目之间的间隙相等，且与容器边缘的间隙也相等。
7. stretch: 如果 flex 项没有设置宽度或高度（取决于主轴方向），则它们将伸缩以填充容器。

### 控制交叉轴 align-items

1. flex-start: 所有 flex 项向交叉轴的起始边对齐。
2. flex-end: 所有 flex 项向交叉轴的结束边对齐。
3. center: 所有 flex 项在交叉轴的中心对齐。
4. baseline: 所有 flex 项在交叉轴的基线对齐（基线是文本的底部，对于非文本元素，基线可能不明确）。
5. stretch: 默认值。如果 flex 项没有设置高度（对于行布局）或宽度（对于列布局），则它们将伸缩以填充容器在交叉轴上的空间。

> 使用 align-self 可以控制单个元素在交叉轴上的对齐方式，可以使用的值与 align-items 相同，但是多一个 auto：表示使用 align-items 的值
> align-items 没有 space-xxx 的值，justify-content 没有 baseline 的值

## 排序

改变 flex 布局位置，但是不影响 DOM 元素的排序

-   所有 flex 项默认的 order 值是 0。
-   order 值大的 flex 项比 order 值小的在显示顺序中更靠后。
-   相同 order 值的 flex 项按源顺序显示。所以假如你有四个元素，其 order 值分别是 2，1，1 和 0，那么它们的显示顺序就分别是第四，第二，第三，和第一。
-   可以使用负数值让其排在 order:0 前面

```css
.item {
    order: 1;
}
```
