/**
 * Created by sam on 16/6/16.
 */

;(function() {

  // 状态机
  // 代码执行控制权交换

  // Generator.prototype.return()
  // 用于调用者强制结束生成器的遍历,这种结束的返回值正常来说,必然done 为true
  // return() 的作用,其实也是调用者主动将函数执行的控制权交还给Generator 内部
  // 而切换的位置也是函数上一个yield 语句的返回值处,然后,就结束下面的执行直接返回 done=true
  // 当然,有个例外,就是如果切换返回的位置在try...finally 块内部,则会把下面的yield 都跑完才会返回 done=true

  {
    let count = function*() {
      yield 1;
      yield 2;
      yield 3;
      return 4;
    };

    let gen = count();
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.return());    // {value: undefined, done: true}

    gen = count();
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.return(5));   // {value: 5, done: true}
  }


  // 如果
  {
    let count = function* () {
      yield 1;
      try {
        yield 2;
      } finally {
        yield 3;
        yield 4;
      }
    };

    let gen = count();
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.return(5));
    console.log(gen.next());
    console.log(gen.next());
  }

})();
