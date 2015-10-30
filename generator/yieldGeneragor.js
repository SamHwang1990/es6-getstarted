/**
 * Created by sam on 15/10/30.
 */

+(function() {
  'use strict';

  function* g1() {
    yield 1;
    yield 3;
    yield 5;
  }

  function* g2() {
    yield 0;
    yield* g1();
    yield 7;
  }

  for (let i of g2()) {
    console.log(i);
  }

})();
