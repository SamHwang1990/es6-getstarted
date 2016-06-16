/**
 * Created by sam on 16/6/16.
 */

;(function() {

  // 这里单独说下Generator 函数内部上下文的问题,即this
  // 一句话说明: Generator 函数不能被用来当作构造函数调用,会抛异常
  // 导致的结果是,在Generator 内部使用的this 是不会返回给外界的,
  // 所以尝试给this 添加属性方法啊等操作都是无意义的,因为外界根本拿不到
  // 而且Generator 内部如果给this 添加属性,非严格模式下会把属性、方法写到全局作用域中,会造成污染,要避免。

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
    console.log(global.max);      // 但其实,Generator 内部的this 一般指向了window 或global,相当于该了全局属性,一定要避免
  }

  {
    let count = function* () {}
    count.prototype.__a__ = 2;

    console.log(count().__a__);
  }

})();
