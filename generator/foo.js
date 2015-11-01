+(function() {
  'use strict';

  function* quips(name) {
    console.log(1);
    var newName = yield 'Hey ' + name;
    console.log(2);
    console.log(newName);
    yield 'Keep going';
    console.log(3);
    if (name.startsWith('x')) {
      console.log(4);
      yield 'that\'s cool with name started with x.';
    }
    console.log(5);
    yield 'good bye guy!';
  }

  var iter = quips('man');
  console.log(iter.toString());

  console.log(iter.next());
  console.log(iter.next('Sam'));
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());

})();
/**
 * Created by SamHwang1990 on 2015/10/28.
 */


+(function() {
  'use strict';

  return false;

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