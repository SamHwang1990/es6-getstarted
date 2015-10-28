/**
 * Created by SamHwang1990 on 2015/10/28.
 */


+(function() {
  'use strict';

  function* range(start, stop) {
    for (let i = start; i <= stop; i++) {
      yield i;
    }
  }

  for (let i of range(2, 50)) {
    console.log(i);
  }

  function* somewords() {
    yield 'hello';
    yield 'world';
  }

  for (let i of somewords()) {
    console.log(i);
  }



})();