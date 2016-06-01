/**
 * Created by sam on 16/6/1.
 */

;(function() {

  // 对象解构
  // 模式匹配
  // 匹配失败的返回undefined
  // 匹配失败的判断是value 是否严格等于undefined,即,如果value = null,是匹配成功的,返回null
  // 注意,解构的是value,不是key

  {
    let {foo, bar} = {foo: 1, bar: 2};
    console.log(foo, bar);

    // 下面的例子表明,解构匹配返回的是value 部分
    let {foo: a, bar: b} = {foo: 1, bar: 2};
    console.log(a, b);

    // 如果要将解构的返回值赋给已声明过的变量,需要用括号包裹起来,避免JS 引擎将其视为代码块而不是解构
    ({a, b} = {a: 3, b: 4});
    console.log(a, b);

    let obj = {};
    ({foo: obj.a} = {foo: 1});
    console.log(obj.a);
  }

  {
    // 解构嵌套对象

    let {foo, bar} = {foo: {a: 1}, bar: 2};
    console.log(foo, bar);

    let {foo: a, bar: {baz: b}} = {foo: 1, bar: {baz: 2}};
    console.log(a, b);

    ({foo: a, bar: [b, {baz: c}]} = {foo: 1, bar: [2, {baz: 3}]});
    console.log(a, b, c);
  }

  {
    // 解构默认值
    let {foo, bar = 2} = {foo: 1, baz: 3};
    console.log(foo, bar);

    let {foo: a = 1, bar: b = 2} = {foo: 'foo'};
    console.log(a, b);
  }

  {
    // 解构匹配失败
    let {foo: a, bar: b} = {foo: null};
    console.log(a, b);

    ({foo: a} = {foo: undefined});
    console.log(a);

  }

})();