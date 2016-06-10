/**
 * Created by sam on 16/6/7.
 */

;(function() {

  // es6 提供了判断两个值是否严格相等的方式:Object.is(val1, val2)
  // 该方法作用上其实与严格相等运算符的作用("===")是一致的
  // 不同的是针对"===" 进行了以下两点的修正:
  // 1. NaN 等于自身
  // 2. +0 不等于 -0

  {
    console.log('foo' === 'foo');
    console.log(Object.is('foo', 'foo'));

    console.log({} === {});
    console.log(Object.is({}, {}));

    console.log(NaN === NaN);
    console.log(Object.is(NaN, NaN));

    console.log(+0 === -0);
    console.log(Object.is(+0, -0));
  }

})();
