/**
 * Created by sam on 16/6/18.
 */

;(() => {

  // ES6 对原来构造函数以及prototype 机制提供了一种更接近面向对象类概念和继承机制的语法糖
  // 使用class 来声明一个类, 类定义使用了类似对象字面量的语法,不同的是:
  // 1. 属性间不能有逗号;
  // 2. 属性只能是函数类型(ES7 有提案开放非函数类型的属性~~~

  // class 与之前的构造函数+prototype 来实现类和原型链有什么不同呢?
  // 其实没什么不同,毕竟JS 对象的根本就是这个,只不过class 以更容易理解的方式表达了出来
  // 1. class 关键字定义的类最终会返回一个函数,而该函数只能以new 来调用,也就是必须是实例化形式
  // 2. class 类定义中所有带static 关键字前缀的方法都会定义成函数的静态方法
  // 3. class 类定义中所有不带static 关键字前缀的方法都是在函数的prototype 对象上
  // 4. class 类定义中的constructor 方法就是原先的构造函数,其机制完全一样,
  //    1) constructor 内使用this 来添加实例属性;
  //    2) 如果没有显式返回其它对象,则new 调用返回的就是this, 也就是预期的类的实例化对象
  //    3) 如果显示返回了其它对象,则new 调用就会返回该对象,而该对象会丢失函数的prototype,也就是不再该对象的原型链上

  // 还记得, 在原来的构造函数定义中,默认会给函数prototype 添加一个指向构造函数本身的constructor 属性
  // 以前觉得这个属性很奇怪也很鸡肋,但ES6 的class 语法真正让constructor 起到了预期的作用:构造函数

  // class 的类定义除了上面的几点外,还需要留意以下几个方面:
  // 1. class 定义的类只允许new 调用
  // 2. class 类定义中所有方法会被以enumerable = false 的属性添加到类原型对象上(很重要)
  // 3. 如果定义中没有constructor 方法,则编译时会被默认添加
  // 4. class 类定义中支持get、set 方法
  // 5. 其实class 类定义跟函数没什么区别,同样支持class 表达式,匿名或不匿名
  // 6. class 的类定义不存在变量提升,所以,一定要先声明再使用
  // 7. class 类定义中的所有方法默认都处于strict 模式中(如果以后的类定义都按ES6 的class 来做,那严格模式就会得到全方位的应用了~~~

  {
    let Person = class {
      constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
      }
      getName() {
        return this.name;
      }
      getAge() {
        return this.age;
      }
      getGender() {
        return this.gender;
      }
      static getName() {
        return Person.name;
      }
    }

    try {
      let foo = Person('foo');
    } catch (e) {
      console.log(`Class constructor  cannot be invoked without 'new'`);
    }

    console.log(Object.getOwnPropertyDescriptor(Person, 'getName'));
    console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'getName'));
    console.log(Reflect.ownKeys(Person.prototype));

    let sam = new Person('Sam', 18, 'male');

    console.log(Object.keys(sam));
    console.log(Person.prototype.isPrototypeOf(sam));

    console.log(sam.getName(), sam.getAge(), sam.getGender());
  }

  {
    let Person = class {
      toString() {
        return 'default constructor will be added';
      }
    };
    console.log(Object.getOwnPropertyNames(Person.prototype));
  }

  {
    let Person = class {
      constructor(name, age) {
        return Object.create({
          name,
          age
        });
      }
      getName() {
        return Person.name;
      }
    };

    let sam = new Person('Sam', 18);

    console.log(Person.prototype.isPrototypeOf(sam));
    console.log(Object.getPrototypeOf(sam));
  }

  {
    let Person = class {
      get name() {
        return (this._name || 'no name').toUpperCase();
      }
      set name(v) {
        this._name = v;
      }
    }
    console.log(Reflect.ownKeys(Person.prototype));
    console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'name'));
    let sam = new Person();
    console.log(sam.name);
    sam.name = 'sam';
    console.log(sam.name);
  }

  {
    let Female = class {
      getGender() {
        return 'Female';
      }
      static getGender() {
        return 'female'
      }
    }
    console.log(Female.getGender());
  }

  {
    class Dog {
      constructor() {
        this.type = 'dog';
      }
      getClassName() {
        return Dog.name;
      }
    }
    let dog = new Dog();
    console.log(dog.getClassName());

    let Mickey = class Mouse {
      getClassName() {
        return Mouse.name;
      }
    };
    let mickey = new Mickey();
    console.log(mickey.getClassName());

    let Cat = class {
      getClassName() {
        return Cat.name;
      }
    }
    let cat = new Cat();
    console.log(cat.getClassName())
  }

  {
    let car = new Car();
    console.log(car.type);

    // class 定义的类不存在变量提升
    try {
      let ship = new Ship();
      console.log(ship.type);
    } catch(e) {
      console.log('不存在变量提升: Ship is not defined');
    }

    function Car() {
      this.type = 'car';
    }

    class Ship {
      constructor() {
        this.type = 'ship';
        try {
          isStrict = true;
        } catch (e) {
          console.log('Class 模块内部默认处于严格模式, inStrict is not defined.')
        }
      }
      getClassName() {
        try {
          isStrict = true;
        } catch (e) {
          console.log('Class 模块内部默认处于严格模式, inStrict is not defined.')
        }
        return Ship.name;
      }
    }
    let ship = new Ship();
    console.log(ship.type);
    console.log(ship.getClassName());
  }

})();
