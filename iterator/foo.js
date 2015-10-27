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

  let tempObj1 = {
    _index: 1,
    [Symbol.iterator]: function() {
      return this;
    },
    next: function() {
      this._index = (this._index * 6 + 3) / 2;
      var _done = this._index > 2000;
      return {done: _done, value: this._index};
    }
  };

  for (let z of tempObj1) {
    console.log(z);
  }

})();