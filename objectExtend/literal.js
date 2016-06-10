/**
 * Created by sam on 16/6/7.
 */

;(function() {

  // ES6 在使用对象字面量定义对象时,提供了简洁声明属性的方式
  // 1. 传入一个在作用域链上已初始化的变量, 此时, 变量名会作为键名,变量值会作为键值
  // 2. 声明函数类型的属性时,可省略"function" 关键字,此时的函数的name 为属性名

  var _private = 'young';

  {
    let foo = 'sam';
    let getName = () => 'sam hwang';
    let obj = {
      foo,
      _private,
      getName,
      getAge() {
        return '18';
      }
    };

    console.log(obj);
    console.log(obj.getName.name);
    console.log(obj.getAge.name);

    console.log(obj.getName());
    console.log(obj.getAge());
  }

  // es6 允许在定义对象属性的键名时使用表达式的运算结果
  // 但此功能与上面提到的简洁声明属性的功能不能同时使用
  // 使用方法: 用中括号括住表达式"[]"
  {
    let name = 'sam_hwang';
    let age = 18;
    let sam_hwang = '23';

    let obj = {
      //[name],
      [name.toUpperCase()]: name.toUpperCase(),
      [age + 1]: age + 1,
      [sam_hwang]() {
        return 'hello world!';
      }
    };

    console.log(obj);
    console.log(obj[sam_hwang]());
    console.log(obj[age + 1]);
    console.log(obj[name.toUpperCase()]);
  }

})();
