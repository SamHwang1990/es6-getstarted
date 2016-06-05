/**
 * Created by sam on 16/6/5.
 */

;(function() {

  {

    // 每个函数都有name 属性,用以指示函数名称
    // node v6.2 中输出''
    // chrome v52 中输出'func', 貌似这个更符合规范, todo: 待确认
    let func = function() {};
    console.log(func.name);

    func = function func1() {};
    console.log(func.name);                         // func1

    console.log(new Function().name);               // anonymous

    console.log(func.bind({}).name);                // bound func1
    console.log((function () {}).bind({}).name);    // bound

  }

})();
