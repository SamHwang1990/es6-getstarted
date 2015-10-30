/**
 * Created by sam on 15/10/30.
 */

+(function() {
  'use strict';

  var jsonPromise = new Promise(function(resolve, reject) {
    try {
      resolve(JSON.parse('This ain\' JSON.'));
    } catch(err) {
      reject(err);
    }
  });

  jsonPromise.then(function(data) {
    console.log(data);
  }).catch(function(err) {
    console.log(err);
  })

})();
