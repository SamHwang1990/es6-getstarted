/**
 * Created by sam on 16/6/1.
 */

;(function() {

  // 数组解构
  {
    let [a, b] = [1, 2];
    console.log(a, b);

    [a, b] = [, 3];
    console.log(a, b);

    [a, b] = [, [2], 3]
    console.log(Object.prototype.toString.call(b));
    console.log(a, b);

    [a, ...b] = [1, 3, 2];
    console.log(Object.prototype.toString.call(b));
    console.log(a, b);

    [a, [b, c], d] = [1, [2, 3], 4];
    console.log(a, b, c, d);
  }

  // Set 解构
  {
    let [a, b, c] = new Set(['a', 'b', 'c']);
    console.log(a, b, c);
  }

  // Generator 解构
  {
    function* fibs() {
      var a = 0;
      var b = 1;
      while(true) {
        yield a;
        [a, b] = [b, a + b];
      }
    }
    let [a, b, c, d, e] = fibs();
    console.log(a, b, c, d, e);
  }

  // 解构默认值
  {
    // 解构时是否使用默认值, 依据解构的值是否严格等于undefined, means '=== undefined', not '== undefined'
    let [a = 1, b = 2] = [];
    console.log(a, b);

    [a = 1, b = 3] = ['a', 'b'];
    console.log(a, b);

    // 解构是从左向右的, 因此,右边的变量的默认值可以使用左边变量解构后的值, 但不能调过来, 否则会ReferenceError
    [a, b = a] = ['a'];
    console.log(a, b);

    function d() {
      console.log('default destruction!');
      return 'd';
    }

    // 函数表达式惰性求值
    [a = d(), b = d()] = ['a'];
    console.log(a, b);

    [a = d(), b = d()] = [];
    console.log(a, b);
  }

})();
