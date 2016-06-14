/**
 * Created by Administrator on 2016/6/14.
 *
 * 参考:
 *    1. http://stackoverflow.com/questions/30556078/ecmascript-6-what-is-weakset-for
 *    2. http://es6.ruanyifeng.com/#docs/set-map#WeakMap
 */

;(function() {

  // WeakMap 与Map 有着非常不一样的用途和用法
  // 相同点：
  //    1. 以键值对方式阻止数据

  // API 不同点：
  //    1. 不提供遍历接口,比如:keys(), values(), entries(), forEach()
  //    2. 不提供clear()
  //    3. 键的类型只能是对象类型
  //    4. 对键对象是弱引用,即Map 不会持有该对象的引用

  // 用途 不同点：
  //    1. 键是弱引用，即WeakMap 实例不会持有其值，意味着，GC 在判断对象是否应该清除时，不会将WeakMap 对其的引用计算在内
  //    2. 弱引用导致的结果是，如果该键对象的引用次数降为0，则会自动从WeakMap 中自动清除,对应的value 也会被清除
  //    3. 从开放的接口来看，WeakMap 的用途当然还是键值对关系的存储
  //       该对应关系是,只要键对象还在内存中,没被GC 清除,那么对应的值就会伴随存在
  //       只要键对象被GC 清除,对应的值也会被自动清除,不用担心键对象以及值的内存泄漏

  // 下面使用一个WeakMap 来实现私有属性
  {
    let _counter = new WeakMap();
    let _action = new WeakMap();

    class Countdown {
      constructor(count, action) {
        _counter.set(this, count);
        _action.set(this, action);
      }
      count() {
        let counter = _counter.get(this);

        if (counter <= 1) {
          _action.get(this)();
          return;
        }

        _counter.set(this, --counter);
      }
    }

    let c3 = new Countdown(3, () => console.log('the end'));
    c3.count();
    c3.count();
    c3.count();
  }

})();
