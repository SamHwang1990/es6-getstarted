/**
 * Created by sam on 15/10/30.
 */

'use strict';

var fs = require('fs'),
    path = require('path');

var getJSON = function(name) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path.resolve('./db', name), function(err, data) {   // relative to foo.js
      if (err) {
        return reject(err);
      }

      return resolve(data);

    });
  }).then(JSON.parse);
};

var output = function(name, content, callback) {
  fs.writeFile(path.resolve('./', 'output.txt'), content + '\r\n', callback);
};

getJSON('story.json').then(function(story) {
  fs.writeFile(path.resolve('./', 'output.txt'), data.heading, function(err) {
    if (err) throw err;
  });
});
