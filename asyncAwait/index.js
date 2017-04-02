/**
 * Created by samhwang1990@gmail.com on 17/3/22.
 */

'use strict';

const assert = require('assert');

/*
* async await 简单点理解就是在promise 基础上，提供同步编写异步逻辑的新语法
*
* 使用方法很简单，创建一个async 函数，函数内部使用await 运算符等待一个promise 更改其状态
*
* async 函数的调用返回一个promise：
*   pending => fulfilled 时表示函数正常运行所有逻辑
*   pending => rejected 时表示函数内部出现没有捕获的错误，这种错误也可能是来自于某个promise reject 了但没有捕获
*
* async 函数可以用作普通函数，对象的方法属性，箭头函数
*
* async 函数内的await
* 1. 语法上，await 后必须接表达式，不能使用：`await;`
* 2. await 运算符可以后接任何类型的值，比如null、undefined
*   2.1. 当await 一个promise 时，async 函数运行到该代码处，会等待promise 状态改变，
*        当变为fulfilled，则将resolve 的值当做await 的运算结果；
*        当变为rejected，则会导致async 函数内部抛出异常，如果该异常没有被try-catch，则会导致async 返回的promise 也变为rejected
*   2.2. 当await 一个thenable 的对象时，
*        async 函数运行到该代码处，会主动调用对象的then 方法，并传入一个successcb 回调函数，并等待successcb 被调用。
*        thenable 对象的then 方法在适当的时候调用successcb，并传入value，则该value 的值被当做await 的运算结果，async 函数继续执行
*   2.3. 除此以外，await 运算符可以接其他任何类型的值，包括generator，都会直接返回该值
*
* async 函数的原型链：
* async function(){}.__proto__ => Async Function
*                                (Async Function).__proto__ => Function.prototype
*
* 下面的awaitQueen 分别展示了如何利用async await 实现并发异步以及队列异步逻辑
*
* */


/*
* async 函数的调用返回一个promise
* 当函数内主动抛出异常时，即throw，promise 状态为：pending -> rejected，throw 紧跟的值则为promise reject 的返回值
* 当函数内await 的promise 为rejected 状态时，若不catch，则async 函数返回的promise 状态为：pending -> rejected，
*   即等同于throw，
*   await promise reject 的返回值则变为async promise reject 的返回值
*
* 除此以外，async 的promise 的状态基本为：pending -> fulfille，promise resolve的返回值与async 返回值一致
*
* 详情可见以下：asyncReturnPromise、asyncRejectWhenThrow 两个函数逻辑
* */
function asyncReturnPromise() {
  async function asyncReturnValue() {
    return 'async';
  }

  async function asyncReturnUndefined() {}

  async function asyncReturnFulfilledPromise() {
    return Promise.resolve('fulfilled async');
  }

  async function asyncReturnRejectedPromise() {
    return Promise.reject('rejected async');
  }

  let foo = asyncReturnValue();
  assert.equal(true, foo instanceof Promise, 'async function shall return a promise instance');

  foo.then(v => {
    assert.equal('async', v, 'asyncReturnValue shall resolve with the return value: async');
  });

  asyncReturnUndefined().then(v => {
    assert.equal(undefined, v, 'asyncReturnUndefined shall resolve with undefined');
  });

  asyncReturnFulfilledPromise().then(v => {
    assert.equal('fulfilled async', v, 'if async function return a promise, the async promise will follow the returned promise');
  });

  asyncReturnRejectedPromise().catch(v => {
    assert.equal('rejected async', v, 'if async function return a promise, the async promise will follow the returned promise');
  });
}

function asyncRejectWhenThrow() {
  async function rejectAsync() {
    throw 'foo';
  }

  let foo = rejectAsync();
  foo.catch(v => {
    assert.equal('foo', v, 'async function shall reject when err throw inside');
  })
}


/*
* 以下的asyncThrowWhenAwaitNoValue、awaitWithNullOrUndefinedIsOk、awaitWithPromise、awaitThenable、awaitGenerator_kiddingYou
* 分别展示了await 运算符后接各种类型的操作数时的情境，比如：
* 1. `await;`，此时会语法错误，解析不通过
* 2. await 类null 类型（null、undefined）
* 3. await promise
* 4. await thenable object
* 5. await generator
* */
function asyncThrowWhenAwaitNoValue() {
  try {
    Function("(async function rejectWhenAwaitNoValue() { await; })")();
  } catch(e) {
    assert.equal('Unexpected token ;', e.message, 'async function declaration will throw an error if await no value');
  }
}

function awaitWithNullOrUndefinedIsOk() {
  async function awaitNull() {
    return await null;
  }
  awaitNull().then(v => {
    assert.equal(true, v === null, 'async function resolve the returned null');
  });

  async function awaitUndefined() {
    return await undefined;
  }
  awaitUndefined().then(v => {
    assert.equal(true, v === undefined, 'async function resolve the returned undefined');
  });
}

function awaitWithPromise() {
  async function awaitRejectedPromise() {
    await Promise.reject('rejected');
    console.log('after rejected');    // this line will not be executed
    return 'after rejected';
  }

  async function awaitRejectedPromiseWithTryCatch() {
    try {
      await Promise.reject('rejected');
    } catch (e) {
      return 'after rejected try-catch';
    }
  }

  async function awaitPendingPromise() {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('pending to fulfilled');
      }, 10);
    });
  }

  async function awaitFulfilledPromise() {
    return await Promise.resolve('fulfilled');
  }

  let rejectedAwait = awaitRejectedPromise();
  let rejectedAwaitWithTryCatch = awaitRejectedPromiseWithTryCatch();
  let pendingAwait = awaitPendingPromise();
  let fulfilledAwait = awaitFulfilledPromise();

  rejectedAwait.catch(v => {
    assert.equal('rejected', v, 'if no try-catch for awaiting a rejected promise, async promise will be rejected.');
  });

  rejectedAwaitWithTryCatch.then(v => {
    assert.equal('after rejected try-catch', v, 'awaiting a rejected promise in try-catch block will not reject the async promise.');
  });

  pendingAwait.then(v => {
    assert.equal('pending to fulfilled', v, 'if awaiting a pending promise, the await expression will return with value which the promise is resolved');
  });

  fulfilledAwait.then(v => {
    assert.equal('fulfilled', v, 'if await a fulfilled promise, the await expression will return the value which the promise is resolved');
  });
}

function awaitGenerator_kiddingYou() {
  function* foo() {
    yield 'sam';
  }

  async function awaitGenerator() {
    return await foo();
  }

  awaitGenerator().then(v => {
    assert.deepEqual(Object.getPrototypeOf(v), foo.prototype);
    assert.deepEqual(v.next().value, 'sam');
  })
}

function awaitThenable() {
  async function awaitThenable() {
    return await {
      then: (cb) => cb('thenable')
    }
  }

  awaitThenable().then(v => {
    assert.equal(v, 'thenable', 'can await a thenable object');
  });
}

/*
* asyncAsObjectProperty() 方法展示async 函数可以像其他函数一样声明为对象属性、箭头函数
* */
function asyncAsObjectProperty() {
  let foo = {
    async a() {
      return `object literal property`
    }
  };

  foo.a().then(v => {
    assert.equal(v, 'object literal property', 'async function property is ok');
  });

  class Bar {
    async a() {
      return 'class prototype method';
    }
  }

  (new Bar).a().then(v => {
    assert.equal(v, 'class prototype method', 'async function method in prototype is ok');
  });

  (async () => 2)().then(v => {
    assert.equal(v, 2, 'async function can be a arrow function');
  });
}

/*
* asyncFunctionContext 函数展示了async 函数内this 上下文的用法，以及是否能作为构造函数：
* 1. new AsyncConstructor() 的调用会报错，并提示：AsyncConstructor is not a constructor
*    即，async function 不能用作构造函数
*    适用于严格模式和非严格模式
* 2. async 函数：bar，尝试使用了this 变量，并赋值：_name_ = 'foo'
*    2.1. 调用模式：bar()
*       在严格模式下，函数声明是不允许使用this 变量的，会抛异常
*       非严格模式下，this 指向的是全局作用域，会污染
*    2.2. 调用模式：bar.call({})
*       无论是严格、非严格模式，_name_ 都能正常赋值给call 传入的对象
*
* 3. async 函数：foo.myName，内部使用了this 对象，并输出this 对象的name 属性
*    3.1. 调用模式：foo.myName()
*       此时myName 内的this 能正确指向foo
*    3.2. 调用模式：let myName = foo.myName; myName()
*       此时则相当于上面的第2 点
* */
function asyncFunctionContext() {
  async function AsyncConstructor() {
    this._name_ = 'foo';
    return this;
  }

  try {
    (new AsyncConstructor()).then(v => {
      console.log(v._name_);
    })
  } catch (e) {
    assert.equal(e.message, 'AsyncConstructor is not a constructor', 'async function can not use as a constructor.');
  }

  try {
    let bar = async function() {
      this._name_ = 'foo';
    };
    bar();
    console.log(this._name_);
  } catch(e) {
    console.log(e);
  }

  try {
    let bar = async function() {
      this._name_ = 'foo';
    };
    let sam = {};
    bar.call(sam);
    console.log(sam._name_);
  } catch(e) {
    console.log(e);
  }

  let foo = {
    name: 'bar',
    async myName() {
      return this.name;
    }
  };

  foo.myName().then(v => {
    assert.equal(v, 'bar', `async function inside object can use 'this' context`);
  });
}

function prototypeChain() {
  async function foo() {
    return 'foo';
  }

  let proto = Object.getPrototypeOf(foo);

  assert.equal(foo[Symbol.toStringTag], 'AsyncFunction');
  assert.equal(Object.prototype.toString.call(foo), '[object AsyncFunction]');

  assert.notEqual(Object.getPrototypeOf(foo), Object.getPrototypeOf(()=>{}), 'the prototype of async function is not equal to common function prototype');

  assert.equal(Object.getPrototypeOf(proto), Function.prototype, 'common function prototype is at the root of async function prototype chain');
  assert.equal(Object.getPrototypeOf(proto), Object.getPrototypeOf(()=>{}), 'common function prototype is at the root of async function prototype chain');
}

function awaitQueen() {
  function resolveAfter2Seconds(x) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    })
  }

  async function parallelAwait() {
    let r1 = resolveAfter2Seconds(20);
    let r2 = resolveAfter2Seconds(30);

    return 10 + await r1 + await r2;
  }

  async function parallelAwaitWithPromiseAll() {
    let [r1, r2] = await Promise.all([resolveAfter2Seconds(20), resolveAfter2Seconds(30)]);
    return 10 + r1 + r2;
  }

  async function serialAwait() {
    let r1 = await resolveAfter2Seconds(20);
    let r2 = await resolveAfter2Seconds(30);

    return 10 + r1 + r2;
  }

  let parallelStart = process.hrtime();
  parallelAwait().then(v => {
    let interval = process.hrtime(parallelStart);
    console.log(`parallel await span ${interval[0]} seconds and ${interval[1]} nanoseconds.`);
    assert.equal(v, 60);
  });

  let parallelWithPromiseAllStart = process.hrtime();
  parallelAwaitWithPromiseAll().then(v => {
    let interval = process.hrtime(parallelWithPromiseAllStart);
    console.log(`parallel await span ${interval[0]} seconds and ${interval[1]} nanoseconds.`);
    assert.equal(v, 60);
  });

  let serialStart = process.hrtime();
  serialAwait().then(v => {
    let interval = process.hrtime(serialStart);
    console.log(`serial await span ${interval[0]} seconds and ${interval[1]} nanoseconds.`);
    assert.equal(v, 60);
  })
}

function asyncExecTiming() {
  async function a1() {
    console.log(`async function executing`)
    await new Promise(resolve => {
      setTimeout(resolve, 200);
    });
    console.log(`async do nothing anymore`);
  }

  console.log('before invoke async function');
  a1().then(() => {
    console.log('async function resolve');
  })
  console.log('after invoke async function');
}

asyncExecTiming();