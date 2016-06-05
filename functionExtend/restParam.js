/**
 * Created by sam on 16/6/5.
 */

;(function() {

  // 扩展运算符: ...
  // 不同的使用情景, 不同的作用
  // 1. 函数定义的参数列表, 能将调用函数时传入的没有显式定义的参数转成一个数组参数
  // 2. 函数调用的参数列表, 后接一个数组, 作用是将这个数组的元素拆开, 逐一传入到函数中
  // 3. 解构数组时, 会将没有匹配的数组元素放到指定的数组变量中

  {
    // 情景1, 函数定义的参数列表
    // 参考es6 的标签模板
    let tagged = function tagged(tempArr, ...values) {
      var result = [];
      var index = 0;

      for (; index < values.length; ++index) {
        result.push(tempArr[index], values[index]);
      }
      result.push(tempArr[index]);

      return result.join('');
    };

    console.log(tagged(['', ' is ', ' years old!'], 'sam', 18));

    // 情景2, 函数调用的参数列表
    console.log(tagged(['', ' is ', ' years old!'], ...['sam', 18]));

    // 情景3, 数组解构
    let [foo, bar, ...baz] = ['Hello', 'World', 1, false, null, NaN, undefined, 'aha'];
    console.log(foo);
    console.log(bar);
    console.log(Object.prototype.toString.call(baz));
    console.log(baz);
  }

  {
    // 关于上面提到的情景2, 深入来说, 扩展运算符可以展开部署了[Iterator] 接口的对象
    // todo: 展开后的数据到底算是什么呢? 推测应该是Generator 的return

    // 类数组对象不能展开,没有部署[Iterator]接口
    //console.log(...{
    //  '0': 1,
    //  '1': 2,
    //  '2': 3,
    //  length: 3
    //})

    console.log([...'Hello'].join('#'));
    console.log([...'hello', ...'world']);
  }

})();
