/**
 * Created by samhwang1990@gmail.com on 17/3/31.
 */

'use strict';

let p1 = Promise.resolve(2);

p1.then(v => {
  console.log(`p1 resolved with ${v}`);
});

p1.then(v => {
  console.log(`p1 resolved with ${v}`);
});

let p2 = Promise.reject(2);

p2.catch(v => {
  console.log(`p2 rejected with ${v}`);
});

p2.then(v => {
  console.log(v);
  return 'djj';
}).catch(v => {
  console.log(`p2 rejected with ${v}`);
});