/**
 * Created by Administrator on 2016/6/14.
 */


;(function() {

  // Set 的数据结构类似于数组，保留插入顺序，同时只会保存不同值的数据，也就是说会筛选掉重复的数据
  
  // 判断重复的算法比较特殊，与严格相等的“===”有差别，又跟Object.is() 有差别
  // 简单来说，跟“===” 类似，除了NaN 等于NaN，跟Object.is() 类似，除了+0 等于-0

  // 构造函数允许传入一个数组作为初始化
  // 实例属性：
  //  size：Set 中的数据长度
  // 实例方法：
  //  add()：往Set 中添加数据
  //  delete()：删除Set 中的数据
  //  has()：检查Set 中是否包含指定数据
  //  clear()：清除Set 中所有数据
  //  keys()：返回Set 中键名的Iterator 遍历器，由于Set 中没有键名，所以这里其实返回的跟values() 是一样的
  //  values()：返回Set 中值的Iterator 遍历器
  //  entries()：返回Set 中键值对的Iterator 遍历器，键值对item 是一个数组（[key, value]）

  {
    let s = new Set([Symbol(), 2, 'foo', false, {name: 'sam'}]);
    
    console.log(s.size);
    console.log(...s.keys());
    console.log(...s.values());
    console.log(...s.entries());

    let sam = {name: 'sam'};
    console.log(s.has(sam));

    s.add(sam);
    console.log(...s.values());
    console.log(s.has(sam));

    s.add(false);
    console.log(...s.values());

    s.delete(2);
    console.log(...s.values());

    s.clear();
    console.log(s.size);

    s.add(+0);
    s.add(-0);
    console.log(Object.is(+0, -0));
    console.log(...s.values());
  }

})();