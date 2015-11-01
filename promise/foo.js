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

/*
* @param content: content to output file
* @param action: determine whether renew output file or append content to the end of output file. optional, value:'empty', 'append'
* */
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

// parallel promise with random order
false && (getJSON('story.json').then(function(story) {
  output('', 'empty').then(function() {     // empty output file
    for (let url of story.chapterUrls) {
      getJSON(url).then(function(data) {
        output('chapter: ' + data.chapter + '\r\n' + 'content: ' + data.content + '\r\n', 'append');
      })
    }
  });
}).catch(function(err) {
  console.log(err);
}));


// order promise one by one
false && (getJSON('story.json').then(function(story) {
  output('', 'empty').then(function() {
    story.chapterUrls.reduce(function(sequence, chapterUrl) {
      return sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(data) {
        return output('chapter: ' + data.chapter + '\r\n' + 'content: ' + data.content + '\r\n', 'append');
      }, function(err) {
        console.log('read file: ' + chapterUrl + ' failed!');
      })
    }, Promise.resolve());
  }).catch(function(err) {
    console.log('empty output file failed');
  })
}));

// order promise parallel which output content after all files loaded.
false && (getJSON('story.json').then(function(story) {
  output('').then(function() {
    Promise.all(story.chapterUrls.map(getJSON)).then(function(datas) {
      for (let i of datas) {
        console.log(i.chapter + ' ' + i.content);
      }
    })
  }).catch(function(err) {
    console.log('empty output file failed');
  })
}));

// order promise parallel which output content after each file loaded.
false && (getJSON('story.json').then(function(story) {
  output('').then(function() {
    story.chapterUrls.map(getJSON).reduce(function(sequence, chapterPromise) {
      return sequence.then(function() {
        return chapterPromise;
      }).then(function(data) {
        return output('chapter: ' + data.chapter + '\r\n' + 'content: ' + data.content + '\r\n', 'append');
      }).catch(function(err) {
        console.log('append content failed');
      })
    }, Promise.resolve());
  }).catch(function(err) {
    console.log('empty output file failed');
  })
}));

// co with generator
var spawn = function(promiseGeneratorFunc) {
  var continuer = function(verb, arg) {
    var result;
    try {
      result = generator[verb](arg);
    } catch (err) {
      return Promise.reject(err);
    }
    if (result.done) {
      return result.value;
    } else {
      return Promise.resolve(result.value).then(onFullFilled, onRejected);
    }
  };

  var generator = promiseGeneratorFunc(),
      onFullFilled = continuer.bind(continuer, 'next'),
      onRejected = continuer.bind(continuer, 'throw');

  return onFullFilled();
};

var _spawn = spawn(function* () {
  try {
    yield output('');

    let story = yield getJSON('story.json');

    let chapterPromises = story.chapterUrls.map(getJSON);

    for (let chapterPromise of chapterPromises) {
      let data = yield chapterPromise;
      yield output('chapter: ' + data.chapter + '\r\n' + 'content: ' + data.content + '\r\n', 'append');
    }
  } catch(err) {
    console.log(err);
  }

});

console.log(_spawn);