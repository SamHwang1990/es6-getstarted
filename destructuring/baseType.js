/**
 * Created by sam on 16/6/1.
 */

;(function() {

  {
    // 解构字符串
    // 字符串会被转换为类数组对象

    let [...a] = 'Hello!';
    console.log(a);

    let {length} = 'Hello!';
    console.log(length);
  }

  {
    // 解构数值, 布尔类型
    // 数值, 布尔类型会被转换为Number 对象
    let {toString} = 123;
    console.log(toString === Number.prototype.toString);

    ({toString} = true);
    console.log(toString === Boolean.prototype.toString);
  }

})();
