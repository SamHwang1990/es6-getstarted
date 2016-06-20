/**
 * Created by sam on 16/6/20.
 */

import {name as nickName, age, gender, height} from './export';
import * as sam from './export';
import defaultExport from './export';
console.log(nickName);
console.log(age);
console.log(gender);
console.log(height);

height = 181;

console.log(sam.name);
console.log(sam.age);
console.log(sam.gender);
console.log(sam.height);

console.log(defaultExport());