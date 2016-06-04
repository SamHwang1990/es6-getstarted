/**
 * Created by sam on 16/6/4.
 */

;(function() {

  // es6 新增u flag 标识,用以解决遗留的js 引擎对smp unicode 字符的解析问题
  // 能将四字节长度的unicode 字符正确的解析为一个字符
  // 非常重要的正则unicode 匹配补充

  {
    let str = '\u{1f4a9}'; // \uD83D\uDCA9

    // 没有使用u, 则会将str 解析为两个字符,对应"\uD83D", "\uDCA9"
    // 如果使用u, 则会将str 解析为一个字符"\u{1f4a9}", 自然就对不上代理码对中的编码了
    console.log(/\ud83d/.test(str));    // true
    console.log(/\ud83d/u.test(str));   // false

    // "." 字符修正, 使只能将代理码对识别为一个unicode 字符
    console.log(/^.$/.test(str));       // false
    console.log(/^.$/u.test(str));      // true

    // 支持es6 的unicode 码点字符串: "\u{codePoint}"
    // 不使用u 标识, 则会被当作重复次数
    console.log(/\u{3}/.test('uuu'));           // true
    console.log(/\u{3}/u.test('\x03'));         // true
    console.log(/\u{1f4a9}/u.test(str));        // true

    // 量词的SMP 字符支持
    console.log(/💩{3}/.test('💩💩💩'));      // false
    console.log(/💩{3}/u.test('💩💩💩'));     // true

    // 预定义模式的SMP 字符支持
    console.log(/^\S$/.test(str));
    console.log(/^\S$/u.test(str));

  }

})();
