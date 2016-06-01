/**
 * Created by sam on 16/6/1.
 */

;(function() {

  // 解构函数参数,可能会涉及到默认参数

  {
    // 这里只是默认参数
    let arr = [1, 2, 3].map((x = 0) => x + 1);
    console.log(arr);

    arr = [[1, 2], [3, 4]].map(([a, b]) => a*b);
    console.log(arr);

    arr = [[1], [, 4]].map(([a = 10, b = a]) => a*b);
    console.log(arr);
  }

  {
    let move = function({foo, bar}) {
      return [foo, bar];
    };

    // 下面会报错
    // console.log(move());
    console.log(move({}));
    console.log(move({foo: 1}));

    move = function({foo = 3, bar = 'aha'}, [a, b]) {
      return [foo, bar, a, b];
    };

    // 下面会报错
    // console.log(move());
    // console.log(move({}));
    console.log(move({bar: 2, baz: 'aha'}, [, 3]));

    // 这里使用了默认参数
    move = function({foo = 3, bar = 'aha'} = {foo: 0, bar: 2}, [a, b] = [1, 2]) {
      return [foo, bar, a, b];
    };

    console.log(move());
    console.log(move({}));
    console.log(move({bar: 2, baz: 'aha'}, [, 3]));
  }

})();