+(function() {
  'use strict';

  function* quips(name) {
    console.log(1);
    yield 'Hey ' + name;
    console.log(2);
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
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());

})();