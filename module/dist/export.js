'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by sam on 16/6/20.
 */

// ES6 的模块机制是引用类型的输出、输入,无论值是什么类型
// 也就是说, 使用模块的输入值在调用时才能决定,同时,对输入值的修改也会影响到被引用模块的输出值
// 模块的输出一般是对象类型的输出,即使写成export let name = 'sam'; 到最后的输出还是类似对象{name: 'sam'}
// 本质本质: 虽然输出的值格式像对象,但里面的内容,个人理解,更像是把变量整个输出,包括变量名、变量内存地址
// 所以, 对import 值的修改能影响到export 输出的值,而import 语句在获取输出值时,一定要用于输出值同名的键值才能成功获取
// 同时, export 一个变量值本身没什么意义,因为获取不到对应的变量名、值内存指针,因此,es6 会从语言本身禁止这种行为

var name = 'sam';
var age = 18;
var sex = 'male';

var height = exports.height = 171;

// 下面两条语句都相当于直接输出"51kg" 这个字符串,这种方式会被语言本身禁止
// let weight = '51kg';
// export weight;
// export '51kg';

exports.name = name;
exports.age = age;
exports.gender = sex;

exports.default = function () {
  return 'default export';
};