/**
 * Created by sam on 16/6/2.
 */

;(function() {

  {
    let foo = '\u{1f4a9}a';
    console.log(foo);

    console.log(foo.length);

    console.log(foo.charCodeAt(0).toString(16));
    console.log(foo.charCodeAt(1).toString(16));

    console.log(foo.codePointAt(0));
    console.log(foo.codePointAt(0).toString(16));

    // 从下面的例子可以看出codePointAt 的思路:
    // 1. 该方法对字符串的寻找还是依据字符串长度以及索引位置
    // 2. 如果索引对应的字符码点位于代理码段的高位区段,则会自动查找下一个字符,并将两者合起来解析
    // 3. 如果索引对应的字符码点位于代理码段的低位区段,则只解析当前字符
    console.log(foo.codePointAt(1).toString(16));

    console.log(foo.codePointAt(2).toString(16));

    console.log(foo === '\ud83d\udca9a');

    console.log(String.fromCodePoint(0x1f4a9));

    console.log(foo === (String.fromCodePoint(0x1f4a9) + 'a'));
  }

  {
    let foo = '\u{1f4a9}abcfoo';

    // String 对象具有[System.iterator] 接口
    // 所以,可以使用for...of 来遍历字符串
    // 同时,foo...of 可以识别SMP 字符
    for (let c of foo) {
      console.log(c);
    }

    for (let i = 0; i < foo.length; ++i) {
      console.log(foo[i]);
    }

  }

})();

