/**
 * Created by sam on 16/6/8.
 */

;(function() {

  // 'use strict'

  // 练手ES5 在Object 上增加的方法

  {
    let obj = {
      a: 1,
      b: 'sam'
    };

    // Object.preventExtensions() 能将对象设为不可扩展的,即不能新增属性
    Object.preventExtensions(obj);
    obj.c = true;
    console.log(obj);

    obj.b = true;
    console.log(obj);
  }

  {
    let obj = Object.create({}, {
      a: {
        value: 2,
        configurable: true,
        enumerable: true,
        writable: true
      },
      b: {
        value: 'sam',
        configurable: true,
        enumerable: true,
        writable: false
      }
    });

    // Object.seal() 将对象所有属性的descriptor 的configurable 均设为false
    Object.seal(obj);
    console.log(Object.getOwnPropertyDescriptor(obj, 'a'));
    console.log(Object.getOwnPropertyDescriptor(obj, 'b'));
    //Object.defineProperty(obj, 'b', {
    //  writable: true
    //});
    //console.log(Object.getOwnPropertyDescriptor(obj, 'b'));
  }

  {
    let obj = Object.create({}, {
      a: {
        value: 2,
        configurable: true,
        enumerable: true,
        writable: true
      },
      b: {
        value: 'sam',
        configurable: true,
        enumerable: true,
        writable: false
      }
    });

    // Object.freeze() 将对象所有属性的descriptor 的configurable, writable 均设为false
    Object.freeze(obj);
    console.log(Object.getOwnPropertyDescriptor(obj, 'a'));
    console.log(Object.getOwnPropertyDescriptor(obj, 'b'));
  }

  // 对象属性新增getter、setter方法,来替换对应的[[Get]]、[[Set]] 操作
  {
    let obj = {
      get a() {
        return this._a_;
      },
      set a(a) {
        this._a_ = a;
      }
    };

    obj.a = 2;
    console.log(obj.a);

    // get、set 两个访问限制符和value、writable 这两个属性描述符不能共存
    obj = Object.create({}, {
      b: {
        configurable: true,
        enumerable: false,
        //value: 'b',
        //writable: false,
        get: function() {
          return this._b_;
        },
        set: function(b) {
          this._b_ = b + 20;
        }
      }
    });
    obj.b = 2;
    console.log(obj.b);
  }

})();
