/**
 * Created by sam on 16/6/5.
 */

;(function() {

  // es6 新增sticky(粘连) 匹配标识: y
  // 该标识与g 类似, 也是做全局匹配
  // 区别在: y 标识的正则匹配规定必须要从lastIndex 开始匹配, 而g 标识则只需要lastIndex 往后能匹配就行

  {

    let str = 'samHwangsam';

    let regex_g = /sam/g;
    let exec_g;
    let regex_y = /sam/y;
    let exec_y;

    // g 表示能匹配到前后连个"sam"
    while (exec_g = regex_g.exec(str)) {
      console.log(exec_g);
      console.log(regex_g.lastIndex);
    }

    // y 只能匹配到第一个"sam"
    // 原因是, 第一次匹配成功后, lastIndex 此时等于3, 此时, str 往后的内容应该等于: Hwangsam
    // 于是下一次执行exec 时, 发现lastIndex 往后的字符串不是sam 开头, 于是就返回null, 停止匹配了, 匹配有点类似于"/^sam/"
    // 从上面分析观察到, y 标识隐藏着有点"^" 的意思
    while (exec_y = regex_y.exec(str)) {
      console.log(exec_y);
      console.log(regex_y.lastIndex);
    }

    // 正则实例提供sticky 属性来判断当前正则是否带有y 标识
    console.log(regex_y.sticky);
  }

})();
