/**
 * Created by sam on 16/6/12.
 */

;(function() {

  // 注意不同架构CPU 在将整数以二进制数据写入内存时,使用不同的端序:大端、小端
  // 端序会影响结果的情景主要是写操作用的typed 和读操作的typed 不一致导致的
  // 比如,写数据时用Int16Array 小端写入,此时如果使用Int8Array 读取数据时就容易产生误解

  {
    let int16Array = new Int16Array([110, 5454, 788]);
    let dv = new DataView(int16Array.buffer);

    console.log(dv.buffer === int16Array.buffer);
    console.log(dv.byteLength);

    console.log(dv.getInt8(0), dv.getInt8(1));
    console.log(dv.getInt16(0, true), dv.getInt16(1));

    dv.setInt8(0, 23);
    dv.setInt8(1, 56);
    console.log(dv.getInt8(0), dv.getInt8(1));
    console.log(dv.getInt16(0));
    console.log(dv.getInt16(0, true));

    dv.setInt16(0, 2334);
    dv.setInt16(1, 2334, true);
    console.log(dv.getInt16(0));
    console.log(dv.getInt16(0, true));
    console.log(dv.getInt16(1));
    console.log(dv.getInt16(1, true));
  }

})();