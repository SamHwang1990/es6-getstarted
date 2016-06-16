/**
 * Created by sam on 16/6/15.
 */

;(function() {

  // ES6 新增Generator 函数,又称生成器
  // 个人理解Generator 是一个随时可中断执行的函数,
  // Generator 提供三个运算符来中断函数, 并切换函数执行的控制权给外界:
  // 1. yield: 将控制权交给调用者,使用yield 输出的值中,done 永远都是false, 即代表生成器未完成全部逻辑执行
  // 2. return: 将控制权交给调用者, 使用return 输出的值中,done 永远都是true, 即代表生成器已经执行完全部逻辑,
  //            往后调用者即使再次使用next 函数,得到结果也只会是{value:undefined, done: true}
  // 3. yield*: 将某次控制权交给另一个Generator 对象,
  //            而这个嵌套的Generator 可以实现自己的yield、return 来将一次控制权转换为多次

  // 同时提供以下三种方法将控制权由外界切换回函数内部:
  // 1. Generator.prototype.next()
  // 2. Generator.prototype.throw()
  // 3. Generator.prototype.return()


  // todo: Generator 这种可中断执行的函数在中断和恢复时,堆栈是怎么个实现呢?
  // todo: 推广开来研究,函数的堆栈是个怎样的实现?

  {
    let count = function* () {
      yield 1;
      yield 2;
      yield 3;
    }
    let gen = count();
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());    // {value: undefined, done: true}
    console.log(gen.next());    // {value: undefined, done: true}
  }

  {
    let count = function* () {
      yield 1;
      yield 2;
      yield 3;
      return 4;
    }
    let gen = count();
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());    // {value: 4, done: true}
    console.log(gen.next());    // {value: undefined, done: true}
  }

  {
    let generator = function* () {
      var name = yield;
      var age = yield;
      yield `name: ${name}, age: ${parseInt(age, 10)}`;
    }

    let gen = generator();
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());        // name: undefined, age: NaN
    console.log(gen.next());

    gen = generator();
    console.log(gen.next());
    console.log(gen.next('sam'));
    console.log(gen.next(18));      // name: sam, age: 18
    console.log(gen.next());
  }

  {
    let count = function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      return 5;
    }

    // 生成器对象可被foo...of 遍历, 也可用于解构
    // Symbol.Iterator 接口的机制就是Generator 对象
    // 但要注意,在迭代过程中done:true 的状态会被丢弃
    // 比如, 调用count 会生成一个Generator 对象,遍历这个对象只能获得1、2、3、4, 最后的{value: 5, done: true}被丢弃
    for (let num of count()) {
      console.log(num);
    }
    console.log([...count()]);
  }

  // 下面展示了yield* 的用法
  // yield* 的最终效果其实跟for...of 类似
  // 就是,会丢弃done:true 的返回值
  {
    let bigCount = function*() {
      yield 10;
      yield 20;
      return 30;
    };

    let count = function*() {
      yield 1;
      yield 2;
      yield* bigCount();
      yield 3;
      yield 4;
      return 5;
    };

    console.log([...count()]);

    let gen = count();
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
  }

})();
