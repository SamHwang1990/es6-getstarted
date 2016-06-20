'use strict';

var _export = require('./export');

var sam = _interopRequireWildcard(_export);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log(_export.name); /**
                            * Created by sam on 16/6/20.
                            */

console.log(_export.age);
console.log(_export.gender);
console.log(_export.height);

console.log(sam.name);
console.log(sam.age);
console.log(sam.gender);
console.log(sam.height);

console.log((0, sam.default)());