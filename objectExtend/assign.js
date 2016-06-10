/**
 * Created by sam on 16/6/7.
 */


;(function() {

  // Object.assign(target, ...sources)用于对象的合并，将源对象（source）的自身所有可枚举属性，复制到目标对象（target）
  // 第一个参数是目标对象，后面的参数都是源对象
  // 注意事项如下:
  // 1. 如果出现同名属性合并,则参数列表中靠后的对象的属性会覆盖之前的同名属性值,不管值的类型
  // 2. 如果目标对象的值不是对象,则会尝试转换为对象再进行合并,而null、undefined 由于没有对应的对象类型,所以会抛TypeError
  // 3. 如果源对象的值不是对象,则会尝试转换为对象再进行合并,而null、undefined 由于没有对应的对象类型,会被跳过
  // 4. 如果目标对象的某个属性的writable 设为false,且发生同名覆盖,则会因写入失败抛异常导致后续的合并都打断

  // 参考:
  // 1. https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  // 2. http://es6.ruanyifeng.com/#docs/object#Object-assign

  {
    // 正儿八经的用法
    console.log(Object.assign({}, {foo: 'bar'}));
    console.log(Object.assign({bar: '2'}, {foo: 1}));

    // 下面出现嵌套值的覆盖合并,最终都被第二个源对象的值所覆盖
    console.log(Object.assign({a: ['1', true], b: {b1: null}}, {a: 1, b: 2, c: 3}));

    // 目标对象是个数字字面量
    console.log(Object.assign(1, {foo: 'bar'}));
    console.log(Object.keys(Object.assign(1, {foo: 'bar'})));

    // 目标对象是个字符串字面量
    console.log(Object.assign('23', {foo: 'bar'}));
    console.log(Object.keys(Object.assign('23', {foo: 'bar'})));

    // 目标对象是个布尔类型字面量
    console.log(Object.assign(true, {foo: 'bar'}));
    console.log(Object.keys(Object.assign(true, {foo: 'bar'})));

    //console.log(Object.assign(null, {foo: 'bar'}));
    //console.log(Object.assign(undefined, {foo: 'bar'}));
    console.log(Object.assign(NaN, {foo: 'bar'}));
    console.log(Object.assign(Infinity, {foo: 'bar'}));

    // 目标对象是个数组,合并时会被转为对象,属性的键为数字索引
    // 源对象包含整数数字索引为键名的属性,则数组Iterator 遍历时会被返回
    let arr  = [1, 2, 3];
    Object.assign(arr, {foo: 'bar'});
    console.log(arr.length, arr);

    Object.assign(arr, {'3': 4});
    console.log(arr.length, arr);

    Object.assign(arr, {'5': 6});
    console.log(arr.length, arr);

    // 源对象非对象类型
    console.log(Object.assign({foo: 'bar'}, 12));
    console.log(Object.assign({foo: 'bar'}, true));
    console.log(Object.assign({foo: 'bar'}, null));
    console.log(Object.assign({foo: 'bar'}, undefined));

    // 源对象是字符串或数组时,也是会先转成对象,但这两个类型有点特别
    // 1. 字符串中的字符会被分割到独立的键值对,键名是对应的数字索引
    // 2. 数组类型的每个item 被分割到独立的键值对,键名是对应的数字索引
    console.log(Object.assign({foo: 'bar'}, 'baz'));
    console.log(Object.assign({foo: 'bar'}, ['a', 34564, true]));

    // 下面源对象和目标对象都是数组时,最终目标数组的元素可能会被部分覆盖
    console.log(Object.assign([1, 2, 3], [4, 5]));
  }

  {
    let obj = Object.create({foo: 'bar'}, {
      a: {
        value: 2    // 默认上不可遍历的
      },
      b: {
        value: 3,
        enumerable: true,
        writable: true,
        configurable: true
      }
    });

    // 源对象上只有自身的可遍历的属性才会被复制
    let copy = Object.assign({}, obj);
    console.log(copy);
  }

  {
    // Object.assign 不会复制属性的描述符
    let obj = Object.create({}, {
      a: {
        value: 2,
        writable: false,
        enumerable: true
      },
      b: {
        value: 3,
        enumerable: true,
        writable: true,
        configurable: true
      },
      [Symbol()]: {
        value: 'symbol1',
        enumerable: true
      },
      [Symbol()]: {
        value: 'symbol2',
        enumerable: false
      }
    });

    let copy = Object.assign({}, obj);
    console.log(copy);
    copy.a = 'new a';     // a 属性的writable: false 已经没有了
    console.log(copy);

    // 完整的复制源对象属性的descriptor 与symbol 属性
    let completeAssign = function completeAssign(target,...sources) {
      sources.forEach(source => {
        let descriptors = Object.keys(source).reduce((descriptors, key) => {
          descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
          return descriptors;
        }, {});

        Object.getOwnPropertySymbols(source).forEach(sym => {
          let descriptor = Object.getOwnPropertyDescriptor(source, sym);
          if (descriptor.enumerable) {
            descriptors[sym] = descriptor;
          }
        });

        Object.defineProperties(target, descriptors);
      });

      return target;
    };

    copy = completeAssign({}, obj);
    console.log(Reflect.ownKeys(copy));
    console.log(Object.getOwnPropertyDescriptor(copy, 'a'));
  }

  {
    let obj = Object.create({}, {
      a: {
        value: 1,
        writable: false,
        enumerable: true
      },
      b: {
        value: 2,
        writable: true,
        enumerable: true
      }
    });

    // 如果发生目标对象中的read-only 属性被源对象同名属性覆盖时,会抛TypeError,并中断合并
    try {
      Object.assign(obj, {b: 'new b'}, {a: 'new a', b: 'new new b'});
    } catch (e) {
      console.log(e);
    }
    console.log(obj);
  }


})();