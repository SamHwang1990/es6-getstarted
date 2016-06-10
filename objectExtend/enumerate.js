/**
 * Created by sam on 16/6/7.
 */

;(function() {

  // JS 发展到ES6 这个阶段,提供了以下集中遍历对象属性的api
  // 留意在遍历属性是对原型链属性,不可枚举属性以及Symbol 类型属性的区别
  // 1. for ... in 遍历: 循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）
  // 2. Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）
  // 3. JSON.stringify() 只串行化对象自身的可枚举的属性（不含Symbol属性）
  // 4. Object.getOwnPropertyNames() 返回一个数组，包含对象自身的所有属性,包括不可枚举属性（不含Symbol属性）
  // 5. Object.getOwnPropertySymbols() 返回一个数组，包含对象自身的所有Symbol属性
  // 6. Reflect.ownKeys() 返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举

  {
    let obj = {foo: 'bar', 1: 23};
    console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));
    console.log(Object.getOwnPropertyDescriptor(obj, '1'));

    let person = {
      getGender() {
        return this.gender;
      },
      getName() {
        return this.name;
      },
      getAge() {
        return this.age;
      }
    };

    let male = Object.create(person, {gender: {
      value: 'male',
      writable: false,
      enumerable: true,
      configurable: false
    }});
    let female = Object.create(person, {gender: {
      value: 'female',
      writable: false,
      enumerable: false,
      configurable: false
    }});

    let sam = Object.create(male, {
      name: {
        value: 'sam',
        writable: true,
        enumerable: true,
        configurable: true
      },
      age: {
        value: 18,
        writable: true,
        enumerable: false,
        configurable: true
      },
      [Symbol()]: {
        value: 'symbol',
        enumerable: true
      }
    });
    // sam[Symbol()] = 'symbol';
    let young = Object.create(female);
    Object.assign(young, {name: 'young', age: 17, [Symbol()]: 'symbol'});

    for (let key in male) {
      console.log(key, male[key]);
    }
    for (let key in female) {
      console.log(key, female[key]);
    }

    for (let key in sam) {
      console.log(key, sam[key]);
    }
    for (let key in young) {
      console.log(key, young[key]);
    }

    console.log(Object.keys(sam));
    console.log(Object.keys(young));

    console.log(JSON.stringify(sam));
    console.log(JSON.stringify(young));

    console.log(Object.getOwnPropertyNames(sam));
    console.log(Object.getOwnPropertyNames(young));

    console.log(Object.getOwnPropertySymbols(sam));
    console.log(Object.getOwnPropertySymbols(young));

    console.log(Reflect.ownKeys(sam));
    console.log(Reflect.ownKeys(young));

    // 该方法已过时:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/enumerate
    // Reflect.enumerate(sam);

    // ES6 提供了Object.setPrototypeOf() 来设置对象的原型, 与ES5 的Object.getPrototypeOf() 对应
    console.log(Object.is(male, Object.getPrototypeOf(sam)));
    console.log(Object.setPrototypeOf(sam, female));
    console.log(Object.is(male, Object.getPrototypeOf(sam)));
    console.log(sam.getGender());
    console.log(Object.is(female, Object.getPrototypeOf(sam)));

    // 根据Mozilla 的文档,如果对象原型的isExtensible 为false, 则setPrototypeOf 会抛TypeError
    // 但貌似下面的demo 并不会抛错误
    // todo: 待确认
    let proto = {a: 2};
    Object.preventExtensions(proto);
    obj = Object.create(proto);
    console.log(Object.isExtensible(proto));
    console.log(Object.isExtensible(Object.getPrototypeOf(obj)));
    console.log(obj.a);
    Object.setPrototypeOf(obj, {a: 1});
    console.log(obj.a);
  }

})();