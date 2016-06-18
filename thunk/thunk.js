/**
 * Created by sam on 16/6/18.
 */


(() => {

  var fs = require('fs');

  // JS 上对Thunk 的应用主要是对包含callback 参数的函数进行封装,
  // 好处是重复利用非callback 参数
  {
    let Thunk = fn => {
      return (...args) => {
        return callback => fn.apply(Object.create({}), [...args, callback]);
      }
    };

    // 下面对fs.readFile 的Thunk 处理重复利用了'./README.md' 以及 'utf8' 这两个参数
    let readFileThunk = Thunk(fs.readFile);
    let readmeThunk = readFileThunk('./README.md', 'utf8');
    readmeThunk((err, data) => {
      err && console.log(err);
      data && console.log(data);
    });

    // Thunk & Generator
    let gen = function* () {
      var readParam = fileName => [`../generator/${fileName}.js`, 'utf-8'];

      var _index = yield readFileThunk(...readParam('index'));
      var _return = yield readFileThunk(...readParam('return'));
      var _throw = yield readFileThunk(...readParam('throw'));

      return [_index, _return, _throw];
    };

    let run = (gen) => {
      gen = gen();

      function next(err, data) {
        var result = gen.next(data);
        if (result.done) {
          console.log(result.value.join('\n\n'));
          return result.value;
        }
        result.value(next);
      }

      next();
    };

    run(gen);
  }
})();