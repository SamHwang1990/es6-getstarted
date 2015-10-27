+(function() {
  'use strict';

  var tempArray = [];
  for (var i = 0; i <= 10000; i++) {
    tempArray[i] = parseInt(i * 6 -1 / 3);
  }

  // console.log(tempArray.toString());

  for (var j of tempArray) {
    if (j % 5 > 0) continue;
    console.log(j);
  }

  let tempFactory = function(name) {
    this.name = name;
  };
  tempFactory.prototype.parentName = 'djj';

  let tempObj = new tempFactory('xjj');

  for (let z of Object.keys(tempObj)) {
    console.log(z, tempObj[z]);
  }

  for (let z in tempObj) {
    console.log(z, tempObj[z]);
  }

})();