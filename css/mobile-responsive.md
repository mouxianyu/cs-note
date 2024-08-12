# 移动端适配

## 一些概念

### 像素

#### 物理像素

物理像素是指设备屏幕实际拥有的像素点数量。它是屏幕显示的最小物理单元，每个物理像素都能独立发光或显示颜色。

例如：iPhone 15 的像素是 2556 x 1179，那么就是它在真实设备的水平垂直方向上拥有的像素。

#### 逻辑像素

逻辑像素又称为设备独立像素或密度无关像素。它是为了在不同设备上保持相对一致的显示效果而引入的概念。

css 的像素就是逻辑像素

#### DPR（Device Pixel Ratio）

逻辑像素与物理像素之间存在一个比例关系，即像素比 DPR（Device Pixel Ratio）

比如，一个设备的 DPR 为 2，则表示在该设备上，1 个逻辑像素对应 2 个物理像素。

### viewport

viewport（视口）是指用户可见的区域，即浏览器窗口中用于显示网页内容的区域。

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

-   `width`: 控制视口的大小。这可以设置为特定像素数（如'width=600'），也可以设置为特殊值 device-width，即 100vw，100% 的视口宽度。最小值为 1。最大值为 10000。负值会被忽略。
-   `height`: 控制视口的大小。这可以设置为特定像素数（如 width=600），也可以设置为特殊值 device-height，即 100vh，100% 的视口高度。最小值为 1。最大值为 10000。负值会被忽略。
-   `initial-scale`: 控制页面首次加载时显示的缩放倍数。最小值是 0.1。最大值是 10。默认值为 1。负值会被忽略。
-   `minimum-scale`: 控制页面允许缩小的倍数。最小值是 0.1。最大值是 10。默认值为 1。负值会被忽略。
-   `maximum-scale`: 控制页面允许放大的倍数。设置一个低于 3 的值将不具备无障碍访问性。最小值是 0.1。最大值是 10。默认值为 1。负值会被忽略。
-   `user-scalable`: 控制是否允许页面上的放大和缩小操作。有效值为 0、1、yes 或 no。默认值为 1，与 yes 相同。将值设置为 0（即与 no 相同）将违反 Web 内容无障碍指南（WCAG）。
-   `interactive-widget`:指定交互式 UI 组件（如虚拟键盘）对页面视口的影响。有效值：resizes-visual、resizes-content 或 overlays-content。默认值：resizes-visual。
-   `view-fit`: 用于控制页面在视口中的适配方式的属性。
    -   `contain`：使页面内容在视口中完整显示，可能会出现空白区域。
    -   `cover`：使页面内容完全覆盖视口，可能会裁剪部分内容。

> 移动端通常会设置： width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no
>
> -   width=device-width —— 视口的宽度等于设备的宽度
> -   user-scalable=0 —— 禁止用户缩放页面

### CSS 常用单位

-   `px`：像素，是最常用的绝对单位，代表屏幕上的一个点。
-   `%`：百分比，相对父元素的尺寸。
-   `em`：相对单位，相对于当前元素的字体大小。
-   `rem`：根元素的字体大小，常用于响应式设计。
-   `vh`：视口高度的百分之一。
-   `vw`：视口宽度的百分之一。

### 媒体查询

媒体查询是 CSS3 中的一种功能，它允许网页根据不同的媒体类型和特性来应用不同的 CSS 样式。这使得网页设计可以针对不同的设备和环境做出响应，比如打印、屏幕、投影仪等。媒体查询通常用于创建响应式网页设计，使得网页在不同尺寸的屏幕上都能保持良好的显示效果。

#### 基本语法

-   `media-type`：指定媒体类型，常见的有 all、print、screen 等（如果不设置，默认为 all）。
-   `expressions`：可以包含多种条件，比如 width、height、orientation 等，用来进一步指定媒体特性。

```css
@media media-type and (expressions) {
    /* CSS rules */
}
```

例如，下面的媒体查询会在屏幕宽度小于或等于 600px 时应用一组 CSS 规则：

```css
@media screen and (max-width: 600px) {
    body {
        background-color: lightblue;
    }
}
```

## PC 端适配

PC 端需要适配不同的屏幕大小，常见的尺寸如下：

-   2560（4k 屏）
-   1920
-   1440
-   1024

### media + rem

使用媒体查询和 rem 来适配不同尺寸的屏幕。

1. 设置常用不同屏幕的宽度对应的 rem 大小
2. 以一个屏幕为基准设置其 rem 为多少像素，像素增加减少，media 的大小根据此来进行换算
    - 如设定 1920 屏幕的 rem 为 16px
    - 那么 15px 对应的屏幕宽度就是 1920/16\*15 = 1800
    - 14 —— 1920/16\*14 = 1628
    - 17 —— 1920/15\*17 = 2040

## 移动端适配

### 响应式（PC/移动响应式）

#### 设计原则

1. 移动优先(Mobile First) ：先为移动设备编写样式，然后使用媒体查询为更大屏幕添加样式

#### 布局方式

1. **流式布局**：页面元素的宽度根据屏幕宽度进行自适应调整。（如使用媒体查询,在小于 960px 的时候将布局调整成移动端）
2. **网格布局**：能够更精确地划分页面区域，实现复杂的布局。
3. **断点设计**：根据不同的屏幕尺寸设置断点，在断点处改变布局结构。

#### 其他处理

1. **图片和媒体的响应式处理**：根据屏幕尺寸加载合适的图片和媒体资源
2. **隐藏和显示元素**：根据屏幕大小隐藏或显示不必要的部分
3. **字体大小调整**：使用相对单位如 em 或 rem 来设置字体大小

#### Bootstrap

-   **网格布局**： Bootstrap 使用一个基于行和列的栅格系统来创建布局。每个容器（container）被分为 12 个等宽的列，这些列可以根据需要进行组合。
-   **断点设计**： 在较小的屏幕上，栅格列会垂直堆叠。列可以嵌套在其他列内，以创建更复杂的布局。

### 移动端单独布局

1. **流式布局**： 元素根据屏幕宽度自适应（使用 media+rem）
2. **基于视口单位的布局方式**： 使用 vw/vh 来布局
    1. 存在精度计算问题
    2. 平板电脑上会显示很大

## Tips

1. 根据设计需求来考虑布局方式，与设计先确定好设计布局方式。
2. 响应式布局应该考虑移动端优先
3. 可以使用 postCSS 插件或 SCSS 函数的方式来实现单位转化（如 px2rem、px2viewport）
4. 使用 postCSS 的单位转化插件的时候可以直接和设计稿的真实像素联系起来，可以直接用设计稿的像素，通过插件转化单位

## 之前项目从响应式（media+rem）改为 PC（media+rem）+移动（vw）的原因

### 为什么要分别搭建

1. **移动端没法很好适配 PC 端的部分设计**：之前的设计稿是基于 PC 端设计的，移动端是根据 PC 端调整（有时候甚至没有移动端设计稿），有些内容比较没办法直接从 PC 适应到移动端（甚至需要 PC 一个版本，移动一个版本，然后在不同端相互隐藏）
2. **移动端设计要求变高**： 公司打算重新设计移动端，且移动端结构会比较复杂，且和 PC 端差距很多
3. **PC 移动同页面资源较大** ： 因为经常要两端互相隐藏，还有其他一些设置，会导致一个页面的资源比较大

### 移动端为什么用 vw

1. **设计风格**：设计的背景图片通常是复杂的背景或实景，且通常和前景图片有位置固定要求。如果使用流式布局的话，容器高度变化、字体大小变化容易导致背景图像偏移，因此采用 vw 的方式可以固定位置。
2. **实现方便**：只需要一套布局方式，不需要用 media 对多个屏幕进行调整，比较方便。