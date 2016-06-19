/**
 * Created by sam on 16/6/18.
 */

;(() => {

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
    }

    let singleDog = new Dog('single', 26);
    console.log(singleDog.type);
    console.log(singleDog.getName());
    console.log(singleDog.getAge());
    console.log(singleDog.getType());

    console.log(Animal.prototype.isPrototypeOf(Dog.prototype));
    console.log(Animal.isPrototypeOf(Dog));
  }

  {
    let Dog = function() {
      if (new.target == undefined) {
        throw new Error('Dog is a constructor')
      }
      this._type = 'dog';
    }
    let singleDog = Dog();
  }

})();