/**
 * Created by sam on 16/6/11.
 */

var anotherFooSym = require('./symbolFor.js').sym;
// import {sym as anotherFooSym} from './symbolFor'

{
  let sym1 = Symbol();
  let sym2 = Symbol();

  console.log(sym1 === sym2);

  // obj 中的后面两个属性的键类型是Symbol,如果像下面直接设,基本就等于一个没用的属性,因为外界已经拿不到了
  let obj = {
    [sym1]: 'foo',
    [sym2]: 'bar',
    [Symbol()]: 'baz'
  };
  obj[Symbol()] = 'Hello';

  console.log(Reflect.ownKeys(obj));
}

// Symbol.for 接受一个字符串作为symbol 的name 标识
// 该方法在调用时,会去全局作用域中查找是否有name 标识的Symbol
// 如果有,则返回找到的已存在的Symbol 值
// 如果没有,就创建一个带name 标识的symbol 值,并注册到全局作用域中
{
  let fooSym = Symbol('foo');
  let fooForSym = Symbol.for('foo');
  //let obj = {
  //  [Symbol.for('foo')]: 23
  //}

  console.log(fooSym === Symbol.for('foo'));
  console.log(fooForSym === Symbol.for('foo'));

  console.log(Symbol.keyFor(fooSym));
  console.log(Symbol.keyFor(fooForSym));
}

// 下面的例子揭示了一点:Symbol.for() 会将带name 标识的symbol 注册到全局作用域中
// 意味着,这是个跨模块的行为,一点也不封闭,想要封闭,只好模块内部使用尽量独特的名字(好鸡肋~~~
{
  let blockFoo = Symbol.for('foo');
  console.log(blockFoo === anotherFooSym);
  {
    let subBlockFoo = Symbol.for('foo');
    console.log(blockFoo === subBlockFoo);
  }
}