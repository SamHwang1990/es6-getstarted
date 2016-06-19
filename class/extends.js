/**
 * Created by sam on 16/6/18.
 */

;(() => {

  // class 类定义使用extends 来实现继承
  // 原理就是原型链扩展
  // 继承机制涉及四个对象、两个属性、一个方法:
  // 对象:Child、Child.prototype、Parent、Parent.prototype
  // 属性:Child.__proto__、Child.prototype.__proto__
  // 方法:Parent.isPrototypeOf()、Parent.prototype.isPrototypeOf()

  // 声明一点,上面提到的Child、Parent 指的是类的定义,本质上是个函数对象

  // 继承机制是:
  // 1. 将Parent 设为Child 的原型,作用是静态方法的继承
  // 2. 将Parent.prototype 设为Child.prototype 的原型,作用是实例方法的继承、构造函数的继承
  // 3. 提供super 关键字来调用原型对象的方法或构造函数:
  //    super(...args) 为调用原型对象的构造函数
  //    super.props(...args) 为调用原型对象的props 方法

  // 使用class 类定义提供的继承机制,要注意以下两点:
  // 1. 子类的构造函数(constructor) 中,如果要使用"this"对象,就必须先调用super(...args), 交由父类的构造函数来创建"this" 对象
  // 2. 子类构造函数如果不使用"this", 并返回一个新的对象,则可以不调用super(...args)


  {
    let Animal = class {
      constructor(type) {
        this.type = type;
      }
      get type() {
        return this._type;
      }
      set type(v) {
        this._type = v;
      }
      static className() {
        return this.name;
      }
    };

    let NoSuper = class extends Animal {
      constructor() {
        return {
          type: 'nosuper'
        }
      }
    };
    let noSuper = new NoSuper();
    console.log(noSuper.type);

    let Dog = class extends Animal {
      constructor(name, age) {
        // before use 'this' in subclass constructor, you shall call super(...args) to generate 'this' object
        super('dog');
        this._name = name;
        this._age = age;
      }
      getName() {
        return this._name;
      }
      getAge() {
        return this._age;
      }
      getType() {
        return super.type.toUpperCase();
      }
    };

    let singleDog = new Dog('single', 26);
    console.log(singleDog.type);
    console.log(singleDog.getName());
    console.log(singleDog.getAge());
    console.log(singleDog.getType());

    console.log(Animal.prototype.isPrototypeOf(Dog.prototype));
    console.log(Animal.isPrototypeOf(Dog));
  }

  // ES6 函数内部新增"new.target" 属性来判断当前调用是否是以new 关键字来调用
  // 如果new.target 等于undefind, 表示普通函数调用
  // 如果new.target 不等于undefined, 表示构造函数形式调用
  {
    let Dog = function() {
      if (new.target == undefined) {
        throw new Error('Dog is a constructor')
      }
      this._type = 'dog';
    };
    let singleDog = Dog();
  }

})();