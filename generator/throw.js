/**
 * Created by sam on 16/6/15.
 */

;(function() {

  // Generator.prototype.throw()
  // 用于调用者将函数执行的控制权切换回Generator 内部, 并在上一个yield 处抛出一个错误
  // 所以,如果要成功捕捉到这个外界主动抛出的错误,必须要try...catch 上一个yield 语句的返回
  // 如果Generator.prototype.throw() 抛出的错误被成功捕捉到, 则不会中断函数执行, 会继续抛下面的逻辑,所以,还可以继续next。。。
  // 如果Generator.prototype.throw() 抛出的错误没有被Generator 捕捉到,
  //      则会中断函数执行,并把错误抛会给调用者
  //      如果调用者也没有捕捉这个错误,则当前事件循环就会挂掉。

  {
    let count = function*() {
      yield 1;

      try {
        yield 2;
      } catch(e) {
        console.log(`generator catch: ${e}`);
      }

      try {
        yield 3;
      } catch(e) {
        console.log(`generator catch: ${e}`);
      }

      return 4;
    };

    // Generator.prototype.throw 用于在外界触发生成器对象内部的异常
    // 该方法有以下几个注意点:
    // 1. throw 方法切换回生成器内部的位置是上一个yield 语句的返回值
    // 2. 触发位置选择,如上面的count 生成函数, 函数内部有两个try...catch 块,
    //    以第一个为例来说明函数内部try...catch 块的作用
    //    1) 捕捉第二个yield 右侧表达视运算时出现的错误
    //    2) 捕捉外界第三次切换回函数内部,并主动触发的错误,
    //       即,如果外界要像触发一个错误,并被第一个try...catch 块捕捉到, 就需要放到第三步调用(next() => next() => throw())
    // 3. 如果throw 的错误成功被生成器内部捕捉到,则不会中断执行,并将当此隐式next 中剩余的逻辑跑完

    let gen = count();
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.throw('outer throw'));    // 注意这行代码的调用位置, 返回{value 3, done: false}
    console.log(gen.next());
  }

  {
    let count = function* () {
      try {
        yield 1;
      } catch(e) {
        console.log(`generator inner catch: ${e}`);
      }

      return 2;
    };

    // 下面生成器对象抛出的异常不能被生成器自身捕捉到,所以,导致生成器的停止遍历
    let gen = count();
    try {
      // 基本上, 最开始就throw 是不可能被生成器不抓到的
      console.log(gen.throw('something error'));
    } catch(e) {
      console.log(`outer catch: ${e}`);
      console.log(gen.next());    // 生成器已经停止遍历了, 输出{value: undefined, done: true}
    }
  }

})();

