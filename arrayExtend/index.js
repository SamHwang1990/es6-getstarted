/**
 * Created by sam on 16/6/5.
 */

;(function() {

  {
    // es6 提供了静态方法Array.from() 来达到以下目的:
    // 1. 将部署了[System.Iterator] 接口的对象转换为数组类型
    // 2. 将类数据的解构转为真正的数组类型
    // 3. 该方法允许提供一个map 函数作为第二个参数,作用是,在返回结果前,使用该函数来修改数据

    // 下面使用Array.from 来将arguments 转换为数组类型, 同时对比了扩展数组, arguments 本身以及Array.from 的转化结果
    function fromArguments(...args) {
      console.log(args);
      console.log(arguments);
      console.log(Array.from(arguments));
    }
    fromArguments(1, 2, 'sam', 'hwang', undefined, Number.MAX_SAFE_INTEGER, null, NaN, true, Date.now());

    console.log(Array.from({
      '0': 's',
      '1': 'a',
      '2': 'm',
      length: 3
    }).join(''));

    // 传入一个map 函数
    console.log(Array.from([1, 2, 3], x => x * x));
  }

  {
    // es6 提供了静态方法Array.of(), 将调用时传入的参数全部转为数组并返回
    console.log(Array.of('s', 'a', 'm'));
    console.log(Array.of(NaN, undefined, null, false));
  }

  {
    // Array.prototype.copyWithin(targetIndex, startIndex, endIndex) 用于在数组内部复制数据到指定位置
    // startIndex 为数据源的起始索引
    // endIndex 为数据源的结束索引, 可选, 默认是数组长度
    // 则, 要被复制的数据区间是[startIndex, endIndex), 一闭一开, 即, 包括startIndex 对应的元素, 不包括endIndex 对应的元素
    // targetIndex 为要黏贴的目标索引
    // 该方法会修改数组本身
    console.log([1, 2, 3, 4, 5, 6, 7].copyWithin(3, 0, 2));   // [1, 2, 3, 1, 2, 6, 7]
    console.log([1, 2, 3, 4, 5, 6, 7].copyWithin(6, 0, 3));   // [1, 2, 3, 4, 5, 6, 1]
  }

  {
    // Array.prototype.find(), Array.prototype.findIndex()
    // 允许使用者自定义匹配逻辑, 并找出数组中符合条件的第一个元素或索引
    // 支持传入一个函数作参数来自定义匹配逻辑, 要求返回boolean
    console.log([1, 2, 3, 4, 5].find(function(value, index, arr) {
      return value > 3;
    }));
    console.log([1, 2, 3, 4, 5].findIndex((value, index, arr) => value > 3));
  }

  {
    // Array.prototype.fill([startIndex], [endIndex])
    // 一般用作将数组中的数据填充成特定的重复的内容
    // 只建议用在填充空数组,因为该方法会覆盖现有的内容
    // 允许可选的传入startIndex, endIndex 来规定填充的范围, 同样,填充区间是[startIndex, endIndex)
    console.log(new Array(3).fill('sam'));
    console.log(Array.of(0, 1, 2).fill('sam'));

    console.log([1, 2, 3].fill('sam', 0, 2));
  }

  {
    // Array.protoype.entries(), Array.prototype.keys(), Array.prototype.values()
    // 分别对键值对遍历, 键遍历, 值遍历
    // 数组中的键指的是索引
    // 返回的都是可遍历对象, 可使用for...of 遍历
    let arr = ['sam', 'hwang', '1990'];
    for (let [index, value] of arr.entries()) {
      console.log(index, value);
    }

    for (let index of arr.keys()) {
      console.log(index, arr[index]);
    }

    // todo: 貌似node v6.2.0 还不支持Array.prototype.values()
    // chrome v52 已支持
    //for (let value of arr.values()) {
    //  console.log(value);
    //}
  }

  {
    // es7 提供语义化更明显的Array.prototype.includes 方法来判断数组是否包含某个对象
    // 作为对indexOf 方法部分使用场景的替代
    let arr = [1, 2, 4, NaN];
    console.log(arr.indexOf(2) >= 0);   // true
    console.log(arr.includes(2));       // true

    // 另外, 内部实现的算法于indexOf 也有所不同
    // 至少是填补了对NaN 的判断, 以前indexOf 是使用"===" 来判断的
    console.log(arr.indexOf(NaN));    // -1
    console.log(arr.includes(NaN));   // true
  }

  {
    // javascript 对数组空位的处理

    // es5 中对数组空位处理有不一致的地方:
    // forEach(), filter(), every() 和some()都会跳过空位
    // map()会跳过空位，但会保留这个值
    // join() 和toString() 会将空位视为undefined，而undefined和null会被处理成空字符串
    let arr = [1, , 2, , 3, , 4, , 5, , 6];
    console.log(arr.length);                // 11

    arr.forEach(x => console.log(x));

    console.log(arr.map(x => x * 2));

    console.log(arr.join('|'));
    console.log(arr.toString());

    // es6 中新增的api 则明确规定将空位视为undefined
    console.log(Array.from([, 2]));
    // console.log([, 2, 1, 'sam'].values());
    console.log(...([, 2, 1, 'sam'].keys()));
    console.log(...([, 2, 1, 'sam'].entries()));

  }


})();
