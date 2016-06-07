/**
 * Created by sam on 16/6/7.
 */

;(function() {

  {
    let obj = {foo: 'bar', 1: 23};
    console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));
    console.log(Object.getOwnPropertyDescriptor(obj, '1'));

    let person = {
      getGender() {
        return this.gender;
      },
      getName() {
        return this.name;
      },
      getAge() {
        return this.age;
      }
    };

    let male = Object.create(person, {gender: {
      value: 'male',
      writable: false,
      enumerable: true,
      configurable: false
    }});
    let female = Object.create(person, {gender: {
      value: 'female',
      writable: false,
      enumerable: false,
      configurable: false
    }});

    let sam = Object.create(male, {
      name: {
        value: 'sam',
        writable: true,
        enumerable: true,
        configurable: true
      },
      age: {
        value: 18,
        writable: true,
        enumerable: false,
        configurable: true
      }
    });
    sam[Symbol()] = 'symbol';
    let young = Object.create(female);
    Object.assign(young, {name: 'young', age: 17, [Symbol()]: 'symbol'});

    for (let key in male) {
      console.log(key, male[key]);
    }
    for (let key in female) {
      console.log(key, female[key]);
    }

    for (let key in sam) {
      console.log(key, sam[key]);
    }
    for (let key in young) {
      console.log(key, young[key]);
    }

    console.log(Object.keys(sam));
    console.log(Object.keys(young));

    console.log(JSON.stringify(sam));
    console.log(JSON.stringify(young));

    console.log(Object.getOwnPropertyNames(sam));
    console.log(Object.getOwnPropertyNames(young));

    console.log(Object.getOwnPropertySymbols(sam));
    console.log(Object.getOwnPropertySymbols(young));

    console.log(Reflect.ownKeys(sam));
    console.log(Reflect.ownKeys(young));

    console.log(Object.prototype.toString.call(Reflect.enumerate));

    // 该方法已过时:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/enumerate
    // Reflect.enumerate(sam);

    console.log(Object.is(male, Object.getPrototypeOf(sam)));
    console.log(Object.setPrototypeOf(sam, female));
    console.log(Object.is(male, Object.getPrototypeOf(sam)));
    console.log(sam.getGender());
    console.log(Object.is(female, Object.getPrototypeOf(sam)));
  }

})();