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

var output = function(content, action) {
  var actionFuc = action == 'append' ? fs.appendFile : fs.writeFile;
  return new Promise(function(resolve, reject) {
    actionFuc(path.resolve('./', 'output.txt'), content + '\r\n', function(err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

getJSON('story.json').then(function(story) {
  output('', 'empty').then(function() {
    for (let url of story.chapterUrls) {
      getJSON(url).then(function(data) {
        output('chapter: ' + data.chapter + '\r\n' + 'content: ' + data.content + '\r\n', 'append');
      })
    }
  });
}).catch(function(err) {
  console.log(err);
});
