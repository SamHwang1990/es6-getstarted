/**
 * Created by sam on 16/6/3.
 */

;(function() {

  {
    let foo = 'Hello, World!';

    console.log(foo.includes('Hello'));
    console.log(foo.startsWith('He'));
    console.log(foo.endsWith('ld!'));

    // includes, startsWith, endsWith 均支持第二个参数 start
    // includes, startsWith 的第二个参数指示从哪个位置开始找,索引包括start 对应的位置
    // endsWith 的第二个参数指示从哪个位置之前的开始找,不索引start 对应的字符
    console.log(foo.includes('Hello', 6));
    console.log(foo.includes('llo', 2));
    console.log(foo.startsWith('He', 3));
    console.log(foo.startsWith('World', 7));
    console.log(foo.endsWith('lo', 5));
  }

})();