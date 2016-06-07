/**
 * Created by sam on 16/6/7.
 */

;(function() {

  {
    console.log('foo' === 'foo');
    console.log(Object.is('foo', 'foo'));

    console.log({} === {});
    console.log(Object.is({}, {}));

    console.log(NaN === NaN);
    console.log(Object.is(NaN, NaN));

    console.log(+0 === -0);
    console.log(Object.is(+0, -0));
  }

})();
