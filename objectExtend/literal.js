/**
 * Created by sam on 16/6/7.
 */

;(function() {
  var _private = 'young';

  {
    let foo = 'sam';
    let getName = () => 'sam hwang';
    let obj = {
      foo,
      _private,
      getName,
      getAge() {
        return '18';
      }
    };

    console.log(obj);
    console.log(obj.getName());
    console.log(obj.getAge());
  }

  {
    let name = 'sam_hwang';
    let age = 18;
    let sam_hwang = '23';

    let obj = {
      //[name],
      [name.toUpperCase()]: name.toUpperCase(),
      [age + 1]: age + 1,
      [sam_hwang]() {
        return 'hello world!';
      }
    }

    console.log(obj);
    console.log(obj[sam_hwang]());
    console.log(obj[age + 1]);
    console.log(obj[name.toUpperCase()]);
  }

})();
