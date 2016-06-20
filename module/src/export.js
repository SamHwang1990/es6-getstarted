/**
 * Created by sam on 16/6/20.
 */

// ES6 的模块机制是只读的引用类型输出、输入,无论值是什么类型
// 也就是说, 使用模块的输入值在调用时才能决定,而且因为是只读的,所以不能强行修改export 值本身
// 模块的输出一般是对象类型的输出,即使写成export let name = 'sam'; 到最后的输出还是类似对象{name: 'sam'}
// 本质本质: 虽然输出的值格式像对象,但里面的内容,个人理解,更像是把变量整个输出,包括变量名、变量内存地址
// 所以, 对import 值的修改能影响到export 输出的值,而import 语句在获取输出值时,一定要用于输出值同名的键值才能成功获取
// 同时, export 一个变量值本身没什么意义,因为获取不到对应的变量名、值内存指针,因此,es6 会从语言本身禁止这种行为

// 综上几点:
// 1. export 输出是只读的
// 2. export 的输出值是引用关系,而不是拷贝关系
// 3. export 输出一个带变量名、变量值内存地址的类对象
// 4. import 引入是一定要解构目标模块export 内容中同名输出才能获取到正确的值
// 5. export default 能输出一个不带名字的任何类型的数据,import 时也不需要同名解构
// 6. 使用as 来对输出、输入的变量重命名

let name = 'sam';
let age = 18;
let sex = 'male';

export let height = 171;

// 下面两条语句都相当于直接输出"51kg" 这个字符串,这种方式会被语言本身禁止
// let weight = '51kg';
// export weight;
// export '51kg';

export {name, age, sex as gender}
export default () => {return 'default export'}