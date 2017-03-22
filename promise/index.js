/**
 * Created by sam on 16/6/16.
 */

;(function() {

  // Promise 个人感觉更像状态机
  // Promise 实例有三种状态: pending、resolved、rejected
  // 每个Promise 实例的状态周期有以下几种情况:
  // 1. 初始化为pending, 则可能会变成resolved、或rejected
  // 2. 初始化为resolved,则不会再改变
  // 3. 初始化为rejected,则不会再改变

  // 从上面状态周期的分析可以看出,只要一个promise 状态变为resolved 或者rejected,则该promise 的状态是不会在改变了,
  // 此时可以认为promise 已经完成了,不管是成功还是失败。

  // 基于这种行为,promise 实例能记住该promise 变状态后的值,并不做更改。
  // 这样,往后再添加回调,也只会拿到同一个值。

  // 构造Promise 实例:
  // new Promise((resolve, reject) => {});
  // 即使用Promise 构造函数可以创建promise 实例, 该构造函数允许传入一个函数参数,
  // 下面将该函数参数简称为promise 业务函数
  // 该函数默认部署resolve、reject 两个函数参数,函数内部的逻辑可以通过调用resolve()、reject() 来使promise 状态改变

  // ES6 默认只提供两种方法来给promise 实例添加回调
  // 1. Promise.prototype.then()
  // 2. Promise.prototype.catch()

  // 注意几点:
  // 1. 构造Promise 时传入的函数参数是马上执行的,不会跨事件循环
  // 2. 构造Promise 时传入的函数参数中,resolve()、reject() 的回调执行最早都要到当前事件循环的最后
  // 3. 上面说过,每个promise 状态如果变为resolved 或rejected 后就不会再改变了,这里引入一种例外:
  //    当使用resolve() 来将状态置为resolved, 如果传入另一个promise 实例,
  //    则可以这么理解,当前promise 的状态会委托给新的promise 实例
  //
  //    当使用reject() 来将状态置为rejected 时,则不会发生上面的情况,
  //    而是会把新promise 实例设为当前promise rejected 时的value,并传递给回调

  // 上面第三点的应用场景很广:
  // 比如then()、catch() 方法如果返回一个promise 时,行为就是受第三点影响
  // 这两个方法因为设定会返回一个新promise 方便链式操作,所以可以认为返回操作本身就是调用Promise.resolve() 静态方法
  // 那么如果then、catch 内部return 一个promise, 就相当于Promise.resolve(promise)

  false && (function() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('foo');
      }, 10);
    });
    promise.then((msg) => {
      console.log(msg);
    })
  })();

  // 需要留意几个关键的函数调用时机:
  // 1. Promise 实例内部业务函数是初始化Promise 实例时立刻执行的,在当此事件循环中
  // 2. Promise 实例内部业务函数的resolve 的回调执行时机最早是当此事件循环结束之前,如果有setTimeout 或ajax 回调,则会再另外的事件循环中
  false && (() => {
    let promise = new Promise((resolve, reject) => {
      console.log('promise');
      resolve('foo');
    });

    promise.then((msg) => console.log(msg));
    console.log('Hi');
  })();

  let resolveMsg = (msg) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(msg);
      }, 10);
    })
  };

  let rejectMsg = (msg) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(msg);
      }, 10);
    })
  };

  // 在使用resolve 修改promise 时,可以传入一个promise 实例
  // 造成的结果是,当前promise 的状态不会马上改变,而是会等待参数promise 的状态改变
  // 并将当前promise 的状态修改为与参数promise 的状态一致

  // 注意,上面提到的,只对resolve() 方法有效
  // 如果使用reject,则当前promise 状态是一定会变成Rejected 的,并将参数promise 传入then 或catch 的回调函数中
  false && (() => {
    let p1 = resolveMsg('foo');
    let p2 = rejectMsg('bar');

    let p3 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(p1), 100);
    });
    // p3 resolve: foo
    p3.then((msg) => console.log(`p3 resolve: ${msg}`), (msg) => console.log(`p3 reject: ${msg}`));

    let p4 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(p2), 100);
    });
    // p4 reject: bar
    p4.then((msg) => console.log(`p4 resolve: ${msg}`), (msg) => console.log(`p4 reject: ${msg}`));

    let p5 = new Promise((resolve, reject) => {
      setTimeout(() => reject(p1), 100);
    });
    // p5 reject: [object Promise]
    p5.then((msg) => console.log(`p5 resolve: ${msg}`), (msg) => console.log(`p5 reject: ${msg}`));

    let p6 = new Promise((resolve, reject) => {
      setTimeout(() => reject(p2), 100);
    });
    // p6 reject: [object Promise]
    p6.then((msg) => console.log(`p6 resolve: ${msg}`), (msg) => console.log(`p6 reject: ${msg}`));

  })();

  // Promise.prototype.then(),接受两个参数:
  // 第一个参数为promise 状态变为Resolved 时的回调
  // 第二个参数为promise 状态变为Rejected 的回调

  // 每个then 都会返回一个新的promise 实例,可使用链式操作
  // 该新生成的promise 会从Resolved 或Rejected 的return 中获取
  // 如果回调返回值是promise 类型,则then 返回的promise 实例状态与返回值的promise 状态同步
  // 如果回调返回值是其它类型,则then 返回的新promise 状态默认变成Resolved

  // Promise.prototype.catch() 相当于Promise.prototype.then(undefined, function rejectedCallback() {});
  // 同样会返回一个新promise 实例,规则同上then 方法
  false && (() => {
    resolveMsg('foo').then((msg) => {
      console.log(`resolve: ${msg}`);
      return msg.toUpperCase();
    }).then((msg) => {
      console.log(`resolve: ${msg}`);
      return resolveMsg('bar');
    }).then((msg) => {
      console.log(`resolve: ${msg}`);
      return rejectMsg('baz');
    }).catch((msg) => {
      console.log(`catch: ${msg}`);
      return resolveMsg('sam');
    }).then((msg) => {
      console.log(`resolve: ${msg}`);
      return rejectMsg('fxxk');
    }).then(undefined, (msg) => {
      console.log(`reject: ${msg}`);
    });
  })();

  false && (() => {
    let promise = new Promise((resolve, reject) => {
      reject();
    });

    promise.then(() => console.log('resolve'), () => console.log('rejected by reject()'));

    let p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          throw new Error('some thing get wrong within promise setTimeout')
        } catch(error) {
          reject(error);
        }
      }, 1000);
    });
    p2.catch(error => {
      console.log(error);
      return Promise.resolve('catch handled');
    }).then(msg => console.log(msg));

    let p3 = new Promise((resolve, reject) => {
      throw new Error('some thing get wrong within promise')
    });
    p3.catch(error => {
      console.log(error);
      return Promise.resolve('catch handled');
    }).then(msg => console.log(msg));
  })();

  false && (() => {
    Promise.all([resolveMsg('bar'), resolveMsg('baz'), resolveMsg('foo')]).then(([a, b, c]) => {
      console.log(`all resolve: ${a}, ${b}, ${c}`);
    });

    Promise.all([1, 3, 'foo']).then((values) => {
      console.log(`all resolve: ${values}`);
    });

    Promise.all([resolveMsg('foo'), resolveMsg('bar'), rejectMsg('baz')]).then((msgs) => {
      console.log(msgs);
    }).catch((error) => {
      console.log(`catch: ${error}`);
    });
  })();

  false && (() => {
    Promise.race([resolveMsg('bar'), resolveMsg('baz'), resolveMsg('foo')])
        .then(msg => console.log(`ace resolve: ${msg}`));

    Promise.race([rejectMsg('foo'), resolveMsg('bar'), rejectMsg('baz')]).then(msg => console.log(`race resolve: ${msg}`))
        .catch(msg => console.log(`race catch: ${msg}`));
  })();

  // Promise.resolve() 静态方法用于创建一个Promise 实例,并初始化状态为Resolved
  // Promise.reject() 静态方法用于创建一个Promise 实例,并初始化状态为Rejected
  false && (() => {
    Promise.resolve(2).then(value => console.log(`static resolve: ${value}`));

    Promise.resolve(resolveMsg('foo')).then(value => console.log(`static resolve: ${value}`));

    Promise.resolve(rejectMsg('bar'))
        .then(value => console.log(`static resolve: ${value}`))
        .catch(value => console.log(`static resolve to rejected: ${value}`));

    Promise.reject(2)
        .then(value => console.log(`static reject to resolve: ${value}`))
        .catch(value => console.log(`static reject: ${value}`));

    Promise.reject(resolveMsg('bar'))
        .then(value => console.log(`static reject to resolve: ${value}`))
        .catch(value => console.log(`static reject: ${value}`));
  })();

})();