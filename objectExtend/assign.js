/**
 * Created by sam on 16/6/7.
 */


;(function() {

  {
    console.log(Object.assign({}, {foo: 'bar'}));
    console.log(Object.assign({bar: '2'}, {foo: 1}));

    console.log(Object.assign({a: ['1', true], b: {b1: null}}, {a: 1, b: 2, c: 3}));

    console.log(Object.assign(1, {foo: 'bar'}));
    console.log(Object.keys(Object.assign(1, {foo: 'bar'})));

    console.log(Object.assign('23', {foo: 'bar'}));
    console.log(Object.keys(Object.assign('23', {foo: 'bar'})));

    console.log(Object.assign(true, {foo: 'bar'}));
    console.log(Object.keys(Object.assign(true, {foo: 'bar'})));

    console.log(Object.assign(['a', true, 12], {foo: 'bar'}));      // 返回的是数组
    console.log(Object.keys(Object.assign(['a', true, 12], {foo: 'bar'})));

    //console.log(Object.assign(null, {foo: 'bar'}));
    //console.log(Object.assign(undefined, {foo: 'bar'}));
    console.log(Object.assign(NaN, {foo: 'bar'}));
    console.log(Object.assign(Infinity, {foo: 'bar'}));

    console.log(Object.assign({foo: 'bar'}, 12));
    console.log(Object.assign({foo: 'bar'}, true));
    console.log(Object.assign({foo: 'bar'}, 'baz'));
    console.log(Object.assign({foo: 'bar'}, ['a', 34564, true]));
    console.log(Object.assign({foo: 'bar'}, null));
    console.log(Object.assign({foo: 'bar'}, undefined));

    console.log(Object.assign([1, 2, 3], [4, 5]));
  }

})();