/**
 * Created by sam on 16/6/12.
 */

;(function() {

  // ArrayBuffer 对应内存中的一段数据,以字节为单位
  // 初始化时可以指定数据长度
  // byteLength 实例属性返回ArrayBuffer 对象的字节长度
  // ArrayBuffer.prototype.slice(start, end) 方法用于将ArrayBuffer 对象中某段区域的数据复制一份到新的内存中

  // 如果脱离视图对象,单纯初始化ArrayBuffer 对象没什么意义
  {
    let bf = new ArrayBuffer(4);
    let newBf = bf.slice(1, 2);

    console.log(bf.byteLength);
    console.log(newBf.byteLength);
    console.log(ArrayBuffer.isView(bf));
  }


})();
