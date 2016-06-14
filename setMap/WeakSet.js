/**
 * Created by Administrator on 2016/6/14.
 *
 * 参考：
 *    1. http://stackoverflow.com/questions/30556078/ecmascript-6-what-is-weakset-for
 *    2. http://es6.ruanyifeng.com/#docs/set-map#WeakSet
 */

;(function() {

  // WeakSet 与Set 有着非常不一样的用途和用法
  // 相同点：
  //    1. 同样允许以类似数组的方式来引用数据，保留插入顺序，数据不重复

  // API 不同点：
  //    1. 只提供三个实例方法：add()、delete()、has()
  //    2. 值的类型只能是对象类型

  // 用途 不同点：
  //    1. 值是弱引用，即WeakSet 实例不会持有其值，意味着，GC 在判断对象是否应该清除时，不会将WeakSet 对其的引用计算在内
  //    2. 从开放的接口来看，WeakSet 的用途是判断某个对象是否存在（has）
  //    3. 弱引用导致的结果是，如果该对象的引用次数降为0，则会自动从WeakSet 中清除
  //    4. WeakSet 更多的是用来在特定的逻辑中，标记某个对象的存在

  {
    let ws = new WeakSet();
    let sam = {name: 'sam'};

    try {
      ws.add(2);
    } catch(e) {
      console.log(e);
    }
    ws.add(sam);
    console.log(ws.has(sam));

    ws.delete(sam);
    console.log(ws.has(sam));
  }

  //  下面提供了一个使用WeakSet 的场景
  //  利用WeakSet，只有Cat 的实例才能正确的调用getName 方法
  //  如果Cat 实例被GC 清除，自然WeakSet 中引用对应的实例也会失效
  {
    let ws = new WeakSet();

    class Cat {
      constructor(name) {
        ws.add(this);
        this.name = name;
      }
      getName() {
        if (ws.has(this)) {
          console.log(this.name);
        } else {
          console.log('hehe');
        }
      }
    }

    let cat = new Cat('哆啦A梦');
    cat.getName();

    let dog = {
      name: 'single dog',
      getName: cat.getName
    };
    dog.getName();
  }

})();
