+(function() {
  'use strict';

  var tempArray = [];
  for (var i = 0; i <= 10000; i++) {
    tempArray[i] = parseInt(i * 6 -1 / 3);
  }

  // console.log(tempArray.toString());

  for (var j of tempArray) {
    if (j % 5 > 0) return;
    console.log(j);
  }

})();