/**
 * Created by sam on 16/6/3.
 */

;(function() {

  {
    // String.prototype.repeat 可用于生成重复字符串
    // 参数(num)注意以下几点:
    // 0. 参数num 会尝试转为大于等于0 的整数
    // 1. num < 0 或者 Infinity, -Infinity,会报错
    // 2. num 为float 类型,则向下取整, 比如: 0.9 -> 0, 2.9 -> 2
    // 3. num 为字符串, 如果字符串的内容等于(==) 对应的Number 类型,
    //    比如: '33' == 33, '5.2' == 5.2, 则会当作Number 类型处理,规则见上
    //    如果不等于(!=) 对应的Number 类型,则视为0
    // 4. num 为boolean 类型,则true ->1, false -> 0
    // 5. num 为object 类型,则视为0
    // 6. num 为date 类型,则报错
    // 7. num 为array 类型,如果长度大于1,则视为0,如果数组长度为1, 则取第一个值并应用上面的规则,除了此时会将boolean 统统视为0
    let name = 'sam';
    console.log(name.repeat(3));
    //console.log(name.repeat(-3));
    //console.log(name.repeat(Infinity));
    console.log(name.repeat(0));
    console.log(name.repeat(2.9));
    console.log(name.repeat(0.9));
    console.log(name.repeat('3'));
    console.log(name.repeat('5.2'));
    console.log(name.repeat('3a'));
    console.log(name.repeat(true));
    console.log(name.repeat(false));
    console.log(name.repeat({a: 1}));
    console.log(name.repeat([5]));
    // console.log(name.repeat(new Date()));
    // console.log(name.repeat([Date.now()]));
    console.log(name.repeat(['3']));
    console.log(name.repeat([true]));
    console.log(name.repeat([[2]]));
    console.log(name.repeat([[[[[5]]]]]));
    console.log(name.repeat([[[[[5, 4]]]]]));
  }


})();
