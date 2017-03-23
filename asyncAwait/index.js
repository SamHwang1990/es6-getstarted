/**
 * Created by samhwang1990@gmail.com on 17/3/22.
 */

'use strict';

const assert = require('assert');

/*
* 展示下async、await 的用法
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

function asyncAsObjectProperty() {
  let foo = {
    async a() {
      return 'object literal property'
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

awaitQueen();