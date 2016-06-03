/**
 * Created by Administrator on 2016/6/3.
 */

;(function() {

  {
    let obj = {
      name: 'Sam',
      age: 16
    };

    // tagged 为标签模板调用的函数
    // 当以标签模板形式调用时，要留意其参数形式：
    // 例子：tagged`${obj.name} is ${obj.age} years old!`;
    // @param {Array} stringArr：将模板字符串中非模板部分提起出来组成数组
    // @param {Array} values：从第二个参数开始，就是模板字符串中替换变量后的模板部分，每部分独立作为参数传入，可使用对其解构
    // 注意：以当前标签模板的调用结果来看，stringArr 的长度比values 的长度大一，即stringArr.length - values.length = 1，
    //       所以，正确拼装模板字符串的姿势见下文的实现，以values 为迭代基准，分别将stringArr 和values 对应index 的值拼装，
    //       然后，把stringArr 中多出来的那一部拼装上去。
    let tagged = function tagged(stringArr, ...values) {
      var result = [];
      console.log(stringArr);
      console.log(values);

      let i = 0;
      while (i < values.length) {
        result.push(stringArr[i]);
        result.push(values[i]);
        ++i;
      }
      result.push(stringArr[i]);
      console.log(result.join(''));
    };

    // 下面针对tagged 函数的调用形式，让整个表达式变成了标签模板
    // 说白了，也就是函数调用
    tagged`${obj.name} is ${obj.age} years old!`;
    tagged`aha, no template value`;

    // String 带有静态的raw 方法做标签模板
    // 用来获取一个模板字符串的原始字面量值的
    // 比如下面，传入的\n 被当作两个字符：“\”和“n”，而不是换行符“\n”
    console.log(String.raw`${obj.name} is ${obj.age} years old!`);
    console.log(String.raw`Test:\n`);
    console.log(String.raw`Test:\n`.length);
  }

})();
