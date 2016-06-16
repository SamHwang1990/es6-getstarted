/**
 * Created by sam on 16/6/16.
 */

;(function() {

  // 这里单独说些Generator 函数内部上下文, 即this, 的问题
  // 一句话说明: Generator 函数不能被用来当作构造函数调用,会抛异常
  // 导致的结果是,在Generator 内部使用的this 是不会返回给外界的,
  // 所以尝试给this 添加属性方法啊等操作都是无意义的,因为外界根本拿不到

  // 不过,Generator 调用却是能返回一个生成器对象,该对象能拿到Generator.prototype 上的属性

  {
    let Count = function* (max) {
      this.max = max;
      for (let i = 1; i <= this.max; ++i) {
        yield i;
      }
      return 'i\'m done!';
    }

    try {
      let gen = new Count(5);
    } catch(e) {
      console.log(e);
    }

    console.log([...Count(5)]);   // 这次解构表明,虽然外界拿不到this, 但是在函数内部还是存在这么一个对象可以拿来用的
  }

  {
    let count = function* () {}
    count.prototype.__a__ = 2;

    console.log(count().__a__);
  }

})();
