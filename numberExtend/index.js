/**
 * Created by sam on 16/6/3.
 */

;(function() {

  {
    // 新增二进制, 八进制数值表示
    // "0b", '0B' 前缀表示二进制,不允许包含0,1 以外的数字
    // "0o", '0O' 前缀表示八进制,不允许包含0~7 以外的数字
    console.log(0b10010001);
    //console.log(0b10010021);

    console.log(0o2723);
    //console.log(0o27239);
  }

  {
    // window.isFinite, window.isNaN, window.parseInt, window.parseFloat
    // 分别转到Number 类型下

    // Number.isFinite 用以检查值是否为有限数值, 这里包含两点: 数值类型, 有限的
    console.log(Number.isFinite(30));
    console.log(Number.isFinite(30.5));
    console.log(Number.isFinite('30'));
    console.log(Number.isFinite(NaN));
    console.log(Number.isFinite(true));
    console.log(Number.isFinite(Infinity));
    console.log(Number.isFinite(-Infinity));

    console.log(Number.isNaN(NaN));
    console.log(Number.isNaN(30));
    console.log(Number.isNaN(Infinity));
    console.log(Number.isNaN('30'));
    console.log(Number.isNaN('a30a'));

    console.log(Number.parseInt(0x23a3f, 10));
    console.log(Number.parseInt('12.34'));

    console.log(Number.parseFloat('12.34'));
    console.log(Number.parseFloat('aa12.34'));
    console.log(Number.parseFloat('12.34aaa'));
  }

  {
    // Number.isInteger 用以判断值是否为整数数值, 这里包含两点: 数值类型, 整数
    // 注意: JS 对15 和15.0 的存储方式是一致的
    console.log(Number.isInteger(15));      // true
    console.log(Number.isInteger(15.0));    // true
    console.log(Number.isInteger(15.3));    // false
    console.log(Number.isInteger('15'));    // false

    // Number.EPSILON 用来定义一个极小的常量, 意义在于定义一个运算的结果的精确度是否可以接受
    // JS 中的浮点运算是不精确的,存在误差, 比如下面的简单的计算,误差值为: 0.00000000000000004
    // 宽泛的说, 如果计算结果的误差小于Number.EPSILON, 则认为得到了正确结果
    console.log(0.1 + 0.2);                           // 0.30000000000000004
    console.log((0.1 + 0.2) < Number.EPSILON);        // false
    console.log((0.1 + 0.2 - 0.3).toFixed(20));       // 0.00000000000000005551
    console.log((0.1 + 0.2 - 0.3) < Number.EPSILON);  // true
  }

  {
    // Number 数值范围:
    // 1. 类型统一按浮点数处理，64位存储
    // 2. 整数是按最大54位来算最大最小数的，否则会丧失精度, 考虑到正负数: 正负2的53次方,不包含两个端点
    // 3. 某些操作（如数组索引还有位操作）是按32位处理的, 考虑到正负数: 正负2的31次方,不包含两个端点

    // ES6 引入两个常量用来定义整数的最小值, 最大值
    console.log(Number.MAX_SAFE_INTEGER);
    console.log(Number.MIN_SAFE_INTEGER);
    console.log(Number.MAX_SAFE_INTEGER === Math.pow(2, 53) -1);
    console.log(Number.MIN_SAFE_INTEGER === -Math.pow(2, 53) + 1);
    console.log(Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER);

    // Number.isSafeInteger 用来判断值是否为整数有效范围内的值
    // 大概可以理解为,介于Number.MIN_SAFE_INTEGER 和Number.MAX_SAFE_INTEGER 之间的整数值
    // 这里包含两点: 整数, Number.MIN_SAFE_INTEGER <= value <= Number.MAX_SAFE_INTEGER
    console.log(Number.isSafeInteger(3));
    console.log(Number.isSafeInteger(3.5));
    console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));
    console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER));
    console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1));
    console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1));

    // 提醒一点,如果要检测整数运算的表达式中运算符两边的数值是否为Safe Integer, 要分别调用Number.isSafeInteger
    // 而不是只检测结果, 例如:
    console.log(Number.isSafeInteger(9007199254740992 - 990));  // true
    console.log(Number.isSafeInteger(9007199254740992));        // false
    console.log(Number.isSafeInteger(990));                     // true

    // 所有超出有效整数范围的整数的运算都是非常不准确的
    console.log(9007199254740993 === 9007199254740992);         // true
    console.log(9007199254740995 === 9007199254740996);         // true
  }

})();