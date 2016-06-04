/**
 * Created by sam on 16/6/4.
 */

;(function() {

  {
    // RegExp 接受正则表达式作为第一个参数, 且同时允许第二个flag 参数
    // 此时,flag 参数会使正则表达式中的flag 标识失效
    let regex = new RegExp(/^a\d*a$/i, 'g');
    console.log(regex.exec('a3434324a'));
  }

  {
    let str = 'samHwangSam';
    let regex = /sam/ig;

    // 正则实例的source 属性返回匹配规则
    // flags 属性返回匹配标识
    console.log(regex.source);
    console.log(regex.flags);
  }

})();