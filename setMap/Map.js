/**
 * Created by Administrator on 2016/6/14.
 */

;(function() {

  // Map 提供一种比Object 更完善的hash 实现
  // Object 也是一种hash 实现,但规定,键的类型只能是字符串或Symbol
  // Map 的键可以是任意类型
  // 既然是任意类型的键,就有必要关心如何判断同名属性
  // Map 对键值使用的重复算法于Set 一样:
  //    非引用类型直接判断值
  //    引用类型就要判断起内存地址是否一致

  // 构造函数允许以数组形式传入键值对来初始化

  // 实例属性:
  //    size: Map 中的键值对总数

  // 实例方法:
  //    set(key, value): 设置键值对,如果出现同名键,新设置的值会覆盖旧的值,方法返回Map 实例,方便链式写法
  //    get(key): 读取key 对应的值,找不到则返回undefined
  //    has(key): 返回Map 实例中是否包含key
  //    delete(key): 删除Map 实例中key 对应的整个键值对
  //    clear(): 清空Map 中的数据
  //    keys(): 返回Map 中键名的Iterator 遍历器
  //    values(): 返回Map 中值的Iterator 遍历器
  //    entries(): 返回Map 中键值对的Iterator 遍历器，键值对item 是一个数组（[key, value]）
  //    forEach(): 遍历Map

  {

    let map = new Map([['name', 'sam'], [{age: 18}, (age) => console.log(age)]]);

    console.log(map.get('name'));
    console.log(map.has('name'));
    console.log(map.has({age: 18}));

    let age = {age: 18};
    console.log(map.set(age, (age) => console.log(age * 2)).has(age));

    console.log(map.size);

    for (let key of map.keys()) {
      console.log(key);
    }

    for (let value of map.values()) {
      console.log(value);
    }

    for (let [key, value] of map.entries()) {
      console.log(key, value);
    }

    // 默认for...of 遍历的是entries
    console.log(map[Symbol.iterator] === map.entries);
    for (let entry of map) {
      console.log(entry[0], entry[1]);
    }

  }

})();
