/**
 * Created by sam on 15/11/1.
 */

;(function() {
  'use strict';

  var getValues = async function() {
    return [1, 2, 3, 4];
  };

  var asyncOperation = async function(value) {
    return value + 1;
  };

  var promiseOperation = function() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        if (Math.round(Math.round())) {
          resolve('success');
        } else {
          reject('failed');
        }
      }, 1000);
    });
  };

  var foo = async function() {
    try {
      var result = await promiseOperation();
      console.log(result);
    } catch(err) {
      console.log(err);
    }
  };

  var fooParallelRandom = async function() {
    try {
      var values = await getValues();
      var newValues = values.map(async function(value) {
        var newValue = await asyncOperation(value);
        console.log(newValue);
        return newValue;
      });

      return await* newValues;
    } catch(err) {
      console.log(err);
    }
  };

  var fooSequential = async function() {
    try {
      var values = await getValues();

      var newValues = await values.reduce(async function(sequenceValues, value) {
        var newValue = await asyncOperation(value);
        console.log(newValue);
        sequenceValues.push(newValue);
      }, []);
      console.log(newValues);
      return newValues;

    } catch(err) {
      console.log(err);
    }
  };

  var fooParallelOrderly = async function() {
    try {
      var values = await getValues();
      var newValues = await Promise.all(value.map(asyncOperation));

      console.log(newValues);

    } catch(err) {
      console.log(err);
    }
  };



})();

