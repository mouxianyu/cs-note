'use strict'

// ✅ 变量提升
//  打印undefined
console.log('a', a)
var a = 10

{
    var b = 10
}

// ✅ 不存在块级作用域
// 打印10
console.log('b', b)

for (var i = 1; i < 3; i++) {}
//  打印3
console.log('i', i)

// ✅ 可以重复声明
var c = 10
var c = '111'
// 打印 111
console.log('c', c)
