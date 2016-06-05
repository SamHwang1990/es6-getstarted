/**
 * Created by sam on 16/6/5.
 */

;(function() {

  {
    // es6 允许使用箭头(=>)定义函数, 使用上比较简单, 但和普通函数在处理this 时有很大出入
    // 0. 参数的一些新属性: 默认参数, rest 参数, 参数解构依然可用
    // 1. 逻辑如果只有一行, 直接写即可, 表达式的运算结果会返回
    // 2. 逻辑如果只有一行, 但要返回对象, 则建议用括号包起
    // 3. 多行逻辑, 使用大括号包起
    // 4. 函数内部的this 指向函数定义所在作用域的this 对象, 不再是调用时再动态分析, 这个后面会有更详细的分析
    // 5. 箭头函数不能以new 来调用, 即, 不是构造函数
    // 6. 函数内部没有arguments 这个类数组的对象
    // 7. 箭头函数不能用作定义Generator 函数

    let func = (x, y = 2) => x * y;
    console.log(func(3));

    func = (name, age) => ({
      name: name.toUpperCase(),
      age: age
    });
    console.log(func('Sam', 18));

    func = (x, y, ...rest) => {
      var newA = [x *2, y * 3, ...rest];
      var sum = 0;

      console.log(newA);
      newA.forEach(v => sum +=v);

      return sum;
    };
    console.log(func(2, 44, 45, 89, 2324, 6554));

    // func 不是构造函数, 所以如果使用new 调用时, 抛出TypeError: func is not a constructor
    //func = (age) => {
    //  this.age = age;
    //};
    //console.log(new func(18).age);

    // 箭头函数内部的this 指向函数定义所在作用域的this 对象, 不再是调用时再动态分析
    // 上面的描述要分两部分来看:
    // 1. 箭头函数this 指向所在作用域的this 对象, 且这个指引关系不会改变
    // 2. 所在作用于的this 对象是个动态索引的对象, 意思就是, 不同的调用方式, this 指向不同

    // obj.getName 引用一个箭头函数, obj.getName() 的调用会输出undefined
    // 原因是, 该箭头函数定义在当前的块作用域中({}), 该作用域的上下文是块作用于的上下文, 而不是obj 这个对象
    let obj = {
      name: 'sam',
      age: 18,
      getName: () => this.name
    };
    console.log(obj.getName());           // undefined

    // 下面修改了obj.getName 的值, 将其初始化为一个普通的匿名函数, 里面定义了一个箭头函数
    // 此时, 箭头函数的this 对象会指向obj.getName 调用时的上下文
    obj.getName = function() {
      return () => this.name.toUpperCase();
    };
    console.log(obj.getName()());                             // SAM
    console.log(obj.getName.call({name: 'young'})());         // YOUNG

    this.name = 'Lin';
    let blockGetName = obj.getName;
    console.log(blockGetName()());                            // LIN

    // 下面展示了箭头函数this 机制的一个非常有用的使用场景
    // 使用箭头函数作回调函数,能保证函数内部的上下文

    // 下文setTimeout 回调中的箭头函数的this 指向getAge 调用时的this 对象,
    // 于是,以obj.getAge() 来调用时, 箭头函数的this 指向了obj
    obj.getAge = function() {
      setTimeout(() => console.log(this.age), 0);
    };
    obj.getAge();                                             // 18


    // 下文getName 函数中出现了多个箭头函数
    // 观察以下执行结果, 可以发现:
    // 1. 嵌套的所有箭头函数的this 对象都引用了同一个this 对象,即初始调用getName 时动态索引的this 对象
    // 2. 第一个箭头函数指向getName 的this,并维持不变
    // 3. 第二个箭头函数的this 指向第一个箭头函数的this
    // 4. 第三个箭头函数的this 指向第二个箭头函数的this
    let getName = function() {
      return () => {
        return () => {
          return () => {
            console.log('name:', this.name.toLowerCase());
          };
        };
      };
    };

    let n1 = getName.call(obj);
    n1()()();
    n1.call({name: 'young'})()();
    n1().call({name: 'young'})();
    n1()().call({name: 'young'});

  }

})();
