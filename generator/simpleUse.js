/**
 * Created by sam on 16/6/16.
 */

;(function() {

  // before generator

  let interval = 100;
  {
    let doSomething = () => {
      setTimeout(() => {
        console.log('1 timeout');
        setTimeout(() => {
          console.log('2 timeout');
          setTimeout(() => {
            console.log('3 timeout');
            setTimeout(() => {
              console.log('4 timeout');
            }, interval)
          }, interval)
        }, interval)
      }, interval)
    }
    doSomething();
  }

  {
    let doSomething = function* () {
      yield 1;
      yield 2;
      yield 3;
      return 4;
    }

    let doTimeout = (generator) => {
      setTimeout(() => {
        var val = generator.next();
        console.log(val.value);
        if (!val.done) {
          doTimeout(generator);
        }
      }, interval)
    }

    doTimeout(doSomething());

  }


})();
