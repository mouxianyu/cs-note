ESModule是**官方标准**，CommonJS是**社区规范**，不是官方标准
随着时间推移，ESModule 的使用会越来越广泛，CommonJS会被逐步淘汰

## CommonJS
主要用于Node.js

### 模块定义和导出方式
- 导入：不需要放在最顶部，可以动态导入，导入是整个导入，不能部分导入
	- `const xxx = require(xxx)` 导入
	- `const {xxx,xxx} = require(xxx)` 导入并解构赋值，这边的 `{}` 是解构赋值
- 导出：
	- `module.exports.xxx` 单个导出
	- `module.exports {xxx,xxx}` 导出对象
	- `module.exports` 可以简写成 `exports` ，`exports` 是`module.exporst` 的引用。如果在同一个文件里混合使用，当`module.exports={xxx}` 或 `exports={xxx}` 指向的是对象的时候，两者指向的对象不同，所以应该避免混合使用
- 运行时模块加载，模块在运行时动态解析和加载
- 同步加载模块，这意味着在加载模块时，必须等到模块加载完成后才能继续执行
- 支持动态导入
	```js
	if (condition) {
	  const moduleA = require('./moduleA');
	} else {
	  const moduleB = require('./moduleB');
	}
	```

- 导入是整个导入，编译的时候即使不使用也会导入
- 
## ES Module
ESModule 是现代 JavaScript 的标准，用于现代框架Vue、React等，一些浏览器也支持`<script type="module">`，Node.js 12 及以上支持，但是需要使用.mjs扩展名
- 导入：`import` 需要放在最顶部声明，动态导入使用其他语法。可以部分导入
	- `import {xxx,xxx}` 导入多个
	- `import * as xxx` 全部导入，`export default` 为 `xxx.default` 
	- `import {default as xxx,xxx}` 导入default和其他
- 导出：下面几个可以混合使用，且没有先后顺序问题
	- `export` 导出单个
	- `export {xxx,xxx}` 导出多个
	- `export default` 导出默认
- 编译时模块加载，模块在编译时静态解析和加载。
- 异步加载模块，这允许在模块加载的同时进行其他操作
- 支持动态导入，但是语法不同，使用`import('xxx')`
	```js
	if (condition) {
	  import('./moduleA').then(moduleA => {
	    // 使用 moduleA
	  });
	} else {
	  import('./moduleB').then(moduleB => {
	    // 使用 moduleB
	  });
	}
	```
- 可以部分导入，编译的时候可以去除不使用的部分