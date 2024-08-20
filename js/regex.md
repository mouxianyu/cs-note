# 正则表达式

## 正则修饰符

| 修饰符 | 含义              | 英文补充                                                       | 描述           |
| ------ | ----------------- | -------------------------------------------------------------- | -------------- |
| `g`    | `g`lobal          | Don't return after first match                                 | 查找所有匹配项 |
| `m`    | `m`ulti line      | `^` and `$` match start/end of                                 | 多行匹配       |
| `i`    | `i`nsensitive     | Case insensitive match                                         | 大小写不敏感   |
| `x`    | e`x`tended        | ignore whitespace                                              |                |
| `s`    | `s`ingle line     | Don't match new line                                           |                |
| `u`    | `u`nicode         | Match with full unicode                                        |                |
| `U`    | `U`ngreedy        | Make quantifiers lazy                                          |                |
| `A`    | `A`nchored        | Anchor to start of pattern, or at the end of most recent match |                |
| `J`    | `J`changed        | Allow duplicate subpattern names                               |                |
| `D`    | `D`ollar end only | $ matches only end of pattern                                  |                |

## 字符

| 字符           | 描述                                                                                                                                                             |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `\`            | 转义字符                                                                                                                                                         |
| `^`            | 匹配字符开始                                                                                                                                                     |
| `$`            | 匹配字符结束                                                                                                                                                     |
| `*`            | 匹配前面零次或多次                                                                                                                                               |
| `+`            | 匹配前面一次或多个次                                                                                                                                             |
| `?`            | 匹配前面零次或一次                                                                                                                                               |
| `{n}`          | 匹配确定的 n 次                                                                                                                                                  |
| `{n,}`         | 匹配至少 n 次                                                                                                                                                    |
| `{n,m}`        | 匹配 n 到 m 次                                                                                                                                                   |
| `?`            | 非贪婪，当?在 (`*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}`) 后面表示非贪婪                                                                                             |
| `.`            | 匹配除换行符（\n、\r）之外的任何单个字符                                                                                                                         |
| `(pattern)`    | 匹配 pattern 并获取这一匹配                                                                                                                                      |
| `(?:pattern)`  | 匹配 pattern 但不获取匹配结果                                                                                                                                    |
| `(?=pattern)`  | 正向肯定预查（look ahead positive assert），非获取匹配，例如，`Windows(?=95\|98\|NT\|2000)`能匹配"Windows2000"中的"Windows"，但不能匹配"Windows3.1"中的"Windows" |
| `(?!pattern)`  | 正向否定预查(negative assert) ，非获取匹配，例如`Windows(?!95\|98\|NT\|2000)`能匹配"Windows3.1"中的"Windows"，但不能匹配"Windows2000"中的"Windows"               |
| `(?<=pattern)` | 反向(look behind)肯定预查，与正向肯定预查类似，只是方向相反                                                                                                      |
| `(?<!pattern)` | 反向否定预查，与正向否定预查类似，只是方向相反                                                                                                                   |
| `x\|y`         | 匹配 x 或 y                                                                                                                                                      |
| `[xyz]`        | 字符集合。匹配所包含的任意一个字符                                                                                                                               |
| `[^xyz]`       | 负值字符集合。匹配未包含的任意字符                                                                                                                               |
| `[a-z]`        | 字符范围。匹配指定范围内的任意字符                                                                                                                               |
| `[^a-z]`       | 负值字符范围                                                                                                                                                     |
| `\d`           | 匹配一个数字字符。等价于 `[0-9]`                                                                                                                                 |
| `\D`           | 匹配一个非数字字符。等价于 `[^0-9]`                                                                                                                              |
| `\s`           | 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 `[ \f\n\r\t\v]`                                                                                           |
| `\S`           | 匹配任何非空白字符。等价于 `[^ \f\n\r\t\v]`                                                                                                                      |
| `\w`           | 匹配字母、数字、下划线。等价于 `[A-Za-z0-9_] `                                                                                                                   |
| `\W`           | 匹配非字母、数字、下划线。等价于 `[^A-Za-z0-9_] `                                                                                                                |
