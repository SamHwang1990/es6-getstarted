/**
 * Created by sam on 16/6/5.
 */

;(function() {

  {
    // 默认参数
    // 只有在参数为undefined 时才会使用默认参数
    let func = function func(x = 'sam', y = 18) {
      console.log(x, y);
    };

    func('young', 'aha');
    func(0, undefined);
    func(null, 'aha');
    func(false, 'aha');
    func(undefined, 'aha');

    // 默认参数的值可以是: 任何静态常量, 已声明过的变量, 函数表达式, 运算表达式
    // 一句话理解关键: 默认参数的值及其包含的变量存在于函数定义的所在的作用域链中, 而不在函数定义产生的作用域中

    // 需要特别说明,当默认参数的值是一个函数表达式时,这个函数产生的作用域怎么算?
    // 答:
    // 1. 该函数表达式自身形成一个作用域,这是必然的.
    // 2. 又由于这个函数其实算是在包裹作用域中定义的,所以,函数自身的作用域被嵌套在包裹作用域中,
    //    而不是在默认参数所属的函数产生的作用于中

    // 剩下的,就是运行时的事了
    // 发生函数调用时,如果遇到需要使用默认参数,同时值是一个表达式,同时表达式里面包含变量,
    // 此时, 引擎就需要进行RHS 引用查询,也就是会在作用域中查找是否存在变量,如果存在,就进行赋值
    // 如果找不到,自然就报错: ReferenceError


    // false, null 等常量
    func = (x = false, y = null) => console.log(x, y);
    func();

    let foo;

    // 引用函数定义所在作用域中一个已声明但未初始化的变量
    func = (x, y = foo) => console.log(x, y);
    func();

    // 引用函数定义所在作用域中一个已声明且又初始化的变量
    // 对比上面的调用,可以看出,默认参数值的计算时运行时做的
    foo = 'bar';
    func('baz');

    // 默认参数引用同一函数定义中先声明的参数
    func = (x, y = x) => console.log(x, y);
    func(undefined);

    // 默认参数为一个函数, 此时, 该函数的作用域应该是位于外层的{} 块作用域中, 而不是在func 所产生的作用域中
    func = (x, y = () => 'Hello world!') => console.log(x, y());
    func('sam');

    // 默认参数是个表达式
    func = (x, y = x * 3) => console.log(x, y);
    func(10);

    foo = () => {
      var str = 'Hello world!';
      console.log(str);
      return str;
    };

    // 默认参数是个函数调用结果,这个调用只有当func 被调用时,传入的y 是undefined 才发生
    func = (x, y = foo()) => console.log(x, y);
    func('sam', 'i have y');
    func('sam');

    // 如果默认参数引用一个作用域中没被声明过的变量, 会抛ReferenceError
    //func = (x, y = baz) => 1;
    //func(2);
  }

  {
    let foo = (x, y, z = 123) => x + y + z;
    console.log(foo(12, 23));

    // 建议将默认参数放到参数列表后面, 避免调用函数时需要显式传入undefined 才能跳过默认参数
    foo = (x, y = 123, z) => x + y + z;
    console.log(foo(12, undefined, 23));
    //console.log(foo(12, , 23));

    // 每个函数都会有length 这个属性,用来指示函数的参数个数
    // 当使用了默认参数或者rest 参数后, length 属性的行为就会怪怪的
    // 1. length 只会指示需要显式传入的参数个数
    // 2. 也就是会将所有参数个数减去默认参数再减去rest 参数
    // 3. 还会减去默认参数后面声明的参数
    // 所以,强烈建议,将默认参数和rest 参数参数列表最后
    console.log(Array.prototype.copyWithin.length);

  }

})();
