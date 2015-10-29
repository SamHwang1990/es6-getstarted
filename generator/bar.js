/**
 * Created by SamHwang1990 on 2015/10/28.
 */

+(function() {
  'use strict';

  function setup() {
    console.log('hey budy, i\'m going to set all up.');
  }

  function cleanup() {
    console.log('clean clean clean');
  }

  function doJob(task) {
    console.log(task.toString());
  }

  function* produceValues() {
    setup();
    try {
      yield 1;
      yield 3;
      yield 6;
    } finally {
      cleanup()
    }
  }

  for (var i of produceValues()) {
    try {
      if (i > 2) {
        throw('??');
      }
      doJob(i);
    } catch(err) {
      console.log(err);
    }
  }

})();
